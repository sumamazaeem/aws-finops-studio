---
name: finops-studio
description: Evidence-backed, read-only AWS FinOps investigation and recommendation workflow.
always: true
---

# AWS FinOps Studio workflow

This workflow coordinates with the bundled official AWS Agent Toolkit skills packaged with this app:
- `aws-billing-and-cost-management`: Master domain rules for Cost Explorer, Cost Optimization Hub, Compute Optimizer, commitments (Savings Plans & RIs), budgets, forecasts, pricing, CUR, and anomaly detection.
- `aws-storage`: S3 storage class tiering, lifecycle policies, and EBS volume type optimization.
- `aws-observability`: CloudWatch utilization metrics and idle infrastructure thresholds.
- `aws-iam`: Read-only policy validation and least-privilege access rules.
- `aws-well-architected-review`: Cost Optimization pillar alignment and assessment criteria.

This `finops-studio` skill governs the end-to-end investigation procedure, evidence-based recommendations, and deterministic financial calculations.

## Safety and calculation rules

- Read-only analysis only. Never mutate AWS or purchase commitments.
- Use the normal credential/profile chain; never request or persist credential values.
- Determine the actual current date and make every range explicit.
- Totals, percentages, deltas, forecasts, savings, averages, utilization, ROI, and payback must come from deterministic code or an AWS API response, never language-model arithmetic.
- Preserve source tool, time range, metric, filters, currency, and resource identifiers as evidence.
- Keep demo and live AWS data strictly separate.

## Procedure

1. Establish profile/account/region context without exposing secrets.
2. Establish timeframe and comparable previous period.
3. Retrieve actual cost and usage; state gaps and access failures.
4. Calculate a deterministic baseline and primary drivers.
5. Query Cost Optimization Hub, then enrich with Compute Optimizer.
6. Validate material recommendations with CloudWatch utilization when possible.
7. Consult current pricing only when necessary.
8. Deduplicate by account, region, resource, type, and action.
9. Calculate savings deterministically; never combine incompatible estimates.
10. Assign confidence from evidence quality and risk from blast radius and reversibility.
11. Store useful recommendations and lifecycle changes.
12. Explain conclusions as **Observed fact**, **Inference**, and **Recommendation**.

Every recommendation carries: id, what, why, evidence, resource, service, account, region, currentCost, estimatedSaving, savingPercent, confidence, risk, implementationGuidance, rollbackConsiderations, status, createdDate, verifiedDate, and realizedSaving. Status is `identified`, `reviewed`, `approved`, `implemented`, `dismissed`, or `verified`. Never claim realized savings until verified against an equivalent post-change billing period. If data is insufficient, say so rather than inventing a score.
