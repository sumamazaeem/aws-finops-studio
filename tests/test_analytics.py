import pytest
from backend.analytics import (
    calculate_allocation_coverage,
    calculate_pipeline_savings,
    calculate_service_deltas,
    credit_adjustment_ratio,
    deduplicate,
    money,
    percent_change,
    saving_percent,
    total,
    validate_recommendation,
    variance,
)

def record(**changes):
    item={"id":"r1","what":"x","why":"y","evidence":[],"resource":"i-1","service":"EC2","account":"a","region":"r","type":"rightsize","action":"downsize","currentCost":"100","estimatedSaving":"25","savingPercent":25,"confidence":"high","risk":"low","implementationGuidance":"review","rollbackConsiderations":"restore","status":"identified","createdDate":"2026-01-01","verifiedDate":None,"realizedSaving":"0"}
    item.update(changes); return item

def test_deterministic_money_and_totals(): assert money("1.005")=="1.01" and total(["1.10","2.20"])=="3.30"
def test_percent_calculations(): assert percent_change(125,100)==25.0 and percent_change(1,0) is None and saving_percent(25,100)==25.0
def test_rejects_malformed_numeric_data():
    with pytest.raises(ValueError): money("NaN")
def test_schema_validation_and_status():
    validate_recommendation(record())
    with pytest.raises(ValueError): validate_recommendation(record(status="deleted"))
def test_dedup_prefers_stronger_confidence_then_saving():
    chosen=deduplicate([record(id="a",confidence="low",estimatedSaving="90"),record(id="b",confidence="high",estimatedSaving="20")])
    assert len(chosen)==1 and chosen[0]["id"]=="b"
def test_empty_dataset(): assert total([])=="0.00" and deduplicate([])==[]

def test_variance():
    v = variance("120.00", "100.00")
    assert v["current"] == "120.00" and v["previous"] == "100.00"
    assert v["diff"] == "20.00" and v["percentChange"] == 20.0

def test_credit_adjustment_ratio():
    assert credit_adjustment_ratio("-25.00", "100.00") == 25.0
    assert credit_adjustment_ratio("-10.00", "0.00") is None

def test_calculate_service_deltas():
    curr = [{"service": "EC2", "cost": "150.00"}, {"service": "S3", "cost": "50.00"}]
    prev = [{"service": "EC2", "cost": "100.00"}, {"service": "RDS", "cost": "40.00"}]
    deltas = calculate_service_deltas(curr, prev)
    assert len(deltas) == 3
    # EC2 should be top (150.00)
    assert deltas[0]["service"] == "EC2"
    assert deltas[0]["cost"] == "150.00"
    assert deltas[0]["previousCost"] == "100.00"
    assert deltas[0]["costDelta"] == "50.00"
    assert deltas[0]["changePercent"] == 50.0
    # RDS: current is 0, previous is 40
    rds = next(d for d in deltas if d["service"] == "RDS")
    assert rds["cost"] == "0.00"
    assert rds["previousCost"] == "40.00"
    assert rds["costDelta"] == "-40.00"

def test_calculate_pipeline_savings():
    items = [
        record(id="1", status="identified", estimatedSaving="100.00"),
        record(id="2", status="approved", estimatedSaving="50.00"),
        record(id="3", status="verified", estimatedSaving="30.00", realizedSaving="28.50"),
    ]
    pipe = calculate_pipeline_savings(items)
    assert pipe["statusCounts"]["identified"] == 1
    assert pipe["statusCounts"]["approved"] == 1
    assert pipe["statusCounts"]["verified"] == 1
    assert pipe["totalActivePipeline"] == "150.00"  # identified + approved
    assert pipe["totalRealizedSaving"] == "28.50"

def test_calculate_allocation_coverage():
    res = calculate_allocation_coverage("800.00", "1000.00")
    assert res["allocated"] == "800.00"
    assert res["total"] == "1000.00"
    assert res["unallocated"] == "200.00"
    assert res["coveragePercent"] == 80.0

