import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { useState as x, useEffect as le, useMemo as ge } from "react";
import { useAppApi as Ne, useChatLauncher as ye } from "@kirocrew/app-sdk";
import { Skeleton as ne, PageHeader as we, ErrorNotice as Se, Card as b, Btn as A, Badge as N, CardTitle as y, StatCard as Y, EmptyState as Ce } from "@kirocrew/app-sdk/ui";
const Ae = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], ke = [["Overview", "◫"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], $ = (r) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(r)), U = (r) => {
  const s = Number(r);
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(s) < 5e-3 ? 0 : s);
}, ae = (r) => r === "high" ? "success" : r === "medium" ? "warning" : "default";
function te({ className: r = "w-6 h-6" }) {
  return /* @__PURE__ */ t("svg", { className: r, viewBox: "0 0 44 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M22 1.15L3.5 12.05L22 22.34L40.5 12.05L22 1.15Z", fill: "#00E5A3" }),
    /* @__PURE__ */ e("path", { d: "M18.8 47.66L0.5 37.36V16.71L18.8 27.01V47.66Z", fill: "#00C693" }),
    /* @__PURE__ */ e("path", { d: "M25.2 47.66L43.5 37.36V16.71L25.2 27.01V47.66Z", fill: "#00966F" })
  ] });
}
function Ve() {
  const r = Ne(), { openChat: s } = ye(), [n, i] = x("Overview"), [l, u] = x(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [o, v] = x("Practitioner"), [a, h] = x(null), [f, S] = x([]), [P, j] = x([]), [k, L] = x(null), [I, C] = x(""), [O, M] = x(!1), [V, F] = x([]), [B, g] = x(null), [H, w] = x(null), [m, D] = x(null), [G, W] = x(null), [R, J] = x(null), [Z, _] = x(!1), [K, X] = x(null), Q = () => {
    h(null), C("");
    const c = "/apps/aws-finops-studio/api", p = l ? "demo" : "live";
    Promise.all([
      r.get(`${c}/overview?mode=${p}`),
      r.get(`${c}/recommendations?mode=${p}`),
      r.get(`${c}/evidence`),
      r.get(`${c}/reports`),
      r.get(`${c}/diagnostics`),
      r.get(`${c}/profiles`),
      r.get(`${c}/policies`),
      r.get(`${c}/schedules`)
    ]).then(([E, pe, re, se, xe, fe, be, ve]) => {
      h(E), S(pe.items), j((re == null ? void 0 : re.runs) || []), F((se == null ? void 0 : se.items) || []), L(xe), D(fe), W(be), J(ve);
    }).catch((E) => C(E.message || "Unable to load FinOps data"));
  }, ee = async (c) => {
    try {
      const p = await r.post("/apps/aws-finops-studio/api/schedules", c);
      p != null && p.schedule && J(p.schedule);
    } catch (p) {
      C(p.message || "Failed to update schedule");
    }
  }, d = async () => {
    _(!0), X(null), C("");
    try {
      const c = await r.post("/apps/aws-finops-studio/api/schedules", { action: "trigger" });
      X(c), c != null && c.schedule && J(c.schedule);
      const p = await r.get("/apps/aws-finops-studio/api/reports");
      p != null && p.items && F(p.items);
    } catch (c) {
      C(c.message || "Failed to run anomaly sweep");
    } finally {
      _(!1);
    }
  };
  le(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(l));
    } catch {
    }
    Q();
  }, [l]);
  const T = (c) => s({ agent: "finops-agent", message: c, autoSend: !0 }), q = async () => {
    M(!0), C("");
    try {
      const c = await r.post("/apps/aws-finops-studio/api/refresh-live", {});
      h(c);
      const p = await r.get("/apps/aws-finops-studio/api/evidence");
      j((p == null ? void 0 : p.runs) || []);
      const E = await r.get("/apps/aws-finops-studio/api/diagnostics");
      L(E);
    } catch (c) {
      C(c.message || "Unable to load live AWS data");
    } finally {
      M(!1);
    }
  }, de = async (c, p) => {
    C(""), M(!0);
    try {
      const E = await r.post("/apps/aws-finops-studio/api/profiles", { profile: c, region: p });
      D(E), Q();
    } catch (E) {
      C(E.message || "Failed to switch AWS profile");
    } finally {
      M(!1);
    }
  }, ue = async (c) => {
    w(c), C("");
    try {
      const p = await r.post("/apps/aws-finops-studio/api/reports", { type: c, mode: l ? "demo" : "live" });
      p != null && p.items && F(p.items), p != null && p.report && g(p.report);
    } catch (p) {
      C(p.message || "Failed to generate report");
    } finally {
      w(null);
    }
  }, he = ge(() => a ? n === "Overview" ? a.mode === "live" ? /* @__PURE__ */ e(Pe, { data: a, persona: o, onAsk: T, onRefresh: q, refreshing: O }) : /* @__PURE__ */ e(Re, { data: a, persona: o, onAsk: () => T("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : n === "Optimization" || n === "Resources" ? /* @__PURE__ */ e(
    We,
    {
      items: f,
      title: n,
      demo: l,
      onSwitchToDemo: () => u(!0),
      onRefresh: q,
      refreshing: O
    }
  ) : n === "History" ? /* @__PURE__ */ e(je, { runs: P, recommendations: f, onRefresh: Q }) : n === "Connection" ? /* @__PURE__ */ e(
    Me,
    {
      data: k,
      profilesData: m,
      policiesData: G,
      onSwitchProfile: de,
      onRefreshLive: q,
      refreshing: O
    }
  ) : n === "Ask FinOps" ? /* @__PURE__ */ e(Fe, { onAsk: T }) : n === "Anomalies" ? /* @__PURE__ */ e(
    ze,
    {
      scheduleConfig: R,
      onUpdateSchedule: ee,
      onTriggerSweep: d,
      runningSweep: Z,
      sweepResult: K,
      demo: l,
      anomalies: a.anomalies,
      onAsk: T
    }
  ) : n === "Cost Explorer" ? a.mode === "demo" ? /* @__PURE__ */ e($e, { items: a.drivers }) : a.dataAvailable ? /* @__PURE__ */ e(Oe, { drivers: a.drivers, previous: a.previousDrivers || [], onRefresh: q, refreshing: O }) : /* @__PURE__ */ e(me, { onRefresh: q, refreshing: O }) : n === "Commitments" ? /* @__PURE__ */ e(ie, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => T("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : n === "Well-Architected" ? /* @__PURE__ */ e(ie, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => T("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : n === "Reports" ? /* @__PURE__ */ e(
    Le,
    {
      reports: V,
      selectedReport: B,
      onSelectReport: g,
      onGenerate: ue,
      generating: H,
      onAskAgent: () => T("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly."),
      onOpenSchedules: () => i("Anomalies")
    }
  ) : /* @__PURE__ */ e(ie, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => T("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(ne, {}),
    /* @__PURE__ */ e(ne, {}),
    /* @__PURE__ */ e(ne, {})
  ] }), [n, a, f, P, V, B, H, k, m, G, l, o, O, R, Z, K]), z = (a == null ? void 0 : a.callerIdentity) || (k == null ? void 0 : k.callerIdentity);
  return /* @__PURE__ */ t("div", { className: "h-full min-h-0 flex bg-surface text-foreground", children: [
    /* @__PURE__ */ t("aside", { className: "w-64 shrink-0 border-r border-border bg-surface-muted/40 p-3 overflow-y-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "p-3 mb-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 font-semibold", children: [
            /* @__PURE__ */ e("div", { className: "p-1.5 rounded-xl bg-surface border border-border shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(te, { className: "w-5 h-5" }) }),
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
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${l ? "bg-amber-500" : z != null && z.verified ? "bg-emerald-500" : "bg-muted"}` })
          ] }),
          !l && (m != null && m.profiles) && m.profiles.length > 1 ? /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
            "select",
            {
              value: m.activeProfile,
              onChange: (c) => de(c.target.value, m.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: m.profiles.map((c) => /* @__PURE__ */ t("option", { value: c, children: [
                "Profile: ",
                c
              ] }, c))
            }
          ) }) : /* @__PURE__ */ e("div", { className: "font-medium mt-1 truncate", children: l ? "Synthetic Sandbox" : z != null && z.accountMasked ? `Account ${z.accountMasked}` : `Profile: ${(m == null ? void 0 : m.activeProfile) || "default"}` }),
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-[11px] text-muted mt-1 truncate", children: [
            /* @__PURE__ */ e("span", { children: l ? "Mock AWS Environment" : `${(m == null ? void 0 : m.activeRegion) || (z == null ? void 0 : z.region) || "us-east-1"} · Read-only` }),
            !l && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => i("Connection"),
                className: "text-accent hover:underline text-[10px] font-medium",
                children: "IAM Helper →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: ke.map(([c, p]) => /* @__PURE__ */ t("button", { onClick: () => i(c), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${n === c ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: p }),
          c
        ] }, c)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-4 pt-3 border-t border-border", children: /* @__PURE__ */ t(
        "div",
        {
          onClick: () => u(!l),
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
                    c.stopPropagation(), u(!l);
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
        /* @__PURE__ */ e(we, { title: n, subtitle: "Deterministic, read-only AWS financial operations workspace" }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border", children: Ae.map((c) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => v(c.id),
            title: c.desc,
            className: `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${o === c.id ? "bg-surface text-foreground shadow-sm font-semibold" : "text-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ e("span", { children: c.icon }),
              /* @__PURE__ */ e("span", { children: c.label })
            ]
          },
          c.id
        )) })
      ] }),
      I && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e(Se, { message: I }) }),
      he
    ] })
  ] });
}
function ce({ title: r, data: s, persona: n }) {
  const i = Math.abs(Number(s.credits)), l = Number(s.costBeforeCredits), u = l > 0 ? (i / l * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(y, { children: r }),
        /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1 font-mono", children: [
          s.start,
          " → ",
          s.end,
          " · End exclusive",
          s.estimated ? " · estimated" : ""
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        n === "Finance" && /* @__PURE__ */ t(N, { tone: "info", children: [
          "Credit ratio: ",
          u,
          "%"
        ] }),
        /* @__PURE__ */ e(N, { children: "RECORD_TYPE" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Unblended Gross (Pre-Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: U(s.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: U(s.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: U(s.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: U(s.netCost) })
      ] })
    ] }),
    (n === "Practitioner" || n === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(s.recordTypes, null, 2) })
    ] })
  ] });
}
function me({ onRefresh: r, refreshing: s }) {
  return /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(te, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(A, { onClick: r, disabled: s, children: s ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function Pe({ data: r, persona: s, onAsk: n, onRefresh: i, refreshing: l }) {
  var v, a, h, f;
  const u = (v = r.live) == null ? void 0 : v.previousMonth, o = (a = r.live) == null ? void 0 : a.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(N, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: s }),
          " · ",
          (h = r.live) != null && h.profile ? `Profile: ${r.live.profile}` : ""
        ] })
      ] }),
      r.payloadHash && /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-muted flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { children: "SHA-256 Provenance:" }),
        /* @__PURE__ */ t("code", { className: "px-1.5 py-0.5 rounded bg-surface border border-border text-foreground font-semibold", children: [
          r.payloadHash.slice(0, 16),
          "…"
        ] })
      ] })
    ] }),
    !r.dataAvailable && /* @__PURE__ */ e(me, { onRefresh: i, refreshing: l }),
    u && /* @__PURE__ */ e(ce, { title: "Previous complete month", data: u, persona: s }),
    o && /* @__PURE__ */ e(ce, { title: "Month to date", data: o, persona: s }),
    r.dataAvailable && s === "Leadership" && /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: U((o == null ? void 0 : o.netCost) || "0.00") })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Active Optimization Pipeline" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-accent", children: r.optimizationOpportunity ? $(r.optimizationOpportunity) : "$0" })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Verified Realized Savings" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-emerald-600", children: "$0.00 (awaiting post-cycle verification)" })
        ] })
      ] })
    ] }),
    r.dataAvailable && /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((f = r.live) == null ? void 0 : f.refreshedAt) && `Last refreshed: ${r.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(A, { onClick: i, disabled: l, children: l ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(A, { onClick: () => n("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
      ] })
    ] }) })
  ] });
}
function Oe({ drivers: r, previous: s, onRefresh: n, refreshing: i }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Service Cost Drivers" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Pre-credit unblended cost with Month-over-Month delta tracking" })
      ] }),
      /* @__PURE__ */ e(A, { onClick: n, disabled: i, children: i ? "Refreshing…" : "Refresh live AWS data" })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Month-to-Date Services & MoM Change" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "UnblendedCost · Excludes Credit & Refund record types" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: r.map((l) => {
        const u = Number(l.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: l.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            l.changePercent !== null && l.changePercent !== void 0 && /* @__PURE__ */ t(N, { tone: u > 0 ? "warning" : "success", children: [
              u > 0 ? "+" : "",
              l.changePercent,
              "% (",
              u > 0 ? "+" : "",
              U(l.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: U(l.cost) })
          ] })
        ] }, l.service);
      }) }),
      !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: s.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: l.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: U(l.cost) })
      ] }, l.service)) }),
      !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function Re({ data: r, persona: s, onAsk: n }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(N, { children: [
          "Demo mode · as of ",
          r.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: s })
        ] })
      ] }),
      /* @__PURE__ */ e(A, { onClick: n, children: "✦ Explain demo dataset" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]", children: [
      /* @__PURE__ */ e(Y, { label: "Month to date", value: $(r.mtdSpend), accent: !0 }),
      /* @__PURE__ */ e(Y, { label: "Forecast", value: $(r.forecast) }),
      /* @__PURE__ */ e(Y, { label: "Previous equivalent", value: $(r.previousEquivalent) }),
      /* @__PURE__ */ e(Y, { label: "Cost change", value: `${r.costChangePercent > 0 ? "+" : ""}${r.costChangePercent}%` }),
      /* @__PURE__ */ e(Y, { label: "Optimization opportunity", value: $(r.optimizationOpportunity) }),
      /* @__PURE__ */ e(Y, { label: "FinOps score", value: "Insufficient data" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t(b, { children: [
        /* @__PURE__ */ e(y, { children: "Major cost drivers" }),
        /* @__PURE__ */ e("div", { className: "mt-4 space-y-3", children: r.drivers.map((i) => /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ e("span", { children: i.service }),
            /* @__PURE__ */ t("span", { className: "font-medium", children: [
              $(i.cost),
              " ",
              /* @__PURE__ */ t("span", { className: (i.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
                (i.changePercent || 0) > 0 ? "+" : "",
                i.changePercent,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "h-2 mt-2 bg-surface-muted rounded-full overflow-hidden", children: /* @__PURE__ */ e("div", { className: "h-full bg-accent rounded-full", style: { width: `${Math.min(100, Number(i.cost) / 70)}%` } }) })
        ] }, i.service)) })
      ] }),
      /* @__PURE__ */ t(b, { children: [
        /* @__PURE__ */ e(y, { children: "Recent anomalies" }),
        /* @__PURE__ */ e("div", { className: "mt-3 divide-y divide-border", children: r.anomalies.map((i) => /* @__PURE__ */ t("div", { className: "py-3 flex gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-amber-500", "aria-hidden": !0, children: "△" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium", children: [
              i.service,
              " · ",
              $(i.impact)
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
              i.summary,
              " · ",
              i.date
            ] })
          ] })
        ] }, i.date + i.service)) })
      ] })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: r.finopsScoreReason })
    ] })
  ] });
}
function We({
  items: r,
  title: s,
  demo: n,
  onSwitchToDemo: i,
  onRefresh: l,
  refreshing: u
}) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-4", children: r.length > 0 ? /* @__PURE__ */ e("div", { className: "grid gap-3", children: r.map((o) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/10 text-emerald-600 h-fit", children: "↘" }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ e(y, { children: o.what }),
        /* @__PURE__ */ e(N, { children: o.service }),
        /* @__PURE__ */ e(N, { tone: o.status === "verified" ? "success" : o.status === "approved" ? "info" : "default", children: o.status })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: o.why }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Potential saving" }),
          /* @__PURE__ */ t("b", { children: [
            $(o.estimatedSaving),
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
          /* @__PURE__ */ e(N, { tone: ae(o.confidence), children: o.confidence })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
          /* @__PURE__ */ e(N, { tone: ae(o.risk), children: o.risk })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Resource" }),
          /* @__PURE__ */ e("code", { className: "text-xs", children: o.resource })
        ] })
      ] }),
      /* @__PURE__ */ t("details", { className: "mt-3 text-xs text-muted", children: [
        /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Supporting evidence & lifecycle" }),
        /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded whitespace-pre-wrap", children: JSON.stringify(o.evidence, null, 2) })
      ] })
    ] })
  ] }) }, o.id)) }) : n ? /* @__PURE__ */ e(Ce, { title: `No ${s.toLowerCase()} records`, description: "Demo mode contains sample records." }) : /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "text-center py-8 max-w-lg mx-auto", children: [
    /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold", children: "✓" }),
    /* @__PURE__ */ t("h3", { className: "text-base font-semibold text-foreground", children: [
      "0 Active ",
      s,
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
      /* @__PURE__ */ e(A, { onClick: i, children: "✦ Switch to Demo Mode to Explore Workflow" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: l,
          disabled: u,
          className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
          children: u ? "Scanning AWS…" : "↻ Re-scan AWS Telemetry"
        }
      )
    ] })
  ] }) }) });
}
function je({ runs: r, recommendations: s, onRefresh: n }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Immutable Evidence & Audit Trail" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Durable SQLite runs, SHA-256 provenance hashes, and lifecycle state" })
      ] }),
      /* @__PURE__ */ e(A, { onClick: n, children: "Refresh audit log" })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t(y, { children: [
        "Historical Query Runs (",
        r.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Every refresh persists an immutable query record with request parameters and hash" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border", children: [
        r.map((i) => /* @__PURE__ */ t("div", { className: "py-3 flex flex-wrap items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "font-medium text-sm font-mono text-foreground", children: i.id }),
            /* @__PURE__ */ t("div", { className: "text-muted mt-0.5", children: [
              "Account: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: i.accountMasked }),
              " · Profile: ",
              i.profile,
              " · Region: ",
              i.region
            ] }),
            /* @__PURE__ */ t("div", { className: "text-muted font-mono mt-1 text-[11px]", children: [
              "Hash: ",
              i.payloadHash
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e(N, { tone: "success", children: "Verified" }),
            /* @__PURE__ */ e("div", { className: "text-muted mt-1", children: i.timestamp })
          ] })
        ] }, i.id)),
        !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t(y, { children: [
        "Recommendation Decision Lifecycle (",
        s.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Identified → Reviewed → Approved → Implemented → Verified" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border text-xs", children: [
        s.map((i) => /* @__PURE__ */ t("div", { className: "py-2.5 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: i.what }),
            /* @__PURE__ */ t("span", { className: "text-muted ml-2", children: [
              "(",
              i.service,
              " · ",
              i.resource,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ e(N, { tone: i.status === "verified" ? "success" : i.status === "approved" ? "info" : "default", children: i.status })
        ] }, i.id)),
        !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-2", children: "No recommendations currently stored." })
      ] })
    ] })
  ] });
}
function Me({
  data: r,
  profilesData: s,
  policiesData: n,
  onSwitchProfile: i,
  onRefreshLive: l,
  refreshing: u
}) {
  var J, Z, _, K, X, Q, ee;
  const [o, v] = x((s == null ? void 0 : s.activeProfile) || "default"), [a, h] = x((s == null ? void 0 : s.activeRegion) || "us-east-1"), [f, S] = x(""), [P, j] = x("full"), [k, L] = x(!1), [I, C] = x(!1), [O, M] = x(!1), [V, F] = x(null);
  le(() => {
    s != null && s.activeProfile && v(s.activeProfile), s != null && s.activeRegion && h(s.activeRegion);
  }, [s]);
  const B = async () => {
    const d = (f.trim() || a).trim();
    M(!0), F(null);
    try {
      await i(o, d), F(`Scope applied: profile "${o}" in region "${d}"`), setTimeout(() => F(null), 4e3);
    } finally {
      M(!1);
    }
  }, g = ((J = n == null ? void 0 : n.policies) == null ? void 0 : J.find((d) => d.id === P)) || ((Z = n == null ? void 0 : n.policies) == null ? void 0 : Z[0]), H = () => {
    var d;
    g != null && g.policyJson && ((d = navigator.clipboard) == null || d.writeText(g.policyJson), L(!0), setTimeout(() => L(!1), 2500));
  }, w = () => {
    var q;
    const d = (f.trim() || a).trim(), T = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${o} --region ${d}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${o}`;
    (q = navigator.clipboard) == null || q.writeText(T), C(!0), setTimeout(() => C(!1), 2500);
  }, m = (s == null ? void 0 : s.callerIdentity) || (r == null ? void 0 : r.callerIdentity), D = (_ = s == null ? void 0 : s.profiles) != null && _.length ? s.profiles : ["default"], G = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], W = (K = r == null ? void 0 : r.checks) == null ? void 0 : K.find((d) => d.name.includes("Cost Optimization Hub")), R = (X = r == null ? void 0 : r.checks) == null ? void 0 : X.find((d) => d.name.includes("Compute Optimizer"));
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(y, { children: "AWS Profile & Scope Management" }),
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
                value: o,
                onChange: (d) => v(d.target.value),
                className: "flex-1 bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                children: D.map((d) => /* @__PURE__ */ t("option", { value: d, children: [
                  d,
                  " ",
                  d === (s == null ? void 0 : s.activeProfile) ? "(active)" : ""
                ] }, d))
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
                  value: G.some((d) => d.id === a) ? a : "custom",
                  onChange: (d) => {
                    d.target.value !== "custom" && (h(d.target.value), S(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    G.map((d) => /* @__PURE__ */ e("option", { value: d.id, children: d.label }, d.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: f || (G.some((d) => d.id === a) ? "" : a),
                  onChange: (d) => S(d.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(A, { onClick: B, disabled: O, children: O ? "Applying Scope…" : "Switch & Verify Profile" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: l,
                disabled: u,
                className: "px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
                children: u ? "Refreshing…" : "↻ Test Connection & Ingest"
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
              /* @__PURE__ */ e(N, { tone: m != null && m.verified ? "success" : "default", children: m != null && m.verified ? "Active & Verified" : "Pending Verification" })
            ] }),
            /* @__PURE__ */ t("div", { className: "space-y-2 mt-3 font-mono text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Account:" }),
                /* @__PURE__ */ e("span", { className: "font-semibold text-foreground", children: (m == null ? void 0 : m.accountMasked) || "unknown" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Profile:" }),
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (s == null ? void 0 : s.activeProfile) || o })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (s == null ? void 0 : s.activeRegion) || a })
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
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(y, { children: "IAM Least-Privilege Policy Helper" }),
            /* @__PURE__ */ e(N, { tone: "success", children: "Read-Only Guardrails" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1", children: [
            "Exact IAM policy definitions for AWS profile ",
            /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: o }),
            ". Ready for 1-click copy-paste into the AWS IAM Console."
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: H, children: k ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (Q = n == null ? void 0 : n.policies) == null ? void 0 : Q.map((d) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => j(d.id),
          className: `p-3 rounded-xl border text-left transition-all ${P === d.id ? "border-accent bg-accent/10 shadow-sm" : "border-border bg-surface hover:border-border/80"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted", children: d.tier }),
              d.recommended && /* @__PURE__ */ e("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400", children: "Recommended" })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-foreground truncate", children: d.title }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted mt-1", children: [
              d.actionCount,
              " IAM Actions"
            ] })
          ]
        },
        d.id
      )) }),
      g && /* @__PURE__ */ t("div", { className: "mt-4 p-4 rounded-xl bg-surface-muted/30 border border-border space-y-4", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { children: g.title }),
              /* @__PURE__ */ e(N, { tone: g.recommended ? "success" : "default", children: g.file })
            ] }),
            /* @__PURE__ */ t("span", { className: "text-xs text-muted font-mono", children: [
              g.actionCount,
              " read-only permissions"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1.5 leading-relaxed", children: g.summary })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] uppercase font-bold text-muted mb-2", children: "Capabilities Unlocked:" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: g.services.map((d) => /* @__PURE__ */ t("span", { className: "px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono text-foreground/80", children: [
            "✓ ",
            d
          ] }, d)) })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3 rounded-lg bg-surface border border-border text-xs space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: /* @__PURE__ */ e("span", { children: "⚙️ Service Enrollment & Free Tier Status" }) }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: w,
                className: "text-accent hover:underline text-[11px] font-medium",
                children: I ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-2 text-[11px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: W != null && W.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: W != null && W.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Cost Optimization Hub (100% Free)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (W == null ? void 0 : W.detail) || "Opt-in required for automated rightsizing" })
              ] })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: R != null && R.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: R != null && R.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Compute Optimizer (100% Free Standard Tier)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (R == null ? void 0 : R.detail) || "Opt-in required for EC2 & EBS rightsizing" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted", children: [
              "JSON Policy Definition (",
              g.file,
              ")"
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: H,
                className: "text-accent hover:underline text-xs font-medium flex items-center gap-1",
                children: /* @__PURE__ */ e("span", { children: k ? "✓ Copied to clipboard" : "📋 Copy JSON" })
              }
            )
          ] }),
          /* @__PURE__ */ e("pre", { className: "p-3.5 rounded-xl bg-surface-muted/80 border border-border text-[11px] font-mono text-foreground overflow-x-auto max-h-64 leading-relaxed select-all", children: g.policyJson })
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
              /* @__PURE__ */ e("code", { className: "text-accent font-mono", children: o }),
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
            disabled: u,
            className: "text-accent hover:underline text-xs font-medium",
            children: u ? "Probing…" : "↻ Re-run Health Probes"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (ee = r == null ? void 0 : r.checks) == null ? void 0 : ee.map((d) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ e("div", { className: `mt-0.5 text-sm ${d.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}`, children: d.ok ? "✓" : "○" }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e(y, { children: d.name }),
            /* @__PURE__ */ e(N, { tone: d.ok ? "success" : "default", children: d.ok ? "Passing" : "Action Required" })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1 leading-relaxed", children: d.detail })
        ] })
      ] }) }, d.name)) })
    ] })
  ] });
}
function Fe({ onAsk: r }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ e(y, { children: "Ask an evidence-backed question" }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: "The FinOps Agent uses live, read-only AWS tools and deterministic arithmetic." }),
    /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-2 mt-4", children: [
      "Why did my AWS bill increase this month?",
      "What are my top 10 cost drivers?",
      "Are credits or refunds making my net cost look like zero?",
      "Where am I wasting money?",
      "Compare this month against last month.",
      "Find my highest-confidence optimization opportunities."
    ].map((n) => /* @__PURE__ */ e("button", { className: "text-left p-3 rounded-lg border border-border hover:border-accent text-sm transition-colors", onClick: () => r(n), children: n }, n)) })
  ] }) });
}
function Te({
  config: r,
  onUpdate: s,
  onTriggerSweep: n,
  runningSweep: i,
  sweepResult: l
}) {
  var g, H;
  const [u, o] = x((r == null ? void 0 : r.enabled) || !1), [v, a] = x((r == null ? void 0 : r.frequency) || "daily"), [h, f] = x((r == null ? void 0 : r.thresholdDollars) || "10.00"), [S, P] = x((r == null ? void 0 : r.thresholdPercent) || "15.0"), [j, k] = x(!1), [L, I] = x(null), [C, O] = x(!1);
  le(() => {
    r && (o(r.enabled), a(r.frequency), f(r.thresholdDollars), P(r.thresholdPercent));
  }, [r]);
  const M = async (w) => {
    k(!0), I(null);
    try {
      const m = w !== void 0 ? w : u;
      await s({
        enabled: m,
        frequency: v,
        thresholdDollars: h,
        thresholdPercent: S
      }), I(m ? "Schedule active & configured" : "Schedule paused"), setTimeout(() => I(null), 3e3);
    } finally {
      k(!1);
    }
  }, V = () => {
    const w = !u;
    o(w), M(w);
  }, F = v === "daily" ? ((g = r == null ? void 0 : r.cliCommands) == null ? void 0 : g.daily) || 'kirocrew cron add aws-finops-daily "0 8 * * *" --agent finops-agent --message "Run daily AWS cost and anomaly pulse."' : ((H = r == null ? void 0 : r.cliCommands) == null ? void 0 : H.weekly) || 'kirocrew cron add aws-finops-weekly "0 9 * * 1" --agent finops-agent --message "Run weekly executive FinOps digest."', B = () => {
    var w;
    (w = navigator.clipboard) == null || w.writeText(F), O(!0), setTimeout(() => O(!1), 2500);
  };
  return /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(y, { children: "Automated Health & Anomaly Schedules" }),
          /* @__PURE__ */ e(N, { tone: u ? "success" : "default", children: u ? "Active · Scheduled" : "Paused / Off" })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Configure automated recurring sweeps to monitor cost trajectory, detect spikes, and generate audit-ready pulses." })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: V,
          disabled: j,
          className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${u ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/40 hover:bg-emerald-500/25" : "bg-surface-muted text-muted border border-border hover:bg-surface-muted/80"}`,
          children: u ? "● Schedule: ON" : "○ Schedule: OFF"
        }
      ) })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-6 mt-4", children: [
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1.5", children: "Sweep Frequency & Cadence" }),
          /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => a("daily"),
                className: `p-3 rounded-xl border text-left transition-all ${v === "daily" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
                children: [
                  /* @__PURE__ */ e("div", { className: "text-xs font-bold text-foreground", children: "Daily Pulse" }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-0.5 font-mono", children: "08:00 UTC (0 8 * * *)" }),
                  /* @__PURE__ */ e("div", { className: "text-[10px] text-muted mt-1", children: "Spike alert & MoM delta" })
                ]
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => a("weekly"),
                className: `p-3 rounded-xl border text-left transition-all ${v === "weekly" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
                children: [
                  /* @__PURE__ */ e("div", { className: "text-xs font-bold text-foreground", children: "Weekly Digest" }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-0.5 font-mono", children: "Mon 09:00 UTC (0 9 * * 1)" }),
                  /* @__PURE__ */ e("div", { className: "text-[10px] text-muted mt-1", children: "Full executive backlog" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1", children: "Dollar Spike Threshold ($)" }),
            /* @__PURE__ */ t("div", { className: "relative", children: [
              /* @__PURE__ */ e("span", { className: "absolute left-2.5 top-2 text-xs text-muted", children: "$" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  value: h,
                  onChange: (w) => f(w.target.value),
                  placeholder: "10.00",
                  className: "w-full bg-surface-muted/60 border border-border rounded-lg pl-6 pr-3 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[10px] text-muted mt-1", children: "Alert if service grows by > amount" })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1", children: "Variance Growth Threshold (%)" }),
            /* @__PURE__ */ t("div", { className: "relative", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  value: S,
                  onChange: (w) => P(w.target.value),
                  placeholder: "15.0",
                  className: "w-full bg-surface-muted/60 border border-border rounded-lg px-3 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              ),
              /* @__PURE__ */ e("span", { className: "absolute right-2.5 top-2 text-xs text-muted", children: "%" })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[10px] text-muted mt-1", children: "Alert if growth > % (min $1.00)" })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
          /* @__PURE__ */ e(A, { onClick: () => M(), disabled: j, children: j ? "Saving…" : "Save Schedule Settings" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: n,
              disabled: i,
              className: "px-3 py-2 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors flex items-center gap-1.5",
              children: /* @__PURE__ */ e("span", { children: i ? "Scanning Telemetry…" : "⚡ Test Sweep Now" })
            }
          )
        ] }),
        L && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "✓" }),
          /* @__PURE__ */ e("span", { children: L })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/40 border border-border", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs font-semibold mb-2", children: [
            /* @__PURE__ */ e("span", { children: "Latest Sweep Status" }),
            r != null && r.lastStatus ? /* @__PURE__ */ e(N, { tone: r.lastStatus === "clean" ? "success" : "alert", children: r.lastStatus === "clean" ? "Normal Baseline" : "Threshold Exceeded" }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-muted", children: "No runs yet" })
          ] }),
          r != null && r.lastRun ? /* @__PURE__ */ t("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ t("div", { className: "text-muted text-[11px] font-mono", children: [
              "Last Run: ",
              r.lastRun
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-foreground mt-1 leading-relaxed", children: r.lastSummary })
          ] }) : /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "Run an immediate test sweep or enable recurring schedules to record telemetry checkpoints in SQLite." }),
          l && /* @__PURE__ */ t("div", { className: "mt-3 pt-3 border-t border-border/80 text-xs space-y-1", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold flex items-center gap-1.5 text-foreground", children: [
              /* @__PURE__ */ e("span", { children: l.isAlert ? "⚠️" : "✓" }),
              /* @__PURE__ */ t("span", { children: [
                "Test Sweep Result: ",
                l.isAlert ? "Threshold Flagged" : "Clean Baseline"
              ] })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-muted text-[11px] leading-relaxed", children: l.summary })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/60 border border-border space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "CLI Command Helper" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: B,
                className: "text-accent hover:underline text-xs font-medium",
                children: C ? "✓ Copied" : "📋 Copy Command"
              }
            )
          ] }),
          /* @__PURE__ */ e("p", { className: "text-[11px] text-muted leading-relaxed", children: "Prefer managing background jobs via CLI? Copy and run this command in your terminal:" }),
          /* @__PURE__ */ e("pre", { className: "p-2.5 rounded-lg bg-surface border border-border text-[11px] font-mono text-foreground overflow-x-auto whitespace-pre-wrap select-all", children: F })
        ] })
      ] })
    ] })
  ] });
}
function ze({
  scheduleConfig: r,
  onUpdateSchedule: s,
  onTriggerSweep: n,
  runningSweep: i,
  sweepResult: l,
  demo: u,
  anomalies: o,
  onAsk: v
}) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ e(
      Te,
      {
        config: r,
        onUpdate: s,
        onTriggerSweep: n,
        runningSweep: i,
        sweepResult: l
      }
    ),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground", children: u ? "Synthetic Anomalies (Demo Mode)" : "AWS Cost Anomaly Detection Status" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: u ? "Sample anomaly scenarios demonstrating impact and root-cause attribution." : "Monitored continuously against AWS Cost Anomaly Detection service and Cost Explorer." })
        ] }),
        !u && /* @__PURE__ */ e(
          "button",
          {
            onClick: () => v("Analyze current cost anomalies and verify if any service exceeded variance thresholds."),
            className: "px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors",
            children: "💬 Deep Anomaly Analysis in Agent"
          }
        )
      ] }),
      u ? /* @__PURE__ */ e("div", { className: "space-y-3", children: o.map((a) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(y, { children: a.service }),
          /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: a.summary })
        ] }),
        /* @__PURE__ */ t("div", { className: "text-right", children: [
          /* @__PURE__ */ e("b", { children: $(a.impact) }),
          /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
            "estimated impact · ",
            a.date
          ] })
        ] })
      ] }) }, a.date + a.service)) }) : /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "py-6 text-center max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold", children: "✓" }),
        /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "0 Active AWS Cost Anomalies" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "AWS Cost Anomaly Detection has reported no severe unexpected spikes for this account scope. Recurring background sweeps will monitor telemetry as workloads run." })
      ] }) })
    ] })
  ] });
}
function $e({ items: r }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ e(y, { children: "Demo service breakdown" }),
    /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: r.map((s) => /* @__PURE__ */ t("div", { className: "py-3 grid grid-cols-3", children: [
      /* @__PURE__ */ e("b", { children: s.service }),
      /* @__PURE__ */ e("span", { children: $(s.cost) }),
      /* @__PURE__ */ t("span", { className: (s.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
        (s.changePercent || 0) > 0 ? "+" : "",
        s.changePercent,
        "%"
      ] })
    ] }, s.service)) }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-4", children: "Synthetic values shown only because Demo mode is enabled." })
  ] }) });
}
function ie({ title: r, text: s, action: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(te, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: r }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: s }),
    /* @__PURE__ */ e(A, { onClick: n, children: "Open FinOps Agent" })
  ] }) }) });
}
function oe(r) {
  return r.split(/(\*\*.*?\*\*|`.*?`)/g).map((n, i) => n.startsWith("**") && n.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: n.slice(2, -2) }, i) : n.startsWith("`") && n.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: n.slice(1, -1) }, i) : n);
}
function Ee({ content: r }) {
  const s = r.split(`
`), n = [];
  let i = [], l = !1;
  const u = (v, a) => {
    if (!v.length) return null;
    const h = v[0], f = v.slice(v.length > 1 && v[1].every((S) => S.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: h.map((S, P) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: S.trim() }, P)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: f.map((S, P) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: S.map((j, k) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: j.trim() }, k)) }, P)) })
    ] }) }, `table-${a}`);
  }, o = () => {
    l && i.length && (n.push(u(i, n.length)), i = [], l = !1);
  };
  return s.forEach((v, a) => {
    const h = v.trim();
    if (h.startsWith("|") && h.endsWith("|")) {
      l = !0;
      const f = h.split("|").slice(1, -1);
      i.push(f);
      return;
    } else
      o();
    h ? h.startsWith("# ") ? n.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: h.slice(2) }, a)) : h.startsWith("## ") ? n.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: h.slice(3) }, a)) : h.startsWith("### ") ? n.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: h.slice(4) }, a)) : h === "---" ? n.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, a)) : h.startsWith("- ") || h.startsWith("* ") ? n.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: oe(h.slice(2)) })
      ] }, a)
    ) : n.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: oe(h) }, a)
    ) : n.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${a}`));
  }), o(), /* @__PURE__ */ e("div", { className: "space-y-1", children: n });
}
function Le({
  reports: r,
  selectedReport: s,
  onSelectReport: n,
  onGenerate: i,
  generating: l,
  onAskAgent: u,
  onOpenSchedules: o
}) {
  const [v, a] = x(!1), h = (f) => {
    var S;
    (S = navigator.clipboard) == null || S.writeText(f), a(!0), setTimeout(() => a(!1), 2e3);
  };
  return s ? /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n(null),
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "← Back to Report Archive"
          }
        ),
        /* @__PURE__ */ e(N, { tone: s.type === "executive" ? "success" : "info", children: s.type })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: () => h(s.contentMarkdown), children: v ? "✓ Copied" : "Copy Report Markdown" }) })
    ] }),
    s.type === "backlog" && (s.contentMarkdown.includes("Identified Opportunities: 0") || s.contentMarkdown.includes("0 active optimization opportunities")) && /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-emerald-500 font-bold text-base", children: "✓" }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: "Live Optimization Scan Complete: 0 Waste Opportunities Detected" }),
        /* @__PURE__ */ e("div", { className: "text-muted mt-0.5", children: "AWS Cost Optimization Hub & Compute Optimizer verified 0 oversized instances or idle resources. This represents an audited clean baseline, not a failed or stuck process. See section 2 below for diagnostic details." })
      ] })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(y, { children: s.title }),
        /* @__PURE__ */ t("div", { className: "text-xs text-muted mt-1 font-mono", children: [
          "Scope: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: s.scope }),
          " · Created: ",
          s.createdAt
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "p-4 rounded-xl bg-surface-muted/30 border border-border", children: /* @__PURE__ */ e(Ee, { content: s.contentMarkdown }) })
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-muted/50 border border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground", children: "FinOps Reports & Executive Archive" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-0.5", children: "Durable, audit-ready reports compiled from live AWS billing telemetry and optimization pipelines." })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ e(A, { onClick: () => i("executive"), disabled: !!l, children: l === "executive" ? "Generating Executive Report…" : "✦ Generate Executive Report" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => i("backlog"),
            disabled: !!l,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors",
            children: l === "backlog" ? "Generating Backlog…" : "↘ Generate Backlog Report"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: o,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors flex items-center gap-1.5",
            title: "Configure automated daily and weekly report schedules",
            children: /* @__PURE__ */ e("span", { children: "⏱️ Automated Schedules" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: u,
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
          r.length,
          ")"
        ] }),
        /* @__PURE__ */ e("span", { className: "text-xs text-muted", children: "Persisted in local SQLite database" })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid gap-3", children: [
        r.map((f) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[280px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(N, { tone: f.type === "executive" ? "success" : "info", children: f.type }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-foreground", children: f.title })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: f.summary }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted font-mono mt-3", children: [
              "Scope: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: f.scope }),
              " · Generated: ",
              f.createdAt
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 self-center", children: [
            /* @__PURE__ */ e(A, { onClick: () => n(f), children: "Read Report" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => h(f.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, f.id)),
        !r.length && /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(te, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "No Reports Generated Yet" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted max-w-sm mx-auto mt-1 mb-4", children: "Generate your first monthly executive report or optimization backlog from live AWS billing telemetry." }),
          /* @__PURE__ */ e(A, { onClick: () => i("executive"), children: "Generate Executive Report Now" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Ve as default
};
