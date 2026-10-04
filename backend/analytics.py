"""Deterministic financial calculations used before any LLM explanation."""
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

def decimal(value):
    try: result = Decimal(str(value))
    except (InvalidOperation, TypeError, ValueError) as exc: raise ValueError(f"invalid numeric value: {value!r}") from exc
    if not result.is_finite(): raise ValueError("numeric value must be finite")
    return result

def money(value): return str(decimal(value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
def total(values): return money(sum((decimal(value) for value in values), Decimal("0")))
def percent_change(current, previous):
    current_value, previous_value = decimal(current), decimal(previous)
    return None if previous_value == 0 else float(((current_value-previous_value)/abs(previous_value)*100).quantize(Decimal("0.1")))
def saving_percent(saving, current_cost):
    cost=decimal(current_cost)
    return None if cost <= 0 else float((decimal(saving)/cost*100).quantize(Decimal("0.1")))

def variance(current, previous):
    c, p = decimal(current), decimal(previous)
    diff = c - p
    pct = percent_change(c, p)
    return {
        "current": money(c),
        "previous": money(p),
        "diff": money(diff),
        "percentChange": pct
    }

def credit_adjustment_ratio(credits_amount, gross_cost):
    gross = decimal(gross_cost)
    if gross <= 0:
        return None
    creds = abs(decimal(credits_amount))
    return float((creds / gross * 100).quantize(Decimal("0.1")))

def calculate_service_deltas(current_services, previous_services):
    prev_by_service = {s.get("service", ""): decimal(s.get("cost", 0)) for s in previous_services if s.get("service")}
    curr_by_service = {s.get("service", ""): decimal(s.get("cost", 0)) for s in current_services if s.get("service")}
    all_services = sorted(set(prev_by_service.keys()) | set(curr_by_service.keys()))

    results = []
    for svc in all_services:
        c = curr_by_service.get(svc, Decimal("0"))
        p = prev_by_service.get(svc, Decimal("0"))
        results.append({
            "service": svc,
            "cost": money(c),
            "previousCost": money(p),
            "costDelta": money(c - p),
            "changePercent": percent_change(c, p),
            "unit": "USD"
        })
    results.sort(key=lambda x: decimal(x["cost"]), reverse=True)
    return results

def calculate_pipeline_savings(items):
    valid_statuses = ("identified", "reviewed", "approved", "implemented", "dismissed", "verified")
    by_status = {s: Decimal("0") for s in valid_statuses}
    realized_total = Decimal("0")
    counts = {s: 0 for s in valid_statuses}

    for item in items:
        status = item.get("status", "identified")
        if status in by_status:
            by_status[status] += decimal(item.get("estimatedSaving", 0))
            counts[status] += 1
            if status == "verified":
                realized_total += decimal(item.get("realizedSaving", 0))

    return {
        "statusCounts": counts,
        "potentialByStatus": {k: money(v) for k, v in by_status.items()},
        "totalActivePipeline": money(sum((by_status[s] for s in ("identified", "reviewed", "approved")), Decimal("0"))),
        "totalRealizedSaving": money(realized_total)
    }

def calculate_allocation_coverage(allocated_cost, total_cost):
    a = decimal(allocated_cost)
    t = decimal(total_cost)
    unallocated = max(Decimal("0"), t - a)
    cov_pct = saving_percent(a, t) if t > 0 else 0.0
    return {
        "allocated": money(a),
        "total": money(t),
        "unallocated": money(unallocated),
        "coveragePercent": cov_pct
    }

def deduplicate(items):
    selected={}; rank={"low":1,"medium":2,"high":3}
    for item in items:
        key=tuple(str(item.get(field,"")).casefold() for field in ("account","region","resource","type","action"))
        old=selected.get(key)
        candidate=(rank.get(str(item.get("confidence","low")).lower(),0),decimal(item.get("estimatedSaving",0)))
        existing=(-1,Decimal("-1")) if old is None else (rank.get(str(old.get("confidence","low")).lower(),0),decimal(old.get("estimatedSaving",0)))
        if candidate > existing: selected[key]=item
    return list(selected.values())

def validate_recommendation(item):
    required={"id","what","why","evidence","resource","service","account","region","currentCost","estimatedSaving","savingPercent","confidence","risk","implementationGuidance","rollbackConsiderations","status","createdDate","verifiedDate","realizedSaving"}
    missing=sorted(required-item.keys())
    if missing: raise ValueError(f"missing recommendation fields: {', '.join(missing)}")
    if item["status"] not in {"identified","reviewed","approved","implemented","dismissed","verified"}: raise ValueError("invalid recommendation status")
    decimal(item["currentCost"]); decimal(item["estimatedSaving"]); decimal(item["realizedSaving"])

