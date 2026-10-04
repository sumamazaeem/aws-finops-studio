import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { useState as h, useEffect as re, useMemo as oe } from "react";
import { useAppApi as me, useChatLauncher as ue } from "@kirocrew/app-sdk";
import { Skeleton as te, PageHeader as he, ErrorNotice as pe, Card as p, Btn as A, Badge as b, CardTitle as g, StatCard as I, EmptyState as xe } from "@kirocrew/app-sdk/ui";
const fe = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], ve = [["Overview", "◫"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], W = (n) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n)), F = (n) => {
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
function Fe() {
  const n = me(), { openChat: i } = ue(), [s, d] = h("Overview"), [l, x] = h(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [u, f] = h("Practitioner"), [a, o] = h(null), [v, R] = h([]), [j, z] = h([]), [O, H] = h(null), [G, S] = h(""), [M, E] = h(!1), [V, L] = h([]), [J, N] = h(null), [U, B] = h(null), [m, Q] = h(null), [T, C] = h(null), y = () => {
    o(null), S("");
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
      o(P), R(_.items), z((D == null ? void 0 : D.runs) || []), L((ee == null ? void 0 : ee.items) || []), H(le), Q(ce), C(ae);
    }).catch((P) => S(P.message || "Unable to load FinOps data"));
  };
  re(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(l));
    } catch {
    }
    y();
  }, [l]);
  const k = (c) => i({ agent: "finops-agent", message: c, autoSend: !0 }), $ = async () => {
    E(!0), S("");
    try {
      const c = await n.post("/apps/aws-finops-studio/api/refresh-live", {});
      o(c);
      const r = await n.get("/apps/aws-finops-studio/api/evidence");
      z((r == null ? void 0 : r.runs) || []);
      const P = await n.get("/apps/aws-finops-studio/api/diagnostics");
      H(P);
    } catch (c) {
      S(c.message || "Unable to load live AWS data");
    } finally {
      E(!1);
    }
  }, q = async (c, r) => {
    S(""), E(!0);
    try {
      const P = await n.post("/apps/aws-finops-studio/api/profiles", { profile: c, region: r });
      Q(P), y();
    } catch (P) {
      S(P.message || "Failed to switch AWS profile");
    } finally {
      E(!1);
    }
  }, Z = async (c) => {
    B(c), S("");
    try {
      const r = await n.post("/apps/aws-finops-studio/api/reports", { type: c });
      r != null && r.items && L(r.items), r != null && r.report && N(r.report);
    } catch (r) {
      S(r.message || "Failed to generate report");
    } finally {
      B(null);
    }
  }, Y = oe(() => a ? s === "Overview" ? a.mode === "live" ? /* @__PURE__ */ e(be, { data: a, persona: u, onAsk: k, onRefresh: $, refreshing: M }) : /* @__PURE__ */ e(Ne, { data: a, persona: u, onAsk: () => k("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : s === "Optimization" || s === "Resources" ? /* @__PURE__ */ e(ye, { items: v, title: s }) : s === "History" ? /* @__PURE__ */ e(we, { runs: j, recommendations: v, onRefresh: y }) : s === "Connection" ? /* @__PURE__ */ e(
    Ae,
    {
      data: O,
      profilesData: m,
      policiesData: T,
      onSwitchProfile: q,
      onRefreshLive: $,
      refreshing: M
    }
  ) : s === "Ask FinOps" ? /* @__PURE__ */ e(Se, { onAsk: k }) : s === "Anomalies" ? a.mode === "demo" ? /* @__PURE__ */ e(Ce, { items: a.anomalies }) : /* @__PURE__ */ e(K, { title: "Live anomaly analysis", text: "Query AWS Cost Anomaly Detection and Cost Explorer. No synthetic anomalies are shown in Live mode.", action: () => k("Use live AWS data only. Analyze current cost anomalies and preserve the API evidence. Do not use demo data.") }) : s === "Cost Explorer" ? a.mode === "demo" ? /* @__PURE__ */ e(ke, { items: a.drivers }) : a.dataAvailable ? /* @__PURE__ */ e(ge, { drivers: a.drivers, previous: a.previousDrivers || [], onRefresh: $, refreshing: M }) : /* @__PURE__ */ e(de, { onRefresh: $, refreshing: M }) : s === "Commitments" ? /* @__PURE__ */ e(K, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => k("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : s === "Well-Architected" ? /* @__PURE__ */ e(K, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => k("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : s === "Reports" ? /* @__PURE__ */ e(Re, { reports: V, selectedReport: J, onSelectReport: N, onGenerate: Z, generating: U, onAskAgent: () => k("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ e(K, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => k("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(te, {}),
    /* @__PURE__ */ e(te, {}),
    /* @__PURE__ */ e(te, {})
  ] }), [s, a, v, j, V, J, U, O, m, T, l, u, M]), w = (a == null ? void 0 : a.callerIdentity) || (O == null ? void 0 : O.callerIdentity);
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
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${l ? "bg-amber-500" : w != null && w.verified ? "bg-emerald-500" : "bg-muted"}` })
          ] }),
          !l && (m != null && m.profiles) && m.profiles.length > 1 ? /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
            "select",
            {
              value: m.activeProfile,
              onChange: (c) => q(c.target.value, m.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: m.profiles.map((c) => /* @__PURE__ */ t("option", { value: c, children: [
                "Profile: ",
                c
              ] }, c))
            }
          ) }) : /* @__PURE__ */ e("div", { className: "font-medium mt-1 truncate", children: l ? "Synthetic Sandbox" : w != null && w.accountMasked ? `Account ${w.accountMasked}` : `Profile: ${(m == null ? void 0 : m.activeProfile) || "default"}` }),
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-[11px] text-muted mt-1 truncate", children: [
            /* @__PURE__ */ e("span", { children: l ? "Mock AWS Environment" : `${(m == null ? void 0 : m.activeRegion) || (w == null ? void 0 : w.region) || "us-east-1"} · Read-only` }),
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
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: ve.map(([c, r]) => /* @__PURE__ */ t("button", { onClick: () => d(c), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${s === c ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: r }),
          c
        ] }, c)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-4 pt-3 border-t border-border", children: /* @__PURE__ */ t(
        "div",
        {
          onClick: () => x(!l),
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
                    c.stopPropagation(), x(!l);
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
            className: `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${u === c.id ? "bg-surface text-foreground shadow-sm font-semibold" : "text-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ e("span", { children: c.icon }),
              /* @__PURE__ */ e("span", { children: c.label })
            ]
          },
          c.id
        )) })
      ] }),
      G && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e(pe, { message: G }) }),
      Y
    ] })
  ] });
}
function ne({ title: n, data: i, persona: s }) {
  const d = Math.abs(Number(i.credits)), l = Number(i.costBeforeCredits), x = l > 0 ? (d / l * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(p, { children: [
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
        s === "Finance" && /* @__PURE__ */ t(b, { tone: "info", children: [
          "Credit ratio: ",
          x,
          "%"
        ] }),
        /* @__PURE__ */ e(b, { children: "RECORD_TYPE" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Unblended Gross (Pre-Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: F(i.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: F(i.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: F(i.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: F(i.netCost) })
      ] })
    ] }),
    (s === "Practitioner" || s === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(i.recordTypes, null, 2) })
    ] })
  ] });
}
function de({ onRefresh: n, refreshing: i }) {
  return /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(A, { onClick: n, disabled: i, children: i ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function be({ data: n, persona: i, onAsk: s, onRefresh: d, refreshing: l }) {
  var f, a, o, v;
  const x = (f = n.live) == null ? void 0 : f.previousMonth, u = (a = n.live) == null ? void 0 : a.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(b, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: i }),
          " · ",
          (o = n.live) != null && o.profile ? `Profile: ${n.live.profile}` : ""
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
    x && /* @__PURE__ */ e(ne, { title: "Previous complete month", data: x, persona: i }),
    u && /* @__PURE__ */ e(ne, { title: "Month to date", data: u, persona: i }),
    n.dataAvailable && i === "Leadership" && /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ e(g, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: F((u == null ? void 0 : u.netCost) || "0.00") })
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
    n.dataAvailable && /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((v = n.live) == null ? void 0 : v.refreshedAt) && `Last refreshed: ${n.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(A, { onClick: d, disabled: l, children: l ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(A, { onClick: () => s("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
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
      /* @__PURE__ */ e(A, { onClick: s, disabled: d, children: d ? "Refreshing…" : "Refresh live AWS data" })
    ] }),
    /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ e(g, { children: "Month-to-Date Services & MoM Change" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "UnblendedCost · Excludes Credit & Refund record types" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((l) => {
        const x = Number(l.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: l.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            l.changePercent !== null && l.changePercent !== void 0 && /* @__PURE__ */ t(b, { tone: x > 0 ? "warning" : "success", children: [
              x > 0 ? "+" : "",
              l.changePercent,
              "% (",
              x > 0 ? "+" : "",
              F(l.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: F(l.cost) })
          ] })
        ] }, l.service);
      }) }),
      !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ e(g, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: i.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: l.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: F(l.cost) })
      ] }, l.service)) }),
      !i.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function Ne({ data: n, persona: i, onAsk: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(b, { children: [
          "Demo mode · as of ",
          n.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: i })
        ] })
      ] }),
      /* @__PURE__ */ e(A, { onClick: s, children: "✦ Explain demo dataset" })
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
      /* @__PURE__ */ t(p, { children: [
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
      /* @__PURE__ */ t(p, { children: [
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
    /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ e(g, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: n.finopsScoreReason })
    ] })
  ] });
}
function ye({ items: n, title: i }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6", children: [
    /* @__PURE__ */ e("div", { className: "grid gap-3", children: n.map((s) => /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/10 text-emerald-600 h-fit", children: "↘" }),
      /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ e(g, { children: s.what }),
          /* @__PURE__ */ e(b, { children: s.service }),
          /* @__PURE__ */ e(b, { tone: s.status === "verified" ? "success" : s.status === "approved" ? "info" : "default", children: s.status })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: s.why }),
        /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4 text-sm", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Potential saving" }),
            /* @__PURE__ */ t("b", { children: [
              W(s.estimatedSaving),
              "/mo"
            ] })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
            /* @__PURE__ */ e(b, { tone: ie(s.confidence), children: s.confidence })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
            /* @__PURE__ */ e(b, { tone: ie(s.risk), children: s.risk })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Resource" }),
            /* @__PURE__ */ e("code", { className: "text-xs", children: s.resource })
          ] })
        ] }),
        /* @__PURE__ */ t("details", { className: "mt-3 text-xs text-muted", children: [
          /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Supporting evidence & lifecycle" }),
          /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded whitespace-pre-wrap", children: JSON.stringify(s.evidence, null, 2) })
        ] })
      ] })
    ] }) }, s.id)) }),
    !n.length && /* @__PURE__ */ e(xe, { title: `No ${i.toLowerCase()} records`, description: "Connect AWS or use Demo Mode." })
  ] });
}
function we({ runs: n, recommendations: i, onRefresh: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Immutable Evidence & Audit Trail" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Durable SQLite runs, SHA-256 provenance hashes, and lifecycle state" })
      ] }),
      /* @__PURE__ */ e(A, { onClick: s, children: "Refresh audit log" })
    ] }),
    /* @__PURE__ */ t(p, { children: [
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
            /* @__PURE__ */ e(b, { tone: "success", children: "Verified" }),
            /* @__PURE__ */ e("div", { className: "text-muted mt-1", children: d.timestamp })
          ] })
        ] }, d.id)),
        !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(p, { children: [
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
          /* @__PURE__ */ e(b, { tone: d.status === "verified" ? "success" : d.status === "approved" ? "info" : "default", children: d.status })
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
  refreshing: x
}) {
  var k, $, q, Z, Y, w, c;
  const [u, f] = h((i == null ? void 0 : i.activeProfile) || "default"), [a, o] = h((i == null ? void 0 : i.activeRegion) || "us-east-1"), [v, R] = h(""), [j, z] = h("full"), [O, H] = h(!1), [G, S] = h(!1), [M, E] = h(!1), [V, L] = h(null);
  re(() => {
    i != null && i.activeProfile && f(i.activeProfile), i != null && i.activeRegion && o(i.activeRegion);
  }, [i]);
  const J = async () => {
    const r = (v.trim() || a).trim();
    E(!0), L(null);
    try {
      await d(u, r), L(`Scope applied: profile "${u}" in region "${r}"`), setTimeout(() => L(null), 4e3);
    } finally {
      E(!1);
    }
  }, N = ((k = s == null ? void 0 : s.policies) == null ? void 0 : k.find((r) => r.id === j)) || (($ = s == null ? void 0 : s.policies) == null ? void 0 : $[0]), U = () => {
    var r;
    N != null && N.policyJson && ((r = navigator.clipboard) == null || r.writeText(N.policyJson), H(!0), setTimeout(() => H(!1), 2500));
  }, B = () => {
    var _;
    const r = (v.trim() || a).trim(), P = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${u} --region ${r}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${u}`;
    (_ = navigator.clipboard) == null || _.writeText(P), S(!0), setTimeout(() => S(!1), 2500);
  }, m = (i == null ? void 0 : i.callerIdentity) || (n == null ? void 0 : n.callerIdentity), Q = (q = i == null ? void 0 : i.profiles) != null && q.length ? i.profiles : ["default"], T = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], C = (Z = n == null ? void 0 : n.checks) == null ? void 0 : Z.find((r) => r.name.includes("Cost Optimization Hub")), y = (Y = n == null ? void 0 : n.checks) == null ? void 0 : Y.find((r) => r.name.includes("Compute Optimizer"));
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(g, { children: "AWS Profile & Scope Management" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Select which local AWS profile and target region to query. Works with AWS Control Tower, IAM Identity Center (SSO), and named CLI profiles." })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: `w-2.5 h-2.5 rounded-full ${m != null && m.verified ? "bg-emerald-500" : "bg-amber-500"}` }),
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: m != null && m.verified ? "STS Verified" : "Unauthenticated" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-6 mt-4", children: [
        /* @__PURE__ */ t("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1.5", children: "AWS Profile" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
              "select",
              {
                value: u,
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
                  value: T.some((r) => r.id === a) ? a : "custom",
                  onChange: (r) => {
                    r.target.value !== "custom" && (o(r.target.value), R(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    T.map((r) => /* @__PURE__ */ e("option", { value: r.id, children: r.label }, r.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: v || (T.some((r) => r.id === a) ? "" : a),
                  onChange: (r) => R(r.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(A, { onClick: J, disabled: M, children: M ? "Applying Scope…" : "Switch & Verify Profile" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: l,
                disabled: x,
                className: "px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
                children: x ? "Refreshing…" : "↻ Test Connection & Ingest"
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
              /* @__PURE__ */ e(b, { tone: m != null && m.verified ? "success" : "default", children: m != null && m.verified ? "Active & Verified" : "Pending Verification" })
            ] }),
            /* @__PURE__ */ t("div", { className: "space-y-2 mt-3 font-mono text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Account:" }),
                /* @__PURE__ */ e("span", { className: "font-semibold text-foreground", children: (m == null ? void 0 : m.accountMasked) || "unknown" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Profile:" }),
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (i == null ? void 0 : i.activeProfile) || u })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (i == null ? void 0 : i.activeRegion) || a })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: [
                /* @__PURE__ */ e("span", { className: "text-muted block mb-1", children: "IAM ARN:" }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-foreground/90 break-all select-all", children: (m == null ? void 0 : m.arn) || "None (verify credentials)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-3 pt-3 border-t border-border/60", children: "Zero mutations: AWS FinOps Studio runs 100% read-only operations via STS and Cost APIs." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t(p, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(g, { children: "IAM Least-Privilege Policy Helper" }),
            /* @__PURE__ */ e(b, { tone: "success", children: "Read-Only Guardrails" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1", children: [
            "Exact IAM policy definitions for AWS profile ",
            /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: u }),
            ". Ready for 1-click copy-paste into the AWS IAM Console."
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: U, children: O ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (w = s == null ? void 0 : s.policies) == null ? void 0 : w.map((r) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => z(r.id),
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
              /* @__PURE__ */ e(b, { tone: N.recommended ? "success" : "default", children: N.file })
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
                onClick: B,
                className: "text-accent hover:underline text-[11px] font-medium",
                children: G ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
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
              /* @__PURE__ */ e("span", { className: y != null && y.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: y != null && y.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Compute Optimizer (100% Free Standard Tier)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (y == null ? void 0 : y.detail) || "Opt-in required for EC2 & EBS rightsizing" })
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
                children: /* @__PURE__ */ e("span", { children: O ? "✓ Copied to clipboard" : "📋 Copy JSON" })
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
              /* @__PURE__ */ e("code", { className: "text-accent font-mono", children: u }),
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
            disabled: x,
            className: "text-accent hover:underline text-xs font-medium",
            children: x ? "Probing…" : "↻ Re-run Health Probes"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (c = n == null ? void 0 : n.checks) == null ? void 0 : c.map((r) => /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ e("div", { className: `mt-0.5 text-sm ${r.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}`, children: r.ok ? "✓" : "○" }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e(g, { children: r.name }),
            /* @__PURE__ */ e(b, { tone: r.ok ? "success" : "default", children: r.ok ? "Passing" : "Action Required" })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1 leading-relaxed", children: r.detail })
        ] })
      ] }) }, r.name)) })
    ] })
  ] });
}
function Se({ onAsk: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(p, { children: [
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
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-3", children: n.map((i) => /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
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
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(p, { children: [
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
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: n }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: i }),
    /* @__PURE__ */ e(A, { onClick: s, children: "Open FinOps Agent" })
  ] }) }) });
}
function se(n) {
  return n.split(/(\*\*.*?\*\*|`.*?`)/g).map((s, d) => s.startsWith("**") && s.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: s.slice(2, -2) }, d) : s.startsWith("`") && s.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: s.slice(1, -1) }, d) : s);
}
function Pe({ content: n }) {
  const i = n.split(`
`), s = [];
  let d = [], l = !1;
  const x = (f, a) => {
    if (!f.length) return null;
    const o = f[0], v = f.slice(f.length > 1 && f[1].every((R) => R.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: o.map((R, j) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: R.trim() }, j)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: v.map((R, j) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: R.map((z, O) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: z.trim() }, O)) }, j)) })
    ] }) }, `table-${a}`);
  }, u = () => {
    l && d.length && (s.push(x(d, s.length)), d = [], l = !1);
  };
  return i.forEach((f, a) => {
    const o = f.trim();
    if (o.startsWith("|") && o.endsWith("|")) {
      l = !0;
      const v = o.split("|").slice(1, -1);
      d.push(v);
      return;
    } else
      u();
    o ? o.startsWith("# ") ? s.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: o.slice(2) }, a)) : o.startsWith("## ") ? s.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: o.slice(3) }, a)) : o.startsWith("### ") ? s.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: o.slice(4) }, a)) : o === "---" ? s.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, a)) : o.startsWith("- ") || o.startsWith("* ") ? s.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: se(o.slice(2)) })
      ] }, a)
    ) : s.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: se(o) }, a)
    ) : s.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${a}`));
  }), u(), /* @__PURE__ */ e("div", { className: "space-y-1", children: s });
}
function Re({
  reports: n,
  selectedReport: i,
  onSelectReport: s,
  onGenerate: d,
  generating: l,
  onAskAgent: x
}) {
  const [u, f] = h(!1), a = (o) => {
    var v;
    (v = navigator.clipboard) == null || v.writeText(o), f(!0), setTimeout(() => f(!1), 2e3);
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
        /* @__PURE__ */ e(b, { tone: i.type === "executive" ? "success" : "info", children: i.type })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: () => a(i.contentMarkdown), children: u ? "✓ Copied" : "Copy Report Markdown" }) })
    ] }),
    /* @__PURE__ */ t(p, { children: [
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
        /* @__PURE__ */ e(A, { onClick: () => d("executive"), disabled: !!l, children: l === "executive" ? "Generating Executive Report…" : "✦ Generate Executive Report" }),
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
            onClick: x,
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
        n.map((o) => /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[280px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(b, { tone: o.type === "executive" ? "success" : "info", children: o.type }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-foreground", children: o.title })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: o.summary }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted font-mono mt-3", children: [
              "Scope: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: o.scope }),
              " · Generated: ",
              o.createdAt
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 self-center", children: [
            /* @__PURE__ */ e(A, { onClick: () => s(o), children: "Read Report" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => a(o.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, o.id)),
        !n.length && /* @__PURE__ */ e(p, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(X, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "No Reports Generated Yet" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted max-w-sm mx-auto mt-1 mb-4", children: "Generate your first monthly executive report or optimization backlog from live AWS billing telemetry." }),
          /* @__PURE__ */ e(A, { onClick: () => d("executive"), children: "Generate Executive Report Now" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Fe as default
};
