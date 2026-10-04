import importlib, json

def load_server(monkeypatch,tmp_path):
    monkeypatch.setenv("KIROCREW_APP_DATA_DIR",str(tmp_path)); import backend.server as server
    server=importlib.reload(server); server.init_db(); return server

def test_no_credential_diagnostics(monkeypatch,tmp_path):
    monkeypatch.delenv("AWS_PROFILE",raising=False); monkeypatch.delenv("AWS_ACCESS_KEY_ID",raising=False)
    server=load_server(monkeypatch,tmp_path); monkeypatch.setattr(server.Path,"home",classmethod(lambda cls: tmp_path))
    assert server.diagnostics()["mode"]=="credentials-required"
def test_persistence(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path); item=dict(server.DEMO[0]); item["id"]="persisted"; item["status"]="approved"
    server.save(item); assert server.recommendations()[0]["status"]=="approved"
def test_live_payload_is_default_and_contains_no_demo_values(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path); monkeypatch.setattr(server,"live_cost_overview",lambda:{"previousMonth":{"costBeforeCredits":"12","credits":"-10","netCost":"2"},"monthToDate":None})
    payload=server.overview()
    assert payload["mode"]=="live" and payload["dataAvailable"] is True
    assert payload["live"]["previousMonth"]["costBeforeCredits"]=="12"
    assert payload["mtdSpend"] is None and payload["drivers"]==[] and payload["anomalies"]==[]
    json.dumps(payload)

def test_demo_payload_requires_explicit_mode(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path); payload=server.overview("demo")
    assert payload["mode"]=="demo" and payload["dataAvailable"] is True and payload["mtdSpend"]>0
    assert server.recommendations()==[] and server.recommendations("demo")==server.DEMO

def test_record_type_summary_excludes_only_credits(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    result={"TimePeriod":{"Start":"2026-09-01","End":"2026-10-01"},"Estimated":False,"Groups":[{"Keys":["Usage"],"Metrics":{"UnblendedCost":{"Amount":"10","Unit":"USD"}}},{"Keys":["Refund"],"Metrics":{"UnblendedCost":{"Amount":"-1","Unit":"USD"}}},{"Keys":["Credit"],"Metrics":{"UnblendedCost":{"Amount":"-7","Unit":"USD"}}}]}
    summary=server._record_type_period(result)
    assert summary["costBeforeCredits"]=="10" and summary["credits"]=="-7" and summary["refunds"]=="-1" and summary["netCost"]=="2"

def test_evidence_runs_persist_and_rehydrate(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    mock_identity={"verified":True,"account":"123456789012","accountMasked":"***9012","arn":"arn:aws:iam::123456789012:role/FinOps","userId":"AROA123","profile":"default","region":"us-east-1"}
    monkeypatch.setattr(server,"_get_caller_identity",lambda *a,**kw: mock_identity)
    mock_records=[{"TimePeriod":{"Start":"2026-09-01","End":"2026-10-01"},"Estimated":False,"Groups":[{"Keys":["Usage"],"Metrics":{"UnblendedCost":{"Amount":"100","Unit":"USD"}}}]}]
    mock_services=[{"TimePeriod":{"Start":"2026-09-01","End":"2026-10-01"},"Estimated":False,"Groups":[{"Keys":["EC2"],"Metrics":{"UnblendedCost":{"Amount":"100","Unit":"USD"}}}]}]
    monkeypatch.setattr(server,"_run_cost_query",lambda s,e,k,**kw: mock_records if k=="RECORD_TYPE" else mock_services)

    refreshed=server.refresh_live_cost_overview()
    assert refreshed["callerIdentity"]["accountMasked"]=="***9012"
    assert refreshed["payloadHash"] is not None

    # Clear memory cache simulating server restart
    server._LIVE_CACHE.update(at=0.0,payload=None)
    rehydrated=server.live_cost_overview()
    assert rehydrated is not None
    assert rehydrated["evidenceRunId"]==refreshed["evidenceRunId"]
    assert rehydrated["payloadHash"]==refreshed["payloadHash"]

    runs=server.list_evidence_runs()
    assert len(runs)==1
    assert runs[0]["id"]==refreshed["evidenceRunId"]
    assert runs[0]["accountMasked"]=="***9012"

def test_execute_calculation(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    v=server.execute_calculation({"operation":"variance","current":"200","previous":"100"})
    assert v["diff"]=="100.00" and v["percentChange"]==100.0

    tot=server.execute_calculation({"operation":"total","values":["12.50","7.50"]})
    assert tot["total"]=="20.00"

    cov=server.execute_calculation({"operation":"allocation_coverage","allocated":"75","total":"100"})
    assert cov["coveragePercent"]==75.0

def test_reports_persist_and_generate(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    reports=server.list_reports()
    assert len(reports)>=1
    assert "Executive" in reports[0]["title"]
    assert reports[0]["id"]=="rep_20261004_executive"

    # Generate backlog report (live zero findings)
    backlog=server.generate_report("backlog")
    assert backlog["type"]=="backlog"
    assert "Optimization Audit Findings & Diagnostics" in backlog["contentMarkdown"]
    all_reps=server.list_reports()
    assert len(all_reps)>=2
    assert all_reps[0]["id"]==backlog["id"]

    # Generate backlog report (demo mode)
    demo_backlog=server.generate_report("backlog", mode="demo")
    assert demo_backlog["type"]=="backlog"
    assert "demo-ec2-1" in demo_backlog["contentMarkdown"] or "Review oversized EC2" in demo_backlog["contentMarkdown"]

def test_profile_discovery_and_active_scope(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    # Default scope
    scope=server.get_active_scope()
    assert scope["profile"]=="default"
    assert scope["region"]=="us-east-1"

    # Switch profile and region
    updated=server.set_active_scope("finops-prod", "eu-west-1")
    assert updated["profile"]=="finops-prod"
    assert updated["region"]=="eu-west-1"

    # Verify persisted in sqlite across get_active_scope
    fetched=server.get_active_scope()
    assert fetched["profile"]=="finops-prod"
    assert fetched["region"]=="eu-west-1"

    # Profiles discovery always contains at least 1 profile
    profs=server.list_aws_profiles()
    assert isinstance(profs, list)
    assert len(profs)>=1

def test_policy_templates_and_structure(monkeypatch,tmp_path):
    server=load_server(monkeypatch,tmp_path)
    policies=server.get_policy_templates()
    assert len(policies)==4
    ids=[p["id"] for p in policies]
    assert "full" in ids
    assert "tier1" in ids
    assert "tier2" in ids
    assert "tier3" in ids

    full_p=next(p for p in policies if p["id"]=="full")
    assert full_p["recommended"] is True
    parsed=json.loads(full_p["policyJson"])
    assert "Statement" in parsed
    assert parsed["Statement"][0]["Effect"]=="Allow"
    assert len(parsed["Statement"][0]["Action"])>10


