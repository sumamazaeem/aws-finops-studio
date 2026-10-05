"""AWS FinOps Dashboard data collectors used by the web application.

The collectors deliberately shell out to the AWS CLI already provided by the
KiroCrew runtime.  They never mutate AWS resources; export delivery is handled
separately by an explicitly invoked endpoint.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
from datetime import date, timedelta
from decimal import Decimal


COMMON_REGIONS = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2", "eu-west-1",
    "eu-west-2", "eu-central-1", "ap-south-1", "ap-southeast-1",
    "ap-southeast-2",
]


def parse_tags(value):
    if not value:
        return []
    raw = value if isinstance(value, list) else str(value).replace("\n", ",").split(",")
    tags = []
    for item in raw:
        item = str(item).strip()
        if not item:
            continue
        if "=" not in item:
            raise ValueError(f"Invalid tag filter '{item}'. Use Key=Value.")
        key, val = item.split("=", 1)
        if not key.strip() or not val.strip():
            raise ValueError(f"Invalid tag filter '{item}'. Use Key=Value.")
        tags.append({"key": key.strip(), "value": val.strip()})
    return tags


def cost_filter(tags, exclude_adjustments=False):
    filters = []
    if exclude_adjustments:
        filters.append({"Not": {"Dimensions": {"Key": "RECORD_TYPE", "Values": ["Credit", "Refund"]}}})
    filters.extend({"Tags": {"Key": t["key"], "Values": [t["value"]], "MatchOptions": ["EQUALS"]}} for t in parse_tags(tags))
    if not filters:
        return None
    return filters[0] if len(filters) == 1 else {"And": filters}


def aws_json(profile, region, service, operation, *args, timeout=60):
    aws = shutil.which("aws")
    if not aws:
        raise RuntimeError("AWS CLI is unavailable to the app backend")
    command = [aws, service, operation, "--profile", profile, "--region", region, *map(str, args), "--output", "json", "--no-cli-pager"]
    env = {**os.environ, "AWS_PROFILE": profile, "AWS_REGION": region}
    completed = subprocess.run(command, capture_output=True, text=True, timeout=timeout, env=env, check=False)
    if completed.returncode:
        raise RuntimeError((completed.stderr or f"AWS {service} {operation} failed").strip()[:700])
    return json.loads(completed.stdout or "{}")


def list_regions(profile, home_region="us-east-1"):
    try:
        data = aws_json(profile, home_region, "ec2", "describe-regions", "--all-regions")
        values = sorted(r["RegionName"] for r in data.get("Regions", []) if r.get("OptInStatus") in (None, "opt-in-not-required", "opted-in"))
        return values or COMMON_REGIONS
    except Exception:
        return COMMON_REGIONS


def budgets(profile, account_id, region="us-east-1"):
    if not account_id or account_id == "unknown":
        return []
    data = aws_json(profile, region, "budgets", "describe-budgets", "--account-id", account_id)
    result = []
    for item in data.get("Budgets", []):
        limit = Decimal(str((item.get("BudgetLimit") or {}).get("Amount", 0)))
        actual = Decimal(str(((item.get("CalculatedSpend") or {}).get("ActualSpend") or {}).get("Amount", 0)))
        forecast_raw = ((item.get("CalculatedSpend") or {}).get("ForecastedSpend") or {}).get("Amount")
        forecast = Decimal(str(forecast_raw)) if forecast_raw is not None else None
        result.append({
            "name": item.get("BudgetName", "Unnamed budget"), "type": item.get("BudgetType"),
            "unit": (item.get("BudgetLimit") or {}).get("Unit", "USD"), "limit": str(limit),
            "actual": str(actual), "forecast": str(forecast) if forecast is not None else None,
            "percentUsed": float((actual / limit * 100) if limit else 0), "breached": actual > limit,
        })
    return result


def trend(profile, tags=None, region="us-east-1", months=6):
    end = date.today() + timedelta(days=1)
    start = (date.today().replace(day=1) - timedelta(days=max(1, months - 1) * 31)).replace(day=1)
    args = ["--time-period", f"Start={start.isoformat()},End={end.isoformat()}", "--granularity", "MONTHLY", "--metrics", "UnblendedCost"]
    filt = cost_filter(tags)
    if filt:
        args += ["--filter", json.dumps(filt)]
    data = aws_json(profile, region, "ce", "get-cost-and-usage", *args)
    return [{
        "start": p["TimePeriod"]["Start"], "end": p["TimePeriod"]["End"],
        "cost": (p.get("Total") or {}).get("UnblendedCost", {}).get("Amount", "0"),
        "unit": (p.get("Total") or {}).get("UnblendedCost", {}).get("Unit", "USD"),
        "estimated": bool(p.get("Estimated")),
    } for p in data.get("ResultsByTime", [])]


def _instances(data):
    return [i for reservation in data.get("Reservations", []) for i in reservation.get("Instances", [])]


def audit(profile, regions):
    result = {
        "profile": profile, "regions": regions, "scannedAt": date.today().isoformat(),
        "ec2Summary": {}, "stoppedInstances": [], "unusedVolumes": [], "unusedEips": [],
        "untaggedResources": [], "errors": [],
    }
    for region in regions:
        try:
            instances = _instances(aws_json(profile, region, "ec2", "describe-instances"))
            for instance in instances:
                state = (instance.get("State") or {}).get("Name", "unknown")
                result["ec2Summary"][state] = result["ec2Summary"].get(state, 0) + 1
                record = {"type": "EC2", "id": instance.get("InstanceId"), "region": region, "state": state}
                if state == "stopped": result["stoppedInstances"].append(record)
                if not instance.get("Tags"): result["untaggedResources"].append(record)
        except Exception as exc:
            result["errors"].append({"region": region, "service": "EC2", "message": str(exc)})
        try:
            volumes = aws_json(profile, region, "ec2", "describe-volumes", "--filters", "Name=status,Values=available").get("Volumes", [])
            result["unusedVolumes"].extend({"type": "EBS", "id": v.get("VolumeId"), "region": region, "sizeGiB": v.get("Size"), "volumeType": v.get("VolumeType")} for v in volumes)
        except Exception as exc:
            result["errors"].append({"region": region, "service": "EBS", "message": str(exc)})
        try:
            addresses = aws_json(profile, region, "ec2", "describe-addresses").get("Addresses", [])
            result["unusedEips"].extend({"type": "EIP", "id": a.get("AllocationId") or a.get("PublicIp"), "publicIp": a.get("PublicIp"), "region": region} for a in addresses if not a.get("AssociationId"))
        except Exception as exc:
            result["errors"].append({"region": region, "service": "EIP", "message": str(exc)})
        for service, operation, collection, id_key, tag_operation in [
            ("rds", "describe-db-instances", "DBInstances", "DBInstanceIdentifier", "list-tags-for-resource"),
            ("lambda", "list-functions", "Functions", "FunctionName", "list-tags"),
            ("elbv2", "describe-load-balancers", "LoadBalancers", "LoadBalancerName", "describe-tags"),
        ]:
            try:
                rows = aws_json(profile, region, service, operation).get(collection, [])
                for row in rows:
                    arn = row.get("DBInstanceArn") or row.get("FunctionArn") or row.get("LoadBalancerArn")
                    if service == "rds": tag_data = aws_json(profile, region, service, tag_operation, "--resource-name", arn); tags_found = tag_data.get("TagList", [])
                    elif service == "lambda": tag_data = aws_json(profile, region, service, tag_operation, "--resource", arn); tags_found = tag_data.get("Tags", {})
                    else: tag_data = aws_json(profile, region, service, tag_operation, "--resource-arns", arn); tags_found = (tag_data.get("TagDescriptions") or [{}])[0].get("Tags", [])
                    if not tags_found:
                        result["untaggedResources"].append({"type": service.upper(), "id": row.get(id_key), "region": region})
            except Exception as exc:
                result["errors"].append({"region": region, "service": service.upper(), "message": str(exc)})
    result["counts"] = {
        "stoppedInstances": len(result["stoppedInstances"]), "unusedVolumes": len(result["unusedVolumes"]),
        "unusedEips": len(result["unusedEips"]), "untaggedResources": len(result["untaggedResources"]),
    }
    return result
