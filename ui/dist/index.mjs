import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { useState as p, useEffect as se, useMemo as oe } from "react";
import { useAppApi as me, useChatLauncher as ue } from "@kirocrew/app-sdk";
import { Skeleton as te, PageHeader as he, ErrorNotice as pe, Card as x, Btn as y, Badge as v, CardTitle as g, StatCard as I, EmptyState as xe } from "@kirocrew/app-sdk/ui";
const fe = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], be = [["Overview", "◫"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], W = (n) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n)), E = (n) => {
  const i = Number(n);
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(i) < 5e-3 ? 0 : i);
}, ie = (n) => n === "high" ? "success" : n === "medium" ? "warning" : "default";
function X({ className: n = "w-6 h-6" }) {
  return /* @__PURE__ */ t("svg", { className: n, viewBox: "0 0 44 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M22 1.15L3.5 12.05L22 22.34L40.5 12.05L22 1.15Z", fill: "#00E5A3" }),
    /* @__PURE__ */ e("path", { d: "M18.8 47.66L0.5 37.36V16.71L18.8 27.01V47.66Z", fill: "#00C693" }),
    /* @__PURE__ */ e("path", { d: "M25.2 47.66L43.5 37.36V16.71L25.2 27.01V47.66Z", fill: "#00966F" })
  ] });
}
function ze() {
  const n = me(), { openChat: i } = ue(), [s, d] = p("Overview"), [l, h] = p(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [a, f] = p("Practitioner"), [o, m] = p(null), [b, O] = p([]), [j, $] = p([]), [R, H] = p(null), [B, S] = p(""), [M, F] = p(!1), [V, T] = p([]), [G, N] = p(null), [U, J] = p(null), [u, Q] = p(null), [L, C] = p(null), w = () => {
    m(null), S("");
    const c = "/apps/aws-finops-studio/api", r = l ? "demo" : "live";
    Promise.all([
      n.get(`${c}/overview?mode=${r}`),
      n.get(`${c}/recommendations?mode=${r}`),
      n.get(`${c}/evidence`),
      n.get(`${c}/reports`),
      n.get(`${c}/diagnostics`),
      n.get(`${c}/profiles`),
      n.get(`${c}/policies`)
    ]).then(([P, _, D, ee, le, ce, ae]) => {
      m(P), O(_.items), $((D == null ? void 0 : D.runs) || []), T((ee == null ? void 0 : ee.items) || []), H(le), Q(ce), C(ae);
    }).catch((P) => S(P.message || "Unable to load FinOps data"));
  };
  se(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(l));
    } catch {
    }
    w();
  }, [l]);
  const k = (c) => i({ agent: "finops-agent", message: c, autoSend: !0 }), z = async () => {
    F(!0), S("");
    try {
      const c = await n.post("/apps/aws-finops-studio/api/refresh-live", {});
      m(c);
      const r = await n.get("/apps/aws-finops-studio/api/evidence");
      $((r == null ? void 0 : r.runs) || []);
      const P = await n.get("/apps/aws-finops-studio/api/diagnostics");
      H(P);
    } catch (c) {
      S(c.message || "Unable to load live AWS data");
    } finally {
      F(!1);
    }
  }, q = async (c, r) => {
    S(""), F(!0);
    try {
      const P = await n.post("/apps/aws-finops-studio/api/profiles", { profile: c, region: r });
      Q(P), w();
    } catch (P) {
      S(P.message || "Failed to switch AWS profile");
    } finally {
      F(!1);
    }
  }, Y = async (c) => {
    J(c), S("");
    try {
      const r = await n.post("/apps/aws-finops-studio/api/reports", { type: c, mode: l ? "demo" : "live" });
      r != null && r.items && T(r.items), r != null && r.report && N(r.report);
    } catch (r) {
      S(r.message || "Failed to generate report");
    } finally {
      J(null);
    }
  }, Z = oe(() => o ? s === "Overview" ? o.mode === "live" ? /* @__PURE__ */ e(ve, { data: o, persona: a, onAsk: k, onRefresh: z, refreshing: M }) : /* @__PURE__ */ e(Ne, { data: o, persona: a, onAsk: () => k("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : s === "Optimization" || s === "Resources" ? /* @__PURE__ */ e(
    ye,
    {
      items: b,
      title: s,
      demo: l,
      onSwitchToDemo: () => h(!0),
      onRefresh: z,
      refreshing: M
    }
  ) : s === "History" ? /* @__PURE__ */ e(we, { runs: j, recommendations: b, onRefresh: w }) : s === "Connection" ? /* @__PURE__ */ e(
    Ae,
    {
      data: R,
      profilesData: u,
      policiesData: L,
      onSwitchProfile: q,
      onRefreshLive: z,
      refreshing: M
    }
  ) : s === "Ask FinOps" ? /* @__PURE__ */ e(Se, { onAsk: k }) : s === "Anomalies" ? o.mode === "demo" ? /* @__PURE__ */ e(Ce, { items: o.anomalies }) : /* @__PURE__ */ e(K, { title: "Live anomaly analysis", text: "Query AWS Cost Anomaly Detection and Cost Explorer. No synthetic anomalies are shown in Live mode.", action: () => k("Use live AWS data only. Analyze current cost anomalies and preserve the API evidence. Do not use demo data.") }) : s === "Cost Explorer" ? o.mode === "demo" ? /* @__PURE__ */ e(ke, { items: o.drivers }) : o.dataAvailable ? /* @__PURE__ */ e(ge, { drivers: o.drivers, previous: o.previousDrivers || [], onRefresh: z, refreshing: M }) : /* @__PURE__ */ e(de, { onRefresh: z, refreshing: M }) : s === "Commitments" ? /* @__PURE__ */ e(K, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => k("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : s === "Well-Architected" ? /* @__PURE__ */ e(K, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => k("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : s === "Reports" ? /* @__PURE__ */ e(Oe, { reports: V, selectedReport: G, onSelectReport: N, onGenerate: Y, generating: U, onAskAgent: () => k("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ e(K, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => k("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(te, {}),
    /* @__PURE__ */ e(te, {}),
    /* @__PURE__ */ e(te, {})
  ] }), [s, o, b, j, V, G, U, R, u, L, l, a, M]), A = (o == null ? void 0 : o.callerIdentity) || (R == null ? void 0 : R.callerIdentity);
  return /* @__PURE__ */ t("div", { className: "h-full min-h-0 flex bg-surface text-foreground", children: [
    /* @__PURE__ */ t("aside", { className: "w-64 shrink-0 border-r border-border bg-surface-muted/40 p-3 overflow-y-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "p-3 mb-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 font-semibold", children: [
            /* @__PURE__ */ e("div", { className: "p-1.5 rounded-xl bg-surface border border-border shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(X, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ t("div", { children: [
              /* @__PURE__ */ e("div", { className: "leading-tight", children: "AWS FinOps Studio" }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-muted uppercase tracking-wider font-mono", children: "v0.1.0 · Read-Only" })
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: "Deterministic financial engineering & evidence" })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2 mb-3 rounded-lg border border-border/80 bg-surface/60 text-xs", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] uppercase font-bold text-muted flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { children: "Active Scope" }),
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${l ? "bg-amber-500" : A != null && A.verified ? "bg-emerald-500" : "bg-muted"}` })
          ] }),
          !l && (u != null && u.profiles) && u.profiles.length > 1 ? /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
            "select",
            {
              value: u.activeProfile,
              onChange: (c) => q(c.target.value, u.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: u.profiles.map((c) => /* @__PURE__ */ t("option", { value: c, children: [
                "Profile: ",
                c
              ] }, c))
            }
          ) }) : /* @__PURE__ */ e("div", { className: "font-medium mt-1 truncate", children: l ? "Synthetic Sandbox" : A != null && A.accountMasked ? `Account ${A.accountMasked}` : `Profile: ${(u == null ? void 0 : u.activeProfile) || "default"}` }),
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-[11px] text-muted mt-1 truncate", children: [
            /* @__PURE__ */ e("span", { children: l ? "Mock AWS Environment" : `${(u == null ? void 0 : u.activeRegion) || (A == null ? void 0 : A.region) || "us-east-1"} · Read-only` }),
            !l && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => d("Connection"),
                className: "text-accent hover:underline text-[10px] font-medium",
                children: "IAM Helper →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: be.map(([c, r]) => /* @__PURE__ */ t("button", { onClick: () => d(c), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${s === c ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: r }),
          c
        ] }, c)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-4 pt-3 border-t border-border", children: /* @__PURE__ */ t(
        "div",
        {
          onClick: () => h(!l),
          className: `p-3 rounded-xl border cursor-pointer select-none transition-all ${l ? "border-border bg-surface-muted/40 hover:border-border/80" : "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-500/60"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${l ? "bg-muted-foreground/40" : "bg-emerald-500"}` }),
                /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "Live AWS" }),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: `text-[10px] font-bold px-1.5 py-0.5 rounded ${l ? "bg-surface-muted text-muted" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"}`,
                    children: l ? "OFF" : "ON"
                  }
                )
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": !l,
                  "aria-label": "Toggle Live AWS",
                  onClick: (c) => {
                    c.stopPropagation(), h(!l);
                  },
                  className: `relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${l ? "bg-slate-300 dark:bg-slate-600" : "bg-emerald-500"}`,
                  children: /* @__PURE__ */ e(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${l ? "translate-x-0" : "translate-x-5"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-2 leading-snug", children: l ? "Demo sandbox mode. Turn ON for real AWS telemetry." : "Connected to live AWS. Real billing queries & strict evidence." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-y-auto", children: [
      /* @__PURE__ */ t("div", { className: "px-6 pt-5 pb-3 border-b border-border flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ e(he, { title: s, subtitle: "Deterministic, read-only AWS financial operations workspace" }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border", children: fe.map((c) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => f(c.id),
            title: c.desc,
            className: `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${a === c.id ? "bg-surface text-foreground shadow-sm font-semibold" : "text-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ e("span", { children: c.icon }),
              /* @__PURE__ */ e("span", { children: c.label })
            ]
          },
          c.id
        )) })
      ] }),
      B && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e(pe, { message: B }) }),
      Z
    ] })
  ] });
}
function ne({ title: n, data: i, persona: s }) {
  const d = Math.abs(Number(i.credits)), l = Number(i.costBeforeCredits), h = l > 0 ? (d / l * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(x, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(g, { children: n }),
        /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1 font-mono", children: [
          i.start,
          " → ",
          i.end,
          " · End exclusive",
          i.estimated ? " · estimated" : ""
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        s === "Finance" && /* @__PURE__ */ t(v, { tone: "info", children: [
          "Credit ratio: ",
          h,
          "%"
        ] }),
        /* @__PURE__ */ e(v, { children: "RECORD_TYPE" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Unblended Gross (Pre-Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: E(i.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: E(i.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: E(i.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: E(i.netCost) })
      ] })
    ] }),
    (s === "Practitioner" || s === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(i.recordTypes, null, 2) })
    ] })
  ] });
}
function de({ onRefresh: n, refreshing: i }) {
  return /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(y, { onClick: n, disabled: i, children: i ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function ve({ data: n, persona: i, onAsk: s, onRefresh: d, refreshing: l }) {
  var f, o, m, b;
  const h = (f = n.live) == null ? void 0 : f.previousMonth, a = (o = n.live) == null ? void 0 : o.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(v, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: i }),
          " · ",
          (m = n.live) != null && m.profile ? `Profile: ${n.live.profile}` : ""
        ] })
      ] }),
      n.payloadHash && /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-muted flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { children: "SHA-256 Provenance:" }),
        /* @__PURE__ */ t("code", { className: "px-1.5 py-0.5 rounded bg-surface border border-border text-foreground font-semibold", children: [
          n.payloadHash.slice(0, 16),
          "…"
        ] })
      ] })
    ] }),
    !n.dataAvailable && /* @__PURE__ */ e(de, { onRefresh: d, refreshing: l }),
    h && /* @__PURE__ */ e(ne, { title: "Previous complete month", data: h, persona: i }),
    a && /* @__PURE__ */ e(ne, { title: "Month to date", data: a, persona: i }),
    n.dataAvailable && i === "Leadership" && /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ e(g, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: E((a == null ? void 0 : a.netCost) || "0.00") })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Active Optimization Pipeline" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-accent", children: n.optimizationOpportunity ? W(n.optimizationOpportunity) : "$0" })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Verified Realized Savings" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-emerald-600", children: "$0.00 (awaiting post-cycle verification)" })
        ] })
      ] })
    ] }),
    n.dataAvailable && /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((b = n.live) == null ? void 0 : b.refreshedAt) && `Last refreshed: ${n.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(y, { onClick: d, disabled: l, children: l ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(y, { onClick: () => s("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
      ] })
    ] }) })
  ] });
}
function ge({ drivers: n, previous: i, onRefresh: s, refreshing: d }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Service Cost Drivers" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Pre-credit unblended cost with Month-over-Month delta tracking" })
      ] }),
      /* @__PURE__ */ e(y, { onClick: s, disabled: d, children: d ? "Refreshing…" : "Refresh live AWS data" })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ e(g, { children: "Month-to-Date Services & MoM Change" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "UnblendedCost · Excludes Credit & Refund record types" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((l) => {
        const h = Number(l.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: l.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            l.changePercent !== null && l.changePercent !== void 0 && /* @__PURE__ */ t(v, { tone: h > 0 ? "warning" : "success", children: [
              h > 0 ? "+" : "",
              l.changePercent,
              "% (",
              h > 0 ? "+" : "",
              E(l.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: E(l.cost) })
          ] })
        ] }, l.service);
      }) }),
      !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ e(g, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: i.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: l.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: E(l.cost) })
      ] }, l.service)) }),
      !i.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function Ne({ data: n, persona: i, onAsk: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(v, { children: [
          "Demo mode · as of ",
          n.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: i })
        ] })
      ] }),
      /* @__PURE__ */ e(y, { onClick: s, children: "✦ Explain demo dataset" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]", children: [
      /* @__PURE__ */ e(I, { label: "Month to date", value: W(n.mtdSpend), accent: !0 }),
      /* @__PURE__ */ e(I, { label: "Forecast", value: W(n.forecast) }),
      /* @__PURE__ */ e(I, { label: "Previous equivalent", value: W(n.previousEquivalent) }),
      /* @__PURE__ */ e(I, { label: "Cost change", value: `${n.costChangePercent > 0 ? "+" : ""}${n.costChangePercent}%` }),
      /* @__PURE__ */ e(I, { label: "Optimization opportunity", value: W(n.optimizationOpportunity) }),
      /* @__PURE__ */ e(I, { label: "FinOps score", value: "Insufficient data" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t(x, { children: [
        /* @__PURE__ */ e(g, { children: "Major cost drivers" }),
        /* @__PURE__ */ e("div", { className: "mt-4 space-y-3", children: n.drivers.map((d) => /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ e("span", { children: d.service }),
            /* @__PURE__ */ t("span", { className: "font-medium", children: [
              W(d.cost),
              " ",
              /* @__PURE__ */ t("span", { className: (d.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
                (d.changePercent || 0) > 0 ? "+" : "",
                d.changePercent,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "h-2 mt-2 bg-surface-muted rounded-full overflow-hidden", children: /* @__PURE__ */ e("div", { className: "h-full bg-accent rounded-full", style: { width: `${Math.min(100, Number(d.cost) / 70)}%` } }) })
        ] }, d.service)) })
      ] }),
      /* @__PURE__ */ t(x, { children: [
        /* @__PURE__ */ e(g, { children: "Recent anomalies" }),
        /* @__PURE__ */ e("div", { className: "mt-3 divide-y divide-border", children: n.anomalies.map((d) => /* @__PURE__ */ t("div", { className: "py-3 flex gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-amber-500", "aria-hidden": !0, children: "△" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium", children: [
              d.service,
              " · ",
              W(d.impact)
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
              d.summary,
              " · ",
              d.date
            ] })
          ] })
        ] }, d.date + d.service)) })
      ] })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ e(g, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: n.finopsScoreReason })
    ] })
  ] });
}
function ye({
  items: n,
  title: i,
  demo: s,
  onSwitchToDemo: d,
  onRefresh: l,
  refreshing: h
}) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-4", children: n.length > 0 ? /* @__PURE__ */ e("div", { className: "grid gap-3", children: n.map((a) => /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/10 text-emerald-600 h-fit", children: "↘" }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ e(g, { children: a.what }),
        /* @__PURE__ */ e(v, { children: a.service }),
        /* @__PURE__ */ e(v, { tone: a.status === "verified" ? "success" : a.status === "approved" ? "info" : "default", children: a.status })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: a.why }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Potential saving" }),
          /* @__PURE__ */ t("b", { children: [
            W(a.estimatedSaving),
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
          /* @__PURE__ */ e(v, { tone: ie(a.confidence), children: a.confidence })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
          /* @__PURE__ */ e(v, { tone: ie(a.risk), children: a.risk })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Resource" }),
          /* @__PURE__ */ e("code", { className: "text-xs", children: a.resource })
        ] })
      ] }),
      /* @__PURE__ */ t("details", { className: "mt-3 text-xs text-muted", children: [
        /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Supporting evidence & lifecycle" }),
        /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded whitespace-pre-wrap", children: JSON.stringify(a.evidence, null, 2) })
      ] })
    ] })
  ] }) }, a.id)) }) : s ? /* @__PURE__ */ e(xe, { title: `No ${i.toLowerCase()} records`, description: "Demo mode contains sample records." }) : /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "text-center py-8 max-w-lg mx-auto", children: [
    /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold", children: "✓" }),
    /* @__PURE__ */ t("h3", { className: "text-base font-semibold text-foreground", children: [
      "0 Active ",
      i,
      " Warnings Detected"
    ] }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2 leading-relaxed", children: "AWS Cost Optimization Hub and Compute Optimizer were scanned for your active AWS profile. Your workload currently has no idle resources, abandoned EBS volumes, or rightsizing warnings." }),
    /* @__PURE__ */ t("div", { className: "mt-4 p-3 rounded-lg bg-surface-muted/60 border border-border text-left text-xs text-muted space-y-2", children: [
      /* @__PURE__ */ e("div", { className: "font-semibold text-foreground", children: "Live Telemetry Status:" }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }),
        /* @__PURE__ */ t("span", { children: [
          /* @__PURE__ */ e("strong", { children: "Cost Optimization Hub:" }),
          " Active & Enrolled (0 active findings)"
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
        /* @__PURE__ */ t("span", { children: [
          /* @__PURE__ */ e("strong", { children: "Compute Optimizer:" }),
          " Active (telemetry takes 24–48 hrs after enrollment)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-5 flex flex-wrap items-center justify-center gap-3", children: [
      /* @__PURE__ */ e(y, { onClick: d, children: "✦ Switch to Demo Mode to Explore Workflow" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: l,
          disabled: h,
          className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
          children: h ? "Scanning AWS…" : "↻ Re-scan AWS Telemetry"
        }
      )
    ] })
  ] }) }) });
}
function we({ runs: n, recommendations: i, onRefresh: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Immutable Evidence & Audit Trail" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Durable SQLite runs, SHA-256 provenance hashes, and lifecycle state" })
      ] }),
      /* @__PURE__ */ e(y, { onClick: s, children: "Refresh audit log" })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ t(g, { children: [
        "Historical Query Runs (",
        n.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Every refresh persists an immutable query record with request parameters and hash" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border", children: [
        n.map((d) => /* @__PURE__ */ t("div", { className: "py-3 flex flex-wrap items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "font-medium text-sm font-mono text-foreground", children: d.id }),
            /* @__PURE__ */ t("div", { className: "text-muted mt-0.5", children: [
              "Account: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: d.accountMasked }),
              " · Profile: ",
              d.profile,
              " · Region: ",
              d.region
            ] }),
            /* @__PURE__ */ t("div", { className: "text-muted font-mono mt-1 text-[11px]", children: [
              "Hash: ",
              d.payloadHash
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e(v, { tone: "success", children: "Verified" }),
            /* @__PURE__ */ e("div", { className: "text-muted mt-1", children: d.timestamp })
          ] })
        ] }, d.id)),
        !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ t(g, { children: [
        "Recommendation Decision Lifecycle (",
        i.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Identified → Reviewed → Approved → Implemented → Verified" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border text-xs", children: [
        i.map((d) => /* @__PURE__ */ t("div", { className: "py-2.5 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: d.what }),
            /* @__PURE__ */ t("span", { className: "text-muted ml-2", children: [
              "(",
              d.service,
              " · ",
              d.resource,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ e(v, { tone: d.status === "verified" ? "success" : d.status === "approved" ? "info" : "default", children: d.status })
        ] }, d.id)),
        !i.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-2", children: "No recommendations currently stored." })
      ] })
    ] })
  ] });
}
function Ae({
  data: n,
  profilesData: i,
  policiesData: s,
  onSwitchProfile: d,
  onRefreshLive: l,
  refreshing: h
}) {
  var k, z, q, Y, Z, A, c;
  const [a, f] = p((i == null ? void 0 : i.activeProfile) || "default"), [o, m] = p((i == null ? void 0 : i.activeRegion) || "us-east-1"), [b, O] = p(""), [j, $] = p("full"), [R, H] = p(!1), [B, S] = p(!1), [M, F] = p(!1), [V, T] = p(null);
  se(() => {
    i != null && i.activeProfile && f(i.activeProfile), i != null && i.activeRegion && m(i.activeRegion);
  }, [i]);
  const G = async () => {
    const r = (b.trim() || o).trim();
    F(!0), T(null);
    try {
      await d(a, r), T(`Scope applied: profile "${a}" in region "${r}"`), setTimeout(() => T(null), 4e3);
    } finally {
      F(!1);
    }
  }, N = ((k = s == null ? void 0 : s.policies) == null ? void 0 : k.find((r) => r.id === j)) || ((z = s == null ? void 0 : s.policies) == null ? void 0 : z[0]), U = () => {
    var r;
    N != null && N.policyJson && ((r = navigator.clipboard) == null || r.writeText(N.policyJson), H(!0), setTimeout(() => H(!1), 2500));
  }, J = () => {
    var _;
    const r = (b.trim() || o).trim(), P = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${a} --region ${r}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${a}`;
    (_ = navigator.clipboard) == null || _.writeText(P), S(!0), setTimeout(() => S(!1), 2500);
  }, u = (i == null ? void 0 : i.callerIdentity) || (n == null ? void 0 : n.callerIdentity), Q = (q = i == null ? void 0 : i.profiles) != null && q.length ? i.profiles : ["default"], L = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], C = (Y = n == null ? void 0 : n.checks) == null ? void 0 : Y.find((r) => r.name.includes("Cost Optimization Hub")), w = (Z = n == null ? void 0 : n.checks) == null ? void 0 : Z.find((r) => r.name.includes("Compute Optimizer"));
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(g, { children: "AWS Profile & Scope Management" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Select which local AWS profile and target region to query. Works with AWS Control Tower, IAM Identity Center (SSO), and named CLI profiles." })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: `w-2.5 h-2.5 rounded-full ${u != null && u.verified ? "bg-emerald-500" : "bg-amber-500"}` }),
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: u != null && u.verified ? "STS Verified" : "Unauthenticated" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-6 mt-4", children: [
        /* @__PURE__ */ t("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1.5", children: "AWS Profile" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
              "select",
              {
                value: a,
                onChange: (r) => f(r.target.value),
                className: "flex-1 bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                children: Q.map((r) => /* @__PURE__ */ t("option", { value: r, children: [
                  r,
                  " ",
                  r === (i == null ? void 0 : i.activeProfile) ? "(active)" : ""
                ] }, r))
              }
            ) }),
            /* @__PURE__ */ t("p", { className: "text-[11px] text-muted mt-1", children: [
              "Discovered from ",
              /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: "~/.aws/credentials" }),
              ", ",
              /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: "~/.aws/config" }),
              ", and ",
              /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: "aws configure list-profiles" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1.5", children: "Target AWS Region" }),
            /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ t(
                "select",
                {
                  value: L.some((r) => r.id === o) ? o : "custom",
                  onChange: (r) => {
                    r.target.value !== "custom" && (m(r.target.value), O(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    L.map((r) => /* @__PURE__ */ e("option", { value: r.id, children: r.label }, r.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: b || (L.some((r) => r.id === o) ? "" : o),
                  onChange: (r) => O(r.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(y, { onClick: G, disabled: M, children: M ? "Applying Scope…" : "Switch & Verify Profile" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: l,
                disabled: h,
                className: "px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
                children: h ? "Refreshing…" : "↻ Test Connection & Ingest"
              }
            )
          ] }),
          V && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { children: "✓" }),
            /* @__PURE__ */ e("span", { children: V })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-surface-muted/40 border border-border flex flex-col justify-between", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] uppercase font-bold tracking-wider text-muted", children: "Caller Identity Provenance" }),
              /* @__PURE__ */ e(v, { tone: u != null && u.verified ? "success" : "default", children: u != null && u.verified ? "Active & Verified" : "Pending Verification" })
            ] }),
            /* @__PURE__ */ t("div", { className: "space-y-2 mt-3 font-mono text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Account:" }),
                /* @__PURE__ */ e("span", { className: "font-semibold text-foreground", children: (u == null ? void 0 : u.accountMasked) || "unknown" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Profile:" }),
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (i == null ? void 0 : i.activeProfile) || a })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (i == null ? void 0 : i.activeRegion) || o })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: [
                /* @__PURE__ */ e("span", { className: "text-muted block mb-1", children: "IAM ARN:" }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-foreground/90 break-all select-all", children: (u == null ? void 0 : u.arn) || "None (verify credentials)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-3 pt-3 border-t border-border/60", children: "Zero mutations: AWS FinOps Studio runs 100% read-only operations via STS and Cost APIs." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(g, { children: "IAM Least-Privilege Policy Helper" }),
            /* @__PURE__ */ e(v, { tone: "success", children: "Read-Only Guardrails" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1", children: [
            "Exact IAM policy definitions for AWS profile ",
            /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: a }),
            ". Ready for 1-click copy-paste into the AWS IAM Console."
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(y, { onClick: U, children: R ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (A = s == null ? void 0 : s.policies) == null ? void 0 : A.map((r) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => $(r.id),
          className: `p-3 rounded-xl border text-left transition-all ${j === r.id ? "border-accent bg-accent/10 shadow-sm" : "border-border bg-surface hover:border-border/80"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted", children: r.tier }),
              r.recommended && /* @__PURE__ */ e("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400", children: "Recommended" })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-foreground truncate", children: r.title }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted mt-1", children: [
              r.actionCount,
              " IAM Actions"
            ] })
          ]
        },
        r.id
      )) }),
      N && /* @__PURE__ */ t("div", { className: "mt-4 p-4 rounded-xl bg-surface-muted/30 border border-border space-y-4", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { children: N.title }),
              /* @__PURE__ */ e(v, { tone: N.recommended ? "success" : "default", children: N.file })
            ] }),
            /* @__PURE__ */ t("span", { className: "text-xs text-muted font-mono", children: [
              N.actionCount,
              " read-only permissions"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1.5 leading-relaxed", children: N.summary })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] uppercase font-bold text-muted mb-2", children: "Capabilities Unlocked:" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: N.services.map((r) => /* @__PURE__ */ t("span", { className: "px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono text-foreground/80", children: [
            "✓ ",
            r
          ] }, r)) })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3 rounded-lg bg-surface border border-border text-xs space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: /* @__PURE__ */ e("span", { children: "⚙️ Service Enrollment & Free Tier Status" }) }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: J,
                className: "text-accent hover:underline text-[11px] font-medium",
                children: B ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-2 text-[11px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: C != null && C.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: C != null && C.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Cost Optimization Hub (100% Free)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (C == null ? void 0 : C.detail) || "Opt-in required for automated rightsizing" })
              ] })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: w != null && w.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: w != null && w.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Compute Optimizer (100% Free Standard Tier)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (w == null ? void 0 : w.detail) || "Opt-in required for EC2 & EBS rightsizing" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted", children: [
              "JSON Policy Definition (",
              N.file,
              ")"
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: U,
                className: "text-accent hover:underline text-xs font-medium flex items-center gap-1",
                children: /* @__PURE__ */ e("span", { children: R ? "✓ Copied to clipboard" : "📋 Copy JSON" })
              }
            )
          ] }),
          /* @__PURE__ */ e("pre", { className: "p-3.5 rounded-xl bg-surface-muted/80 border border-border text-[11px] font-mono text-foreground overflow-x-auto max-h-64 leading-relaxed select-all", children: N.policyJson })
        ] }),
        /* @__PURE__ */ t("div", { className: "pt-2 border-t border-border/70 text-xs text-muted space-y-1.5", children: [
          /* @__PURE__ */ e("div", { className: "font-semibold text-foreground", children: "How to attach this policy in AWS IAM:" }),
          /* @__PURE__ */ t("ol", { className: "list-decimal list-inside space-y-1 text-[11px] pl-1", children: [
            /* @__PURE__ */ t("li", { children: [
              "Click ",
              /* @__PURE__ */ e("strong", { children: "Copy Policy JSON" }),
              " above."
            ] }),
            /* @__PURE__ */ t("li", { children: [
              "In the AWS Console, open ",
              /* @__PURE__ */ e("strong", { children: "IAM > Policies > Create Policy" }),
              " and select the ",
              /* @__PURE__ */ e("strong", { children: "JSON" }),
              " tab."
            ] }),
            /* @__PURE__ */ t("li", { children: [
              "Paste the JSON, name the policy ",
              /* @__PURE__ */ e("code", { className: "text-accent font-mono", children: "AWSFinOpsStudioReadOnlyPolicy" }),
              ", and click ",
              /* @__PURE__ */ e("strong", { children: "Create Policy" }),
              "."
            ] }),
            /* @__PURE__ */ t("li", { children: [
              "Attach this policy to the IAM user or IAM role used by your profile ",
              /* @__PURE__ */ e("code", { className: "text-accent font-mono", children: a }),
              "."
            ] }),
            /* @__PURE__ */ e("li", { children: "If Cost Optimization Hub or Compute Optimizer are inactive, run the 1-click free opt-in commands in your terminal." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground", children: "System & Diagnostics Health" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Real-time health probes verifying credentials, storage, and AWS service access." })
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: l,
            disabled: h,
            className: "text-accent hover:underline text-xs font-medium",
            children: h ? "Probing…" : "↻ Re-run Health Probes"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (c = n == null ? void 0 : n.checks) == null ? void 0 : c.map((r) => /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ e("div", { className: `mt-0.5 text-sm ${r.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}`, children: r.ok ? "✓" : "○" }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e(g, { children: r.name }),
            /* @__PURE__ */ e(v, { tone: r.ok ? "success" : "default", children: r.ok ? "Passing" : "Action Required" })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1 leading-relaxed", children: r.detail })
        ] })
      ] }) }, r.name)) })
    ] })
  ] });
}
function Se({ onAsk: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(x, { children: [
    /* @__PURE__ */ e(g, { children: "Ask an evidence-backed question" }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: "The FinOps Agent uses live, read-only AWS tools and deterministic arithmetic." }),
    /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-2 mt-4", children: [
      "Why did my AWS bill increase this month?",
      "What are my top 10 cost drivers?",
      "Are credits or refunds making my net cost look like zero?",
      "Where am I wasting money?",
      "Compare this month against last month.",
      "Find my highest-confidence optimization opportunities."
    ].map((s) => /* @__PURE__ */ e("button", { className: "text-left p-3 rounded-lg border border-border hover:border-accent text-sm transition-colors", onClick: () => n(s), children: s }, s)) })
  ] }) });
}
function Ce({ items: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-3", children: n.map((i) => /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e(g, { children: i.service }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: i.summary })
    ] }),
    /* @__PURE__ */ t("div", { className: "text-right", children: [
      /* @__PURE__ */ e("b", { children: W(i.impact) }),
      /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
        "estimated impact · ",
        i.date
      ] })
    ] })
  ] }) }, i.date + i.service)) });
}
function ke({ items: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(x, { children: [
    /* @__PURE__ */ e(g, { children: "Demo service breakdown" }),
    /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((i) => /* @__PURE__ */ t("div", { className: "py-3 grid grid-cols-3", children: [
      /* @__PURE__ */ e("b", { children: i.service }),
      /* @__PURE__ */ e("span", { children: W(i.cost) }),
      /* @__PURE__ */ t("span", { className: (i.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
        (i.changePercent || 0) > 0 ? "+" : "",
        i.changePercent,
        "%"
      ] })
    ] }, i.service)) }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-4", children: "Synthetic values shown only because Demo mode is enabled." })
  ] }) });
}
function K({ title: n, text: i, action: s }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: n }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: i }),
    /* @__PURE__ */ e(y, { onClick: s, children: "Open FinOps Agent" })
  ] }) }) });
}
function re(n) {
  return n.split(/(\*\*.*?\*\*|`.*?`)/g).map((s, d) => s.startsWith("**") && s.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: s.slice(2, -2) }, d) : s.startsWith("`") && s.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: s.slice(1, -1) }, d) : s);
}
function Pe({ content: n }) {
  const i = n.split(`
`), s = [];
  let d = [], l = !1;
  const h = (f, o) => {
    if (!f.length) return null;
    const m = f[0], b = f.slice(f.length > 1 && f[1].every((O) => O.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: m.map((O, j) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: O.trim() }, j)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: b.map((O, j) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: O.map(($, R) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: $.trim() }, R)) }, j)) })
    ] }) }, `table-${o}`);
  }, a = () => {
    l && d.length && (s.push(h(d, s.length)), d = [], l = !1);
  };
  return i.forEach((f, o) => {
    const m = f.trim();
    if (m.startsWith("|") && m.endsWith("|")) {
      l = !0;
      const b = m.split("|").slice(1, -1);
      d.push(b);
      return;
    } else
      a();
    m ? m.startsWith("# ") ? s.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: m.slice(2) }, o)) : m.startsWith("## ") ? s.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: m.slice(3) }, o)) : m.startsWith("### ") ? s.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: m.slice(4) }, o)) : m === "---" ? s.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, o)) : m.startsWith("- ") || m.startsWith("* ") ? s.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: re(m.slice(2)) })
      ] }, o)
    ) : s.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: re(m) }, o)
    ) : s.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${o}`));
  }), a(), /* @__PURE__ */ e("div", { className: "space-y-1", children: s });
}
function Oe({
  reports: n,
  selectedReport: i,
  onSelectReport: s,
  onGenerate: d,
  generating: l,
  onAskAgent: h
}) {
  const [a, f] = p(!1), o = (m) => {
    var b;
    (b = navigator.clipboard) == null || b.writeText(m), f(!0), setTimeout(() => f(!1), 2e3);
  };
  return i ? /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => s(null),
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "← Back to Report Archive"
          }
        ),
        /* @__PURE__ */ e(v, { tone: i.type === "executive" ? "success" : "info", children: i.type })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(y, { onClick: () => o(i.contentMarkdown), children: a ? "✓ Copied" : "Copy Report Markdown" }) })
    ] }),
    i.type === "backlog" && (i.contentMarkdown.includes("Identified Opportunities: 0") || i.contentMarkdown.includes("0 active optimization opportunities")) && /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-emerald-500 font-bold text-base", children: "✓" }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: "Live Optimization Scan Complete: 0 Waste Opportunities Detected" }),
        /* @__PURE__ */ e("div", { className: "text-muted mt-0.5", children: "AWS Cost Optimization Hub & Compute Optimizer verified 0 oversized instances or idle resources. This represents an audited clean baseline, not a failed or stuck process. See section 2 below for diagnostic details." })
      ] })
    ] }),
    /* @__PURE__ */ t(x, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(g, { children: i.title }),
        /* @__PURE__ */ t("div", { className: "text-xs text-muted mt-1 font-mono", children: [
          "Scope: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: i.scope }),
          " · Created: ",
          i.createdAt
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "p-4 rounded-xl bg-surface-muted/30 border border-border", children: /* @__PURE__ */ e(Pe, { content: i.contentMarkdown }) })
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-muted/50 border border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground", children: "FinOps Reports & Executive Archive" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-0.5", children: "Durable, audit-ready reports compiled from live AWS billing telemetry and optimization pipelines." })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ e(y, { onClick: () => d("executive"), disabled: !!l, children: l === "executive" ? "Generating Executive Report…" : "✦ Generate Executive Report" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => d("backlog"),
            disabled: !!l,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors",
            children: l === "backlog" ? "Generating Backlog…" : "↘ Generate Backlog Report"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: h,
            className: "px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors",
            children: "💬 Ask FinOps Agent in Chat"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-foreground", children: [
          "Saved Reports (",
          n.length,
          ")"
        ] }),
        /* @__PURE__ */ e("span", { className: "text-xs text-muted", children: "Persisted in local SQLite database" })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid gap-3", children: [
        n.map((m) => /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[280px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(v, { tone: m.type === "executive" ? "success" : "info", children: m.type }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-foreground", children: m.title })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: m.summary }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted font-mono mt-3", children: [
              "Scope: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: m.scope }),
              " · Generated: ",
              m.createdAt
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 self-center", children: [
            /* @__PURE__ */ e(y, { onClick: () => s(m), children: "Read Report" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => o(m.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, m.id)),
        !n.length && /* @__PURE__ */ e(x, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "No Reports Generated Yet" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted max-w-sm mx-auto mt-1 mb-4", children: "Generate your first monthly executive report or optimization backlog from live AWS billing telemetry." }),
          /* @__PURE__ */ e(y, { onClick: () => d("executive"), children: "Generate Executive Report Now" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ze as default
};
