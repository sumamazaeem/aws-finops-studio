import pytest

from backend.aws_dashboard import cost_filter, parse_tags


def test_parse_multiple_tags():
    assert parse_tags("Team=Platform, Environment=Prod") == [
        {"key": "Team", "value": "Platform"},
        {"key": "Environment", "value": "Prod"},
    ]


def test_invalid_tag_is_rejected():
    with pytest.raises(ValueError):
        parse_tags("missing-value")


def test_tag_and_record_type_filters_are_combined():
    value = cost_filter("Team=Platform,Environment=Prod", True)
    assert "And" in value
    assert len(value["And"]) == 3
    assert value["And"][0]["Not"]["Dimensions"]["Key"] == "RECORD_TYPE"

