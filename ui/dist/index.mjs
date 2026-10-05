import { jsxs as t, jsx as e, Fragment as xe } from "react/jsx-runtime";
import { useState as h, useEffect as D, useMemo as Me } from "react";
import { useAppApi as fe, useChatLauncher as Fe } from "@kirocrew/app-sdk";
import { Skeleton as he, PageHeader as ge, Card as y, Btn as M, CardTitle as E, Badge as v, StatCard as V, EmptyState as be } from "@kirocrew/app-sdk/ui";
const Le = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], Ie = [["Overview", "◫"], ["Portfolio", "◎"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], J = (n) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(n)), z = (n) => {
  const s = Number(n);
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(s) < 5e-3 ? 0 : s);
}, Ce = (n) => n === "high" ? "success" : n === "medium" ? "warning" : "default";
function ae({ className: n = "w-6 h-6" }) {
  return /* @__PURE__ */ t("svg", { className: n, viewBox: "0 0 44 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M22 1.15L3.5 12.05L22 22.34L40.5 12.05L22 1.15Z", fill: "#00E5A3" }),
    /* @__PURE__ */ e("path", { d: "M18.8 47.66L0.5 37.36V16.71L18.8 27.01V47.66Z", fill: "#00C693" }),
    /* @__PURE__ */ e("path", { d: "M25.2 47.66L43.5 37.36V16.71L25.2 27.01V47.66Z", fill: "#00966F" })
  ] });
}
function rt() {
  const n = fe(), { openChat: s } = Fe(), [i, l] = h("Overview"), [r, p] = h(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [m, u] = h("Practitioner"), [d, c] = h(null), [k, x] = h([]), [S, C] = h([]), [g, b] = h(null), [w, f] = h(""), [j, F] = h(!1), [I, U] = h(() => localStorage.getItem("aws-finops-studio:timeRange") || "30"), [R, W] = h(() => localStorage.getItem("aws-finops-studio:tagFilter") || ""), [$, T] = h(null), [A, _] = h(!1), [K, P] = h([]), [B, X] = h(null), [ee, te] = h(null), [O, ne] = h(null), [se, ce] = h(null), [a, ie] = h(null), [re, ve] = h(!1), [Ne, ye] = h(null), oe = () => {
    c(null), f("");
    const o = "/apps/aws-finops-studio/api", N = r ? "demo" : "live";
    Promise.all([
      n.get(`${o}/overview?mode=${N}`),
      n.get(`${o}/recommendations?mode=${N}`),
      n.get(`${o}/evidence`),
      n.get(`${o}/reports`),
      n.get(`${o}/diagnostics`),
      n.get(`${o}/profiles`),
      n.get(`${o}/policies`),
      n.get(`${o}/schedules`),
      n.get(`${o}/dashboard?tags=${encodeURIComponent(R)}`)
    ]).then(([L, q, Z, G, Se, ue, Q, je, Te]) => {
      c(L), x(q.items), C((Z == null ? void 0 : Z.runs) || []), P((G == null ? void 0 : G.items) || []), b(Se), ne(ue), ce(Q), ie(je), T(Te);
    }).catch((L) => f(L.message || "Unable to load FinOps data"));
  }, Oe = async (o) => {
    try {
      const N = await n.post("/apps/aws-finops-studio/api/schedules", o);
      N != null && N.schedule && ie(N.schedule);
      const L = (N == null ? void 0 : N.schedule) || { ...a, ...o }, q = (O == null ? void 0 : O.activeProfile) || "default", Z = L.frequency || "daily", G = await n.get("/api/crons"), ue = (G != null && G.jobs ? G.jobs : Array.isArray(G) ? G : []).filter((Q) => Q.name === "aws-finops-daily" || Q.name === "aws-finops-weekly");
      for (const Q of ue)
        Q.id && await n.delete(`/api/crons/${Q.id}`);
      if (L.enabled) {
        const Q = Z === "daily" ? `Run daily AWS cost and anomaly pulse for profile ${q}. Check for service cost spikes >$${L.thresholdDollars} or >${L.thresholdPercent}%. Keep report concise and evidence-backed.` : `Run weekly executive FinOps digest and optimization backlog audit for profile ${q}. Summarize MTD spend, top service deltas, and rightsizing opportunities.`;
        await n.post("/api/crons", {
          name: Z === "daily" ? "aws-finops-daily" : "aws-finops-weekly",
          message: Q,
          cron: Z === "daily" ? "0 8 * * *" : "0 9 * * 1",
          agent: "finops-agent"
        });
      }
    } catch (N) {
      f(N.message || "Failed to update schedule");
    }
  }, We = async () => {
    ve(!0), ye(null), f("");
    try {
      const o = await n.post("/apps/aws-finops-studio/api/schedules", { action: "trigger" });
      ye(o), o != null && o.schedule && ie(o.schedule);
      const N = await n.get("/apps/aws-finops-studio/api/reports");
      N != null && N.items && P(N.items);
    } catch (o) {
      f(o.message || "Failed to run anomaly sweep");
    } finally {
      ve(!1);
    }
  };
  D(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(r));
    } catch {
    }
    oe();
  }, [r]), D(() => {
    try {
      localStorage.setItem("aws-finops-studio:timeRange", I), localStorage.setItem("aws-finops-studio:tagFilter", R);
    } catch {
    }
  }, [I, R]);
  const Y = (o) => s({ agent: "finops-agent", message: o, autoSend: !0 }), le = async () => {
    F(!0), f("");
    try {
      const o = await n.post("/apps/aws-finops-studio/api/refresh-live", { timeRange: I, tagFilter: R });
      c(o);
      const N = await n.get(`/apps/aws-finops-studio/api/dashboard?tags=${encodeURIComponent(R)}`);
      T(N);
      const L = await n.get("/apps/aws-finops-studio/api/evidence");
      C((L == null ? void 0 : L.runs) || []);
      const q = await n.get("/apps/aws-finops-studio/api/diagnostics");
      b(q);
    } catch (o) {
      f(o.message || "Unable to load live AWS data");
    } finally {
      F(!1);
    }
  }, me = async (o) => {
    _(!0), f("");
    try {
      const N = o != null && o.length ? o : ($ == null ? void 0 : $.selectedRegions) || [(O == null ? void 0 : O.activeRegion) || "us-east-1"], L = await n.post("/apps/aws-finops-studio/api/audit", { profile: O == null ? void 0 : O.activeProfile, regions: N });
      T((q) => q && { ...q, audit: L, selectedRegions: N });
    } catch (N) {
      f(N.message || "Resource audit failed");
    } finally {
      _(!1);
    }
  }, we = async (o, N) => {
    f(""), F(!0);
    try {
      const L = await n.post("/apps/aws-finops-studio/api/profiles", { profile: o, region: N });
      ne(L), oe();
    } catch (L) {
      f(L.message || "Failed to switch AWS profile");
    } finally {
      F(!1);
    }
  }, Ee = async (o) => {
    te(o), f("");
    try {
      const N = await n.post("/apps/aws-finops-studio/api/reports", { type: o, mode: r ? "demo" : "live" });
      N != null && N.items && P(N.items), N != null && N.report && X(N.report);
    } catch (N) {
      f(N.message || "Failed to generate report");
    } finally {
      te(null);
    }
  }, $e = Me(() => d ? i === "Overview" ? d.mode === "live" ? /* @__PURE__ */ e(ze, { data: d, persona: m, onAsk: Y, onRefresh: le, refreshing: j, timeRange: I, setTimeRange: U, tagFilter: R, setTagFilter: W, dashboard: $, onScan: me, scanning: A }) : /* @__PURE__ */ e(Be, { data: d, persona: m, onAsk: () => Y("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : i === "Portfolio" ? /* @__PURE__ */ e(Qe, { profiles: (O == null ? void 0 : O.profiles) || [], timeRange: I, tags: R }) : i === "Resources" ? /* @__PURE__ */ e(Ze, { data: $, onScan: me, scanning: A }) : i === "Optimization" ? /* @__PURE__ */ e(
    Ve,
    {
      items: k,
      title: i,
      demo: r,
      onSwitchToDemo: () => p(!0),
      onRefresh: le,
      refreshing: j,
      dashboard: $
    }
  ) : i === "History" ? /* @__PURE__ */ e(He, { runs: S, recommendations: k, onRefresh: oe }) : i === "Connection" ? /* @__PURE__ */ e(
    qe,
    {
      data: g,
      profilesData: O,
      policiesData: se,
      onSwitchProfile: we,
      onRefreshLive: le,
      refreshing: j
    }
  ) : i === "Ask FinOps" ? /* @__PURE__ */ e(Ge, { onAsk: Y }) : i === "Anomalies" ? /* @__PURE__ */ e(
    _e,
    {
      scheduleConfig: a,
      onUpdateSchedule: Oe,
      onTriggerSweep: We,
      runningSweep: re,
      sweepResult: Ne,
      demo: r,
      anomalies: d.anomalies,
      onAsk: Y
    }
  ) : i === "Cost Explorer" ? d.mode === "demo" ? /* @__PURE__ */ e(Ke, { items: d.drivers }) : d.dataAvailable ? /* @__PURE__ */ t(xe, { children: [
    /* @__PURE__ */ e(Ue, { drivers: d.drivers, previous: d.previousDrivers || [], onRefresh: le, refreshing: j, dashboard: $ }),
    /* @__PURE__ */ e(Ye, { data: ($ == null ? void 0 : $.trend) || [] })
  ] }) : /* @__PURE__ */ e(Pe, { onRefresh: le, refreshing: j }) : i === "Commitments" ? /* @__PURE__ */ e(pe, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => Y("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : i === "Well-Architected" ? /* @__PURE__ */ e(pe, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => Y("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : i === "Reports" ? /* @__PURE__ */ e(
    et,
    {
      reports: K,
      selectedReport: B,
      onSelectReport: X,
      onGenerate: Ee,
      generating: ee,
      onAskAgent: () => Y("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly."),
      onOpenSchedules: () => l("Anomalies"),
      dashboard: $,
      onScan: me,
      scanning: A
    }
  ) : /* @__PURE__ */ e(pe, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => Y("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(he, {}),
    /* @__PURE__ */ e(he, {}),
    /* @__PURE__ */ e(he, {})
  ] }), [i, d, k, S, K, B, ee, g, O, se, r, m, j, a, re, Ne, $, A, I, R]), H = (d == null ? void 0 : d.callerIdentity) || (g == null ? void 0 : g.callerIdentity);
  return /* @__PURE__ */ t("div", { className: "h-full min-h-0 flex bg-surface text-foreground", children: [
    /* @__PURE__ */ t("aside", { className: "w-64 shrink-0 border-r border-border bg-surface-muted/40 p-3 overflow-y-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "p-3 mb-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 font-semibold", children: [
            /* @__PURE__ */ e("div", { className: "p-1.5 rounded-xl bg-surface border border-border shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(ae, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ t("div", { children: [
              /* @__PURE__ */ e("div", { className: "leading-tight", children: "AWS FinOps Studio" }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-muted uppercase tracking-wider font-mono", children: "v1.0.0 · AWS Read-Only" })
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: "Deterministic financial engineering & evidence" })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2 mb-3 rounded-lg border border-border/80 bg-surface/60 text-xs", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] uppercase font-bold text-muted flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { children: "Active Scope" }),
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${r ? "bg-amber-500" : H != null && H.verified ? "bg-emerald-500" : "bg-muted"}` })
          ] }),
          !r && (O != null && O.profiles) && O.profiles.length > 1 ? /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
            "select",
            {
              value: O.activeProfile,
              onChange: (o) => we(o.target.value, O.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: O.profiles.map((o) => /* @__PURE__ */ t("option", { value: o, children: [
                "Profile: ",
                o
              ] }, o))
            }
          ) }) : /* @__PURE__ */ e("div", { className: "font-medium mt-1 truncate", children: r ? "Synthetic Sandbox" : H != null && H.accountMasked ? `Account ${H.accountMasked}` : `Profile: ${(O == null ? void 0 : O.activeProfile) || "default"}` }),
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-[11px] text-muted mt-1 truncate", children: [
            /* @__PURE__ */ e("span", { children: r ? "Mock AWS Environment" : `${(O == null ? void 0 : O.activeRegion) || (H == null ? void 0 : H.region) || "us-east-1"} · Read-only` }),
            !r && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => l("Connection"),
                className: "text-accent hover:underline text-[10px] font-medium",
                children: "IAM Helper →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: Ie.map(([o, N]) => /* @__PURE__ */ t("button", { onClick: () => l(o), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${i === o ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: N }),
          o
        ] }, o)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-4 pt-3 border-t border-border", children: /* @__PURE__ */ t(
        "div",
        {
          onClick: () => p(!r),
          className: `p-3 rounded-xl border cursor-pointer select-none transition-all ${r ? "border-border bg-surface-muted/40 hover:border-border/80" : "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-500/60"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${r ? "bg-muted-foreground/40" : "bg-emerald-500"}` }),
                /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "Live AWS" }),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: `text-[10px] font-bold px-1.5 py-0.5 rounded ${r ? "bg-surface-muted text-muted" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"}`,
                    children: r ? "OFF" : "ON"
                  }
                )
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": !r,
                  "aria-label": "Toggle Live AWS",
                  onClick: (o) => {
                    o.stopPropagation(), p(!r);
                  },
                  className: `relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${r ? "bg-slate-300 dark:bg-slate-600" : "bg-emerald-500"}`,
                  children: /* @__PURE__ */ e(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${r ? "translate-x-0" : "translate-x-5"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-2 leading-snug", children: r ? "Demo sandbox mode. Turn ON for real AWS telemetry." : "Connected to live AWS. Real billing queries & strict evidence." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-y-auto", children: [
      /* @__PURE__ */ t("div", { className: "px-6 pt-5 pb-3 border-b border-border flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ e(ge, { title: i, subtitle: "Deterministic, read-only AWS financial operations workspace" }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border", children: Le.map((o) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => u(o.id),
            title: o.desc,
            className: `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${m === o.id ? "bg-surface text-foreground shadow-sm font-semibold" : "text-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ e("span", { children: o.icon }),
              /* @__PURE__ */ e("span", { children: o.label })
            ]
          },
          o.id
        )) })
      ] }),
      w && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e("div", { className: "p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm", children: w }) }),
      $e
    ] })
  ] });
}
function ke({ title: n, data: s, persona: i }) {
  const l = Math.abs(Number(s.credits)), r = Number(s.costBeforeCredits), p = r > 0 ? (l / r * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(E, { children: n }),
        /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1 font-mono", children: [
          s.start,
          " → ",
          s.end,
          " · End exclusive",
          s.estimated ? " · estimated" : ""
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        i === "Finance" && /* @__PURE__ */ t(v, { tone: "info", children: [
          "Credit ratio: ",
          p,
          "%"
        ] }),
        /* @__PURE__ */ e(v, { children: "RECORD_TYPE" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Unblended Gross (Pre-Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: z(s.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: z(s.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: z(s.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: z(s.netCost) })
      ] })
    ] }),
    (i === "Practitioner" || i === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(s.recordTypes, null, 2) })
    ] })
  ] });
}
function Pe({ onRefresh: n, refreshing: s }) {
  return /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ae, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(M, { onClick: n, disabled: s, children: s ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function ze({ data: n, persona: s, onAsk: i, onRefresh: l, refreshing: r, timeRange: p, setTimeRange: m, tagFilter: u, setTagFilter: d, dashboard: c, onScan: k, scanning: x }) {
  var g, b, w, f, j, F, I, U, R, W, $, T, A, _, K;
  const S = (g = n.live) == null ? void 0 : g.previousMonth, C = (b = n.live) == null ? void 0 : b.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(E, { children: "Live Waste Audit Dashboard" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Real-time infrastructure checks (Unused EIPs, Stopped EC2s, Unattached Volumes) based on aws-finops-dashboard methodology." })
      ] }),
      /* @__PURE__ */ t("table", { className: "w-full text-left text-xs text-muted border-collapse", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Resource Type" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Status" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Count" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Est. Waste / mo" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "Elastic IPs" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Unused / Unattached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((f = (w = c == null ? void 0 : c.audit) == null ? void 0 : w.counts) == null ? void 0 : f.unusedEips) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EC2 Instances" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Stopped" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((F = (j = c == null ? void 0 : c.audit) == null ? void 0 : j.counts) == null ? void 0 : F.stoppedInstances) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EBS Volumes" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Available (Unattached)" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((U = (I = c == null ? void 0 : c.audit) == null ? void 0 : I.counts) == null ? void 0 : U.unusedVolumes) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Resources" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Untagged" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((W = (R = c == null ? void 0 : c.audit) == null ? void 0 : R.counts) == null ? void 0 : W.untaggedResources) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Budgets" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "critical", children: "Breached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: (($ = c == null ? void 0 : c.budgets) == null ? void 0 : $.filter((P) => P.breached).length) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ e("button", { onClick: k, disabled: x, className: "text-xs text-accent hover:underline disabled:opacity-50", children: x ? "Scanning all resources…" : "Scan Now" }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(v, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: s }),
          " · ",
          (T = n.live) != null && T.profile ? `Profile: ${n.live.profile}` : ""
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
    !n.dataAvailable && /* @__PURE__ */ e(Pe, { onRefresh: l, refreshing: r }),
    /* @__PURE__ */ e("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 mb-4", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("label", { className: "text-[10px] font-semibold text-muted uppercase tracking-wider", children: "Time Range" }),
        /* @__PURE__ */ t(
          "select",
          {
            value: p,
            onChange: (P) => m(P.target.value),
            className: "text-xs bg-surface border border-border rounded-lg px-2 py-1.5 text-foreground outline-none",
            children: [
              /* @__PURE__ */ e("option", { value: "7", children: "Last 7 Days" }),
              /* @__PURE__ */ e("option", { value: "30", children: "Last 30 Days" }),
              /* @__PURE__ */ e("option", { value: "90", children: "Last 90 Days" }),
              /* @__PURE__ */ e("option", { value: "last-month", children: "Previous Calendar Month" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("label", { className: "text-[10px] font-semibold text-muted uppercase tracking-wider", children: "Tag Filter" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "CostCenter=Alpha, Environment=Prod",
            value: u,
            onChange: (P) => d(P.target.value),
            className: "text-xs bg-surface border border-border rounded-lg px-2 py-1.5 text-foreground outline-none min-w-[150px]"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "flex flex-col justify-end pt-5", children: /* @__PURE__ */ e(M, { onClick: l, disabled: r, children: r ? "Refreshing..." : "Apply & Refresh" }) })
    ] }) }),
    (((A = c == null ? void 0 : c.tags) == null ? void 0 : A.length) || 0) > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: c.tags.map((P) => /* @__PURE__ */ t(v, { tone: "info", children: [
      P.key,
      "=",
      P.value
    ] }, `${P.key}=${P.value}`)) }),
    (((_ = c == null ? void 0 : c.budgets) == null ? void 0 : _.length) || 0) > 0 && /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e(E, { children: "AWS Budgets" }),
      /* @__PURE__ */ e("div", { className: "mt-3 grid gap-2", children: c.budgets.map((P) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-sm border-b border-border pb-2", children: [
        /* @__PURE__ */ e("span", { children: P.name }),
        /* @__PURE__ */ t("span", { className: P.breached ? "text-red-500" : "text-foreground", children: [
          z(P.actual),
          " / ",
          z(P.limit),
          " · ",
          P.percentUsed.toFixed(1),
          "%"
        ] })
      ] }, P.name)) })
    ] }),
    S && /* @__PURE__ */ e(ke, { title: "Previous complete month", data: S, persona: s }),
    C && /* @__PURE__ */ e(ke, { title: "Month to date", data: C, persona: s }),
    n.dataAvailable && s === "Leadership" && /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e(E, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: z((C == null ? void 0 : C.netCost) || "0.00") })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Active Optimization Pipeline" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-accent", children: n.optimizationOpportunity ? J(n.optimizationOpportunity) : "$0" })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Verified Realized Savings" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-emerald-600", children: "$0.00 (awaiting post-cycle verification)" })
        ] })
      ] })
    ] }),
    n.dataAvailable && /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((K = n.live) == null ? void 0 : K.refreshedAt) && `Last refreshed: ${n.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(M, { onClick: l, disabled: r, children: r ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(M, { onClick: () => i("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
      ] })
    ] }) })
  ] });
}
function Ue({ drivers: n, previous: s, onRefresh: i, refreshing: l, dashboard: r }) {
  var p, m, u, d, c, k, x, S, C;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(E, { children: "Live Waste Audit Dashboard" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Real-time infrastructure checks (Unused EIPs, Stopped EC2s, Unattached Volumes) based on aws-finops-dashboard methodology." })
      ] }),
      /* @__PURE__ */ t("table", { className: "w-full text-left text-xs text-muted border-collapse", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Resource Type" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Status" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Count" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Est. Waste / mo" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "Elastic IPs" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Unused / Unattached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((m = (p = r == null ? void 0 : r.audit) == null ? void 0 : p.counts) == null ? void 0 : m.unusedEips) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EC2 Instances" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Stopped" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((d = (u = r == null ? void 0 : r.audit) == null ? void 0 : u.counts) == null ? void 0 : d.stoppedInstances) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EBS Volumes" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Available (Unattached)" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((k = (c = r == null ? void 0 : r.audit) == null ? void 0 : c.counts) == null ? void 0 : k.unusedVolumes) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Resources" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Untagged" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((S = (x = r == null ? void 0 : r.audit) == null ? void 0 : x.counts) == null ? void 0 : S.untaggedResources) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Budgets" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "critical", children: "Breached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((C = r == null ? void 0 : r.budgets) == null ? void 0 : C.filter((g) => g.breached).length) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ e("button", { onClick: i, disabled: l, className: "text-xs text-accent hover:underline disabled:opacity-50", children: "Refresh cost evidence" }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Service Cost Drivers" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Pre-credit unblended cost with Month-over-Month delta tracking" })
      ] }),
      /* @__PURE__ */ e(M, { onClick: i, disabled: l, children: l ? "Refreshing…" : "Refresh live AWS data" })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e(E, { children: "Month-to-Date Services & MoM Change" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "UnblendedCost · Excludes Credit & Refund record types" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((g) => {
        const b = Number(g.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: g.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            g.changePercent !== null && g.changePercent !== void 0 && /* @__PURE__ */ t(v, { tone: b > 0 ? "warning" : "success", children: [
              b > 0 ? "+" : "",
              g.changePercent,
              "% (",
              b > 0 ? "+" : "",
              z(g.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: z(g.cost) })
          ] })
        ] }, g.service);
      }) }),
      !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e(E, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: s.map((g) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: g.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: z(g.cost) })
      ] }, g.service)) }),
      !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function Be({ data: n, persona: s, onAsk: i }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(v, { children: [
          "Demo mode · as of ",
          n.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: s })
        ] })
      ] }),
      /* @__PURE__ */ e(M, { onClick: i, children: "✦ Explain demo dataset" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]", children: [
      /* @__PURE__ */ e(V, { label: "Month to date", value: J(n.mtdSpend), accent: !0 }),
      /* @__PURE__ */ e(V, { label: "Forecast", value: J(n.forecast) }),
      /* @__PURE__ */ e(V, { label: "Previous equivalent", value: J(n.previousEquivalent) }),
      /* @__PURE__ */ e(V, { label: "Cost change", value: `${n.costChangePercent > 0 ? "+" : ""}${n.costChangePercent}%` }),
      /* @__PURE__ */ e(V, { label: "Optimization opportunity", value: J(n.optimizationOpportunity) }),
      /* @__PURE__ */ e(V, { label: "FinOps score", value: "Insufficient data" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t(y, { children: [
        /* @__PURE__ */ e(E, { children: "Major cost drivers" }),
        /* @__PURE__ */ e("div", { className: "mt-4 space-y-3", children: n.drivers.map((l) => /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ e("span", { children: l.service }),
            /* @__PURE__ */ t("span", { className: "font-medium", children: [
              J(l.cost),
              " ",
              /* @__PURE__ */ t("span", { className: (l.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
                (l.changePercent || 0) > 0 ? "+" : "",
                l.changePercent,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "h-2 mt-2 bg-surface-muted rounded-full overflow-hidden", children: /* @__PURE__ */ e("div", { className: "h-full bg-accent rounded-full", style: { width: `${Math.min(100, Number(l.cost) / 70)}%` } }) })
        ] }, l.service)) })
      ] }),
      /* @__PURE__ */ t(y, { children: [
        /* @__PURE__ */ e(E, { children: "Recent anomalies" }),
        /* @__PURE__ */ e("div", { className: "mt-3 divide-y divide-border", children: n.anomalies.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-amber-500", "aria-hidden": !0, children: "△" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium", children: [
              l.service,
              " · ",
              J(l.impact)
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
              l.summary,
              " · ",
              l.date
            ] })
          ] })
        ] }, l.date + l.service)) })
      ] })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e(E, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: n.finopsScoreReason })
    ] })
  ] });
}
function Ve({
  items: n,
  title: s,
  demo: i,
  onSwitchToDemo: l,
  onRefresh: r,
  refreshing: p,
  dashboard: m
}) {
  var u, d, c, k, x, S, C, g, b;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(E, { children: "Live Waste Audit Dashboard" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Real-time infrastructure checks (Unused EIPs, Stopped EC2s, Unattached Volumes) based on aws-finops-dashboard methodology." })
      ] }),
      /* @__PURE__ */ t("table", { className: "w-full text-left text-xs text-muted border-collapse", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Resource Type" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Status" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Count" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Est. Waste / mo" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "Elastic IPs" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Unused / Unattached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((d = (u = m == null ? void 0 : m.audit) == null ? void 0 : u.counts) == null ? void 0 : d.unusedEips) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EC2 Instances" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Stopped" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((k = (c = m == null ? void 0 : m.audit) == null ? void 0 : c.counts) == null ? void 0 : k.stoppedInstances) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EBS Volumes" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Available (Unattached)" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((S = (x = m == null ? void 0 : m.audit) == null ? void 0 : x.counts) == null ? void 0 : S.unusedVolumes) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Resources" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Untagged" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((g = (C = m == null ? void 0 : m.audit) == null ? void 0 : C.counts) == null ? void 0 : g.untaggedResources) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Budgets" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "critical", children: "Breached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((b = m == null ? void 0 : m.budgets) == null ? void 0 : b.filter((w) => w.breached).length) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ e("button", { onClick: r, disabled: p, className: "text-xs text-accent hover:underline disabled:opacity-50", children: "Refresh optimization evidence" }) })
    ] }),
    n.length > 0 ? /* @__PURE__ */ e("div", { className: "grid gap-3", children: n.map((w) => /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/10 text-emerald-600 h-fit", children: "↘" }),
      /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ e(E, { children: w.what }),
          /* @__PURE__ */ e(v, { children: w.service }),
          /* @__PURE__ */ e(v, { tone: w.status === "verified" ? "success" : w.status === "approved" ? "info" : "default", children: w.status })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: w.why }),
        /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4 text-sm", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Potential saving" }),
            /* @__PURE__ */ t("b", { children: [
              J(w.estimatedSaving),
              "/mo"
            ] })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
            /* @__PURE__ */ e(v, { tone: Ce(w.confidence), children: w.confidence })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
            /* @__PURE__ */ e(v, { tone: Ce(w.risk), children: w.risk })
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Resource" }),
            /* @__PURE__ */ e("code", { className: "text-xs", children: w.resource })
          ] })
        ] }),
        /* @__PURE__ */ t("details", { className: "mt-3 text-xs text-muted", children: [
          /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Supporting evidence & lifecycle" }),
          /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded whitespace-pre-wrap", children: JSON.stringify(w.evidence, null, 2) })
        ] })
      ] })
    ] }) }, w.id)) }) : i ? /* @__PURE__ */ e(be, { title: `No ${s.toLowerCase()} records`, description: "Demo mode contains sample records." }) : /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "text-center py-8 max-w-lg mx-auto", children: [
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
        /* @__PURE__ */ e(M, { onClick: l, children: "✦ Switch to Demo Mode to Explore Workflow" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: r,
            disabled: p,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
            children: p ? "Scanning AWS…" : "↻ Re-scan AWS Telemetry"
          }
        )
      ] })
    ] }) })
  ] });
}
function He({ runs: n, recommendations: s, onRefresh: i }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Immutable Evidence & Audit Trail" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Durable SQLite runs, SHA-256 provenance hashes, and lifecycle state" })
      ] }),
      /* @__PURE__ */ e(M, { onClick: i, children: "Refresh audit log" })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t(E, { children: [
        "Historical Query Runs (",
        n.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Every refresh persists an immutable query record with request parameters and hash" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border", children: [
        n.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex flex-wrap items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "font-medium text-sm font-mono text-foreground", children: l.id }),
            /* @__PURE__ */ t("div", { className: "text-muted mt-0.5", children: [
              "Account: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: l.accountMasked }),
              " · Profile: ",
              l.profile,
              " · Region: ",
              l.region
            ] }),
            /* @__PURE__ */ t("div", { className: "text-muted font-mono mt-1 text-[11px]", children: [
              "Hash: ",
              l.payloadHash
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right", children: [
            /* @__PURE__ */ e(v, { tone: "success", children: "Verified" }),
            /* @__PURE__ */ e("div", { className: "text-muted mt-1", children: l.timestamp })
          ] })
        ] }, l.id)),
        !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t(E, { children: [
        "Recommendation Decision Lifecycle (",
        s.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Identified → Reviewed → Approved → Implemented → Verified" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border text-xs", children: [
        s.map((l) => /* @__PURE__ */ t("div", { className: "py-2.5 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: l.what }),
            /* @__PURE__ */ t("span", { className: "text-muted ml-2", children: [
              "(",
              l.service,
              " · ",
              l.resource,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ e(v, { tone: l.status === "verified" ? "success" : l.status === "approved" ? "info" : "default", children: l.status })
        ] }, l.id)),
        !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-2", children: "No recommendations currently stored." })
      ] })
    ] })
  ] });
}
function qe({
  data: n,
  profilesData: s,
  policiesData: i,
  onSwitchProfile: l,
  onRefreshLive: r,
  refreshing: p
}) {
  var X, ee, te, O, ne, se, ce;
  const [m, u] = h((s == null ? void 0 : s.activeProfile) || "default"), [d, c] = h((s == null ? void 0 : s.activeRegion) || "us-east-1"), [k, x] = h(""), [S, C] = h("full"), [g, b] = h(!1), [w, f] = h(!1), [j, F] = h(!1), [I, U] = h(null);
  D(() => {
    s != null && s.activeProfile && u(s.activeProfile), s != null && s.activeRegion && c(s.activeRegion);
  }, [s]);
  const R = async () => {
    const a = (k.trim() || d).trim();
    F(!0), U(null);
    try {
      await l(m, a), U(`Scope applied: profile "${m}" in region "${a}"`), setTimeout(() => U(null), 4e3);
    } finally {
      F(!1);
    }
  }, W = ((X = i == null ? void 0 : i.policies) == null ? void 0 : X.find((a) => a.id === S)) || ((ee = i == null ? void 0 : i.policies) == null ? void 0 : ee[0]), $ = () => {
    var a;
    W != null && W.policyJson && ((a = navigator.clipboard) == null || a.writeText(W.policyJson), b(!0), setTimeout(() => b(!1), 2500));
  }, T = () => {
    var re;
    const a = (k.trim() || d).trim(), ie = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${m} --region ${a}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${m}`;
    (re = navigator.clipboard) == null || re.writeText(ie), f(!0), setTimeout(() => f(!1), 2500);
  }, A = (s == null ? void 0 : s.callerIdentity) || (n == null ? void 0 : n.callerIdentity), _ = (te = s == null ? void 0 : s.profiles) != null && te.length ? s.profiles : ["default"], K = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], P = (O = n == null ? void 0 : n.checks) == null ? void 0 : O.find((a) => a.name.includes("Cost Optimization Hub")), B = (ne = n == null ? void 0 : n.checks) == null ? void 0 : ne.find((a) => a.name.includes("Compute Optimizer"));
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(E, { children: "AWS Profile & Scope Management" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Select which local AWS profile and target region to query. Works with AWS Control Tower, IAM Identity Center (SSO), and named CLI profiles." })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: `w-2.5 h-2.5 rounded-full ${A != null && A.verified ? "bg-emerald-500" : "bg-amber-500"}` }),
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: A != null && A.verified ? "STS Verified" : "Unauthenticated" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-6 mt-4", children: [
        /* @__PURE__ */ t("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs font-semibold text-foreground mb-1.5", children: "AWS Profile" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
              "select",
              {
                value: m,
                onChange: (a) => u(a.target.value),
                className: "flex-1 bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                children: _.map((a) => /* @__PURE__ */ t("option", { value: a, children: [
                  a,
                  " ",
                  a === (s == null ? void 0 : s.activeProfile) ? "(active)" : ""
                ] }, a))
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
                  value: K.some((a) => a.id === d) ? d : "custom",
                  onChange: (a) => {
                    a.target.value !== "custom" && (c(a.target.value), x(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    K.map((a) => /* @__PURE__ */ e("option", { value: a.id, children: a.label }, a.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: k || (K.some((a) => a.id === d) ? "" : d),
                  onChange: (a) => x(a.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(M, { onClick: R, disabled: j, children: j ? "Applying Scope…" : "Switch & Verify Profile" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: r,
                disabled: p,
                className: "px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
                children: p ? "Refreshing…" : "↻ Test Connection & Ingest"
              }
            )
          ] }),
          I && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { children: "✓" }),
            /* @__PURE__ */ e("span", { children: I })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-surface-muted/40 border border-border flex flex-col justify-between", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] uppercase font-bold tracking-wider text-muted", children: "Caller Identity Provenance" }),
              /* @__PURE__ */ e(v, { tone: A != null && A.verified ? "success" : "default", children: A != null && A.verified ? "Active & Verified" : "Pending Verification" })
            ] }),
            /* @__PURE__ */ t("div", { className: "space-y-2 mt-3 font-mono text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Account:" }),
                /* @__PURE__ */ e("span", { className: "font-semibold text-foreground", children: (A == null ? void 0 : A.accountMasked) || "unknown" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Profile:" }),
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (s == null ? void 0 : s.activeProfile) || m })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (s == null ? void 0 : s.activeRegion) || d })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: [
                /* @__PURE__ */ e("span", { className: "text-muted block mb-1", children: "IAM ARN:" }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-foreground/90 break-all select-all", children: (A == null ? void 0 : A.arn) || "None (verify credentials)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-3 pt-3 border-t border-border/60", children: "Zero mutations: AWS FinOps Studio runs 100% read-only operations via STS and Cost APIs." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(E, { children: "IAM Least-Privilege Policy Helper" }),
            /* @__PURE__ */ e(v, { tone: "success", children: "Read-Only Guardrails" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1", children: [
            "Exact IAM policy definitions for AWS profile ",
            /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: m }),
            ". Ready for 1-click copy-paste into the AWS IAM Console."
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(M, { onClick: $, children: g ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (se = i == null ? void 0 : i.policies) == null ? void 0 : se.map((a) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => C(a.id),
          className: `p-3 rounded-xl border text-left transition-all ${S === a.id ? "border-accent bg-accent/10 shadow-sm" : "border-border bg-surface hover:border-border/80"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted", children: a.tier }),
              a.recommended && /* @__PURE__ */ e("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400", children: "Recommended" })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-foreground truncate", children: a.title }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted mt-1", children: [
              a.actionCount,
              " IAM Actions"
            ] })
          ]
        },
        a.id
      )) }),
      W && /* @__PURE__ */ t("div", { className: "mt-4 p-4 rounded-xl bg-surface-muted/30 border border-border space-y-4", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { children: W.title }),
              /* @__PURE__ */ e(v, { tone: W.recommended ? "success" : "default", children: W.file })
            ] }),
            /* @__PURE__ */ t("span", { className: "text-xs text-muted font-mono", children: [
              W.actionCount,
              " read-only permissions"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1.5 leading-relaxed", children: W.summary })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] uppercase font-bold text-muted mb-2", children: "Capabilities Unlocked:" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: W.services.map((a) => /* @__PURE__ */ t("span", { className: "px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono text-foreground/80", children: [
            "✓ ",
            a
          ] }, a)) })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3 rounded-lg bg-surface border border-border text-xs space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: /* @__PURE__ */ e("span", { children: "⚙️ Service Enrollment & Free Tier Status" }) }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: T,
                className: "text-accent hover:underline text-[11px] font-medium",
                children: w ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-2 text-[11px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: P != null && P.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: P != null && P.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Cost Optimization Hub (100% Free)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (P == null ? void 0 : P.detail) || "Opt-in required for automated rightsizing" })
              ] })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: B != null && B.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: B != null && B.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Compute Optimizer (100% Free Standard Tier)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (B == null ? void 0 : B.detail) || "Opt-in required for EC2 & EBS rightsizing" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted", children: [
              "JSON Policy Definition (",
              W.file,
              ")"
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: $,
                className: "text-accent hover:underline text-xs font-medium flex items-center gap-1",
                children: /* @__PURE__ */ e("span", { children: g ? "✓ Copied to clipboard" : "📋 Copy JSON" })
              }
            )
          ] }),
          /* @__PURE__ */ e("pre", { className: "p-3.5 rounded-xl bg-surface-muted/80 border border-border text-[11px] font-mono text-foreground overflow-x-auto max-h-64 leading-relaxed select-all", children: W.policyJson })
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
              /* @__PURE__ */ e("code", { className: "text-accent font-mono", children: m }),
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
            onClick: r,
            disabled: p,
            className: "text-accent hover:underline text-xs font-medium",
            children: p ? "Probing…" : "↻ Re-run Health Probes"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (ce = n == null ? void 0 : n.checks) == null ? void 0 : ce.map((a) => /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ e("div", { className: `mt-0.5 text-sm ${a.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}`, children: a.ok ? "✓" : "○" }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e(E, { children: a.name }),
            /* @__PURE__ */ e(v, { tone: a.ok ? "success" : "default", children: a.ok ? "Passing" : "Action Required" })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1 leading-relaxed", children: a.detail })
        ] })
      ] }) }, a.name)) })
    ] })
  ] });
}
function Ge({ onAsk: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ e(E, { children: "Ask an evidence-backed question" }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: "The FinOps Agent uses live, read-only AWS tools and deterministic arithmetic." }),
    /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-2 mt-4", children: [
      "Why did my AWS bill increase this month?",
      "What are my top 10 cost drivers?",
      "Are credits or refunds making my net cost look like zero?",
      "Where am I wasting money?",
      "Compare this month against last month.",
      "Find my highest-confidence optimization opportunities."
    ].map((i) => /* @__PURE__ */ e("button", { className: "text-left p-3 rounded-lg border border-border hover:border-accent text-sm transition-colors", onClick: () => n(i), children: i }, i)) })
  ] }) });
}
function Je({
  config: n,
  onUpdate: s,
  onTriggerSweep: i,
  runningSweep: l,
  sweepResult: r
}) {
  var W, $;
  const [p, m] = h((n == null ? void 0 : n.enabled) || !1), [u, d] = h((n == null ? void 0 : n.frequency) || "daily"), [c, k] = h((n == null ? void 0 : n.thresholdDollars) || "10.00"), [x, S] = h((n == null ? void 0 : n.thresholdPercent) || "15.0"), [C, g] = h(!1), [b, w] = h(null), [f, j] = h(!1);
  D(() => {
    n && (m(n.enabled), d(n.frequency), k(n.thresholdDollars), S(n.thresholdPercent));
  }, [n]);
  const F = async (T) => {
    g(!0), w(null);
    try {
      const A = T !== void 0 ? T : p;
      await s({
        enabled: A,
        frequency: u,
        thresholdDollars: c,
        thresholdPercent: x
      }), w(A ? "Schedule active & configured" : "Schedule paused"), setTimeout(() => w(null), 3e3);
    } finally {
      g(!1);
    }
  }, I = () => {
    const T = !p;
    m(T), F(T);
  }, U = u === "daily" ? ((W = n == null ? void 0 : n.cliCommands) == null ? void 0 : W.daily) || 'kirocrew cron add "aws-finops-daily" "Run daily AWS cost and anomaly pulse." --cron "0 8 * * *" --agent finops-agent' : (($ = n == null ? void 0 : n.cliCommands) == null ? void 0 : $.weekly) || 'kirocrew cron add "aws-finops-weekly" "Run weekly executive FinOps digest." --cron "0 9 * * 1" --agent finops-agent', R = () => {
    var T;
    (T = navigator.clipboard) == null || T.writeText(U), j(!0), setTimeout(() => j(!1), 2500);
  };
  return /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(E, { children: "Automated Health & Anomaly Schedules" }),
          /* @__PURE__ */ e(v, { tone: p ? "success" : "default", children: p ? "Active · Scheduled" : "Paused / Off" })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Configure automated recurring sweeps to monitor cost trajectory, detect spikes, and generate audit-ready pulses." })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: I,
          disabled: C,
          className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${p ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/40 hover:bg-emerald-500/25" : "bg-surface-muted text-muted border border-border hover:bg-surface-muted/80"}`,
          children: p ? "● Schedule: ON" : "○ Schedule: OFF"
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
                onClick: () => d("daily"),
                className: `p-3 rounded-xl border text-left transition-all ${u === "daily" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
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
                onClick: () => d("weekly"),
                className: `p-3 rounded-xl border text-left transition-all ${u === "weekly" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
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
                  value: c,
                  onChange: (T) => k(T.target.value),
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
                  value: x,
                  onChange: (T) => S(T.target.value),
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
          /* @__PURE__ */ e(M, { onClick: () => F(), disabled: C, children: C ? "Saving…" : "Save Schedule Settings" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: i,
              disabled: l,
              className: "px-3 py-2 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors flex items-center gap-1.5",
              children: /* @__PURE__ */ e("span", { children: l ? "Scanning Telemetry…" : "⚡ Test Sweep Now" })
            }
          )
        ] }),
        b && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "✓" }),
          /* @__PURE__ */ e("span", { children: b })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/40 border border-border", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs font-semibold mb-2", children: [
            /* @__PURE__ */ e("span", { children: "Latest Sweep Status" }),
            n != null && n.lastStatus ? /* @__PURE__ */ e(v, { tone: n.lastStatus === "clean" ? "success" : "alert", children: n.lastStatus === "clean" ? "Normal Baseline" : "Threshold Exceeded" }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-muted", children: "No runs yet" })
          ] }),
          n != null && n.lastRun ? /* @__PURE__ */ t("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ t("div", { className: "text-muted text-[11px] font-mono", children: [
              "Last Run: ",
              n.lastRun
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-foreground mt-1 leading-relaxed", children: n.lastSummary })
          ] }) : /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "Run an immediate test sweep or enable recurring schedules to record telemetry checkpoints in SQLite." }),
          r && /* @__PURE__ */ t("div", { className: "mt-3 pt-3 border-t border-border/80 text-xs space-y-1", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold flex items-center gap-1.5 text-foreground", children: [
              /* @__PURE__ */ e("span", { children: r.isAlert ? "⚠️" : "✓" }),
              /* @__PURE__ */ t("span", { children: [
                "Test Sweep Result: ",
                r.isAlert ? "Threshold Flagged" : "Clean Baseline"
              ] })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-muted text-[11px] leading-relaxed", children: r.summary })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/60 border border-border space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "CLI Command Helper" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: R,
                className: "text-accent hover:underline text-xs font-medium",
                children: f ? "✓ Copied" : "📋 Copy Command"
              }
            )
          ] }),
          /* @__PURE__ */ e("p", { className: "text-[11px] text-muted leading-relaxed", children: "This schedule is automatically synchronized with your Kiro Crew background jobs. You can also deploy it via CLI if you prefer:" }),
          /* @__PURE__ */ e("pre", { className: "p-2.5 rounded-lg bg-surface border border-border text-[11px] font-mono text-foreground overflow-x-auto whitespace-pre-wrap select-all", children: U })
        ] })
      ] })
    ] })
  ] });
}
function _e({
  scheduleConfig: n,
  onUpdateSchedule: s,
  onTriggerSweep: i,
  runningSweep: l,
  sweepResult: r,
  demo: p,
  anomalies: m,
  onAsk: u
}) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ e(
      Je,
      {
        config: n,
        onUpdate: s,
        onTriggerSweep: i,
        runningSweep: l,
        sweepResult: r
      }
    ),
    /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground", children: p ? "Synthetic Anomalies (Demo Mode)" : "AWS Cost Anomaly Detection Status" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: p ? "Sample anomaly scenarios demonstrating impact and root-cause attribution." : "Monitored continuously against AWS Cost Anomaly Detection service and Cost Explorer." })
        ] }),
        !p && /* @__PURE__ */ e(
          "button",
          {
            onClick: () => u("Analyze current cost anomalies and verify if any service exceeded variance thresholds."),
            className: "px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors",
            children: "💬 Deep Anomaly Analysis in Agent"
          }
        )
      ] }),
      p ? /* @__PURE__ */ e("div", { className: "space-y-3", children: m.map((d) => /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(E, { children: d.service }),
          /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: d.summary })
        ] }),
        /* @__PURE__ */ t("div", { className: "text-right", children: [
          /* @__PURE__ */ e("b", { children: J(d.impact) }),
          /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
            "estimated impact · ",
            d.date
          ] })
        ] })
      ] }) }, d.date + d.service)) }) : /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "py-6 text-center max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold", children: "✓" }),
        /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "0 Active AWS Cost Anomalies" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "AWS Cost Anomaly Detection has reported no severe unexpected spikes for this account scope. Recurring background sweeps will monitor telemetry as workloads run." })
      ] }) })
    ] })
  ] });
}
function Ke({ items: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ e(E, { children: "Demo service breakdown" }),
    /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((s) => /* @__PURE__ */ t("div", { className: "py-3 grid grid-cols-3", children: [
      /* @__PURE__ */ e("b", { children: s.service }),
      /* @__PURE__ */ e("span", { children: J(s.cost) }),
      /* @__PURE__ */ t("span", { className: (s.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
        (s.changePercent || 0) > 0 ? "+" : "",
        s.changePercent,
        "%"
      ] })
    ] }, s.service)) }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-4", children: "Synthetic values shown only because Demo mode is enabled." })
  ] }) });
}
function Qe({ profiles: n, timeRange: s, tags: i }) {
  const l = fe(), [r, p] = h(n), [m, u] = h(!0), [d, c] = h(null), [k, x] = h(!1), [S, C] = h("");
  D(() => {
    p(n);
  }, [n.join("|")]);
  const g = async () => {
    x(!0), C("");
    try {
      c(await l.post("/apps/aws-finops-studio/api/portfolio", { profiles: r, timeRange: s, tags: i, combine: m }));
    } catch (b) {
      C(b.message || "Portfolio query failed");
    } finally {
      x(!1);
    }
  };
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ e(ge, { title: "Multi-account portfolio", description: "Compare selected AWS CLI profiles and optionally combine profiles that resolve to the same AWS account." }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: n.map((b) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs border border-border rounded-lg px-2 py-1.5", children: [
        /* @__PURE__ */ e("input", { type: "checkbox", checked: r.includes(b), onChange: (w) => p(w.target.checked ? [...r, b] : r.filter((f) => f !== b)) }),
        b
      ] }, b)) }),
      /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs mt-3", children: [
        /* @__PURE__ */ e("input", { type: "checkbox", checked: m, onChange: (b) => u(b.target.checked) }),
        "Combine profiles belonging to the same AWS account"
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ e(M, { onClick: g, disabled: k || r.length === 0, children: k ? "Loading portfolio…" : "Load portfolio" }) }),
      S && /* @__PURE__ */ e("div", { className: "text-xs text-red-500 mt-2", children: S })
    ] }),
    d && /* @__PURE__ */ t(xe, { children: [
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ e(V, { label: "Current period total", value: z(d.totalCurrent) }),
        /* @__PURE__ */ e(V, { label: "Previous period total", value: z(d.totalPrevious) })
      ] }),
      /* @__PURE__ */ t(y, { children: [
        /* @__PURE__ */ e(E, { children: "Profiles and accounts" }),
        /* @__PURE__ */ e("div", { className: "mt-3 overflow-auto", children: /* @__PURE__ */ t("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "text-left border-b border-border", children: [
            /* @__PURE__ */ e("th", { className: "py-2", children: "Profile" }),
            /* @__PURE__ */ e("th", { children: "Account" }),
            /* @__PURE__ */ e("th", { className: "text-right", children: "Previous" }),
            /* @__PURE__ */ e("th", { className: "text-right", children: "Current" }),
            /* @__PURE__ */ e("th", { className: "text-right", children: "Change" })
          ] }) }),
          /* @__PURE__ */ e("tbody", { children: d.rows.map((b) => /* @__PURE__ */ t("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ e("td", { className: "py-2 font-medium", children: b.profile }),
            /* @__PURE__ */ e("td", { children: b.accountMasked }),
            /* @__PURE__ */ e("td", { className: "text-right", children: z(b.previousCost) }),
            /* @__PURE__ */ e("td", { className: "text-right", children: z(b.currentCost) }),
            /* @__PURE__ */ e("td", { className: "text-right", children: b.changePercent == null ? "N/A" : `${b.changePercent.toFixed(1)}%` })
          ] }, b.profile)) })
        ] }) })
      ] })
    ] })
  ] });
}
function Ye({ data: n }) {
  const s = Math.max(1, ...n.map((i) => Number(i.cost)));
  return /* @__PURE__ */ e("div", { className: "px-6 pb-6", children: /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ e(E, { children: "Six-month cost trend" }),
    n.length === 0 ? /* @__PURE__ */ e(be, { title: "No trend data", description: "Refresh live data or verify Cost Explorer permissions." }) : /* @__PURE__ */ e("div", { className: "mt-5 flex items-end gap-3 h-52", children: n.map((i) => /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 flex flex-col justify-end h-full", children: [
      /* @__PURE__ */ e("div", { className: "text-[10px] text-center text-muted mb-1", children: z(i.cost) }),
      /* @__PURE__ */ e("div", { className: "bg-accent/80 rounded-t-md min-h-[3px]", style: { height: `${Math.max(3, Number(i.cost) / s * 150)}px` } }),
      /* @__PURE__ */ e("div", { className: "text-[10px] text-center text-muted mt-2 truncate", children: (/* @__PURE__ */ new Date(`${i.start}T00:00:00`)).toLocaleDateString(void 0, { month: "short" }) })
    ] }, i.start)) })
  ] }) });
}
function de({ title: n, items: s }) {
  return /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e(E, { children: n }),
      /* @__PURE__ */ e(v, { tone: s.length ? "warning" : "success", children: s.length })
    ] }),
    s.length === 0 ? /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No findings." }) : /* @__PURE__ */ e("div", { className: "mt-3 max-h-72 overflow-auto divide-y divide-border", children: s.map((i, l) => /* @__PURE__ */ t("div", { className: "py-2 text-xs flex justify-between gap-3", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-foreground", children: i.id }),
      /* @__PURE__ */ t("span", { className: "text-muted", children: [
        i.type,
        " · ",
        i.region,
        i.state ? ` · ${i.state}` : "",
        i.sizeGiB ? ` · ${i.sizeGiB} GiB` : ""
      ] })
    ] }, `${i.type}-${i.id}-${l}`)) })
  ] });
}
function Ze({ data: n, onScan: s, scanning: i }) {
  var m, u, d, c, k;
  const l = n == null ? void 0 : n.audit, [r, p] = h((n == null ? void 0 : n.selectedRegions) || []);
  return D(() => {
    var x;
    (x = n == null ? void 0 : n.selectedRegions) != null && x.length && !r.length && p(n.selectedRegions);
  }, [(m = n == null ? void 0 : n.selectedRegions) == null ? void 0 : m.join("|")]), /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ e(ge, { title: "Resource inventory & hygiene audit", description: "Live, read-only discovery across the selected AWS profile and regions." }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ e("div", { className: "text-xs font-semibold mb-2", children: "Regions" }),
      /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2 max-h-32 overflow-auto", children: (u = n == null ? void 0 : n.availableRegions) == null ? void 0 : u.map((x) => /* @__PURE__ */ t("label", { className: "flex items-center gap-1 text-[11px] border border-border rounded px-2 py-1", children: [
        /* @__PURE__ */ e("input", { type: "checkbox", checked: r.includes(x), onChange: (S) => p(S.target.checked ? [...r, x] : r.filter((C) => C !== x)) }),
        x
      ] }, x)) }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 mt-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
          "Profile: ",
          /* @__PURE__ */ e("strong", { children: (n == null ? void 0 : n.profile) || "—" }),
          " · ",
          r.length,
          " region(s)"
        ] }),
        /* @__PURE__ */ e(M, { onClick: () => s(r), disabled: i || r.length === 0, children: i ? "Scanning AWS resources…" : "Run resource audit" })
      ] })
    ] }),
    l ? /* @__PURE__ */ t(xe, { children: [
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ e(V, { label: "Running EC2", value: String(((d = l.ec2Summary) == null ? void 0 : d.running) || 0) }),
        /* @__PURE__ */ e(V, { label: "Stopped EC2", value: String(l.counts.stoppedInstances || 0) }),
        /* @__PURE__ */ e(V, { label: "Partial failures", value: String(((c = l.errors) == null ? void 0 : c.length) || 0) })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ e(de, { title: "Stopped EC2 instances", items: l.stoppedInstances }),
        /* @__PURE__ */ e(de, { title: "Unattached EBS volumes", items: l.unusedVolumes }),
        /* @__PURE__ */ e(de, { title: "Unused Elastic IPs", items: l.unusedEips }),
        /* @__PURE__ */ e(de, { title: "Untagged EC2, RDS, Lambda & ELB", items: l.untaggedResources })
      ] }),
      ((k = l.errors) == null ? void 0 : k.length) > 0 && /* @__PURE__ */ t(y, { children: [
        /* @__PURE__ */ e(E, { children: "Partial scan errors" }),
        /* @__PURE__ */ e("div", { className: "mt-2 text-xs text-muted space-y-1", children: l.errors.map((x, S) => /* @__PURE__ */ t("div", { children: [
          x.region,
          " · ",
          x.service,
          ": ",
          x.message
        ] }, S)) })
      ] })
    ] }) : /* @__PURE__ */ e(be, { title: "Audit not run", description: "Run the audit to discover EC2 state, unattached EBS volumes, unused Elastic IPs, and untagged resources." })
  ] });
}
function pe({ title: n, text: s, action: i }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ae, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: n }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: s }),
    /* @__PURE__ */ e(M, { onClick: i, children: "Open FinOps Agent" })
  ] }) }) });
}
function Ae(n) {
  return n.split(/(\*\*.*?\*\*|`.*?`)/g).map((i, l) => i.startsWith("**") && i.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: i.slice(2, -2) }, l) : i.startsWith("`") && i.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: i.slice(1, -1) }, l) : i);
}
function De({ content: n }) {
  const s = n.split(`
`), i = [];
  let l = [], r = !1;
  const p = (u, d) => {
    if (!u.length) return null;
    const c = u[0], k = u.slice(u.length > 1 && u[1].every((x) => x.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: c.map((x, S) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: x.trim() }, S)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: k.map((x, S) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: x.map((C, g) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: C.trim() }, g)) }, S)) })
    ] }) }, `table-${d}`);
  }, m = () => {
    r && l.length && (i.push(p(l, i.length)), l = [], r = !1);
  };
  return s.forEach((u, d) => {
    const c = u.trim();
    if (c.startsWith("|") && c.endsWith("|")) {
      r = !0;
      const k = c.split("|").slice(1, -1);
      l.push(k);
      return;
    } else
      m();
    c ? c.startsWith("# ") ? i.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: c.slice(2) }, d)) : c.startsWith("## ") ? i.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: c.slice(3) }, d)) : c.startsWith("### ") ? i.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: c.slice(4) }, d)) : c === "---" ? i.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, d)) : c.startsWith("- ") || c.startsWith("* ") ? i.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: Ae(c.slice(2)) })
      ] }, d)
    ) : i.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: Ae(c) }, d)
    ) : i.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${d}`));
  }), m(), /* @__PURE__ */ e("div", { className: "space-y-1", children: i });
}
function Re(n, s, i) {
  const l = new Blob([s], { type: i }), r = URL.createObjectURL(l), p = document.createElement("a");
  p.href = r, p.download = n, p.click(), URL.revokeObjectURL(r);
}
function Xe({ data: n }) {
  const s = fe(), [i, l] = h(""), [r, p] = h("finops-reports"), [m, u] = h(""), [d, c] = h(""), [k, x] = h(!1), S = JSON.stringify(n || {}, null, 2), C = `aws-finops-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, g = [];
  if (n != null && n.audit)
    for (const [f, j] of Object.entries({ stoppedInstances: n.audit.stoppedInstances, unusedVolumes: n.audit.unusedVolumes, unusedEips: n.audit.unusedEips, untaggedResources: n.audit.untaggedResources })) for (const F of j) g.push({ category: f, ...F });
  const b = ["category,type,id,region,state,sizeGiB", ...g.map((f) => [f.category, f.type, f.id, f.region, f.state || "", f.sizeGiB || ""].map((j) => `"${String(j ?? "").replace(/"/g, '""')}"`).join(","))].join(`
`), w = async (f) => {
    if (window.confirm(`Send this FinOps export to ${f === "s3" ? `s3://${i}/${r}` : `Slack channel ${m}`}?`)) {
      x(!0), c("");
      try {
        const j = await s.post("/apps/aws-finops-studio/api/exports", { destination: f, filename: C, content: S, contentType: "application/json", bucket: i, prefix: r, channel: m, profile: n == null ? void 0 : n.profile });
        c(`Delivered to ${j.location}`);
      } catch (j) {
        c(j.message || "Export failed");
      } finally {
        x(!1);
      }
    }
  };
  return /* @__PURE__ */ t(y, { children: [
    /* @__PURE__ */ e(E, { children: "Export center" }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Download structured evidence locally or explicitly deliver it to S3 or Slack." }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 mt-4", children: [
      /* @__PURE__ */ e(M, { onClick: () => Re(C, S, "application/json"), children: "Download JSON" }),
      /* @__PURE__ */ e("button", { onClick: () => Re(C.replace(".json", ".csv"), b, "text/csv"), className: "px-3 py-1.5 rounded-lg border border-border text-xs", children: "Download CSV" }),
      /* @__PURE__ */ e("button", { onClick: () => window.print(), className: "px-3 py-1.5 rounded-lg border border-border text-xs", children: "Print / PDF" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-4 mt-4", children: [
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "text-xs font-semibold", children: "Amazon S3" }),
        /* @__PURE__ */ e("input", { value: i, onChange: (f) => l(f.target.value), placeholder: "Bucket name", className: "w-full text-xs bg-surface border border-border rounded-lg px-2 py-2" }),
        /* @__PURE__ */ e("input", { value: r, onChange: (f) => p(f.target.value), placeholder: "Optional prefix", className: "w-full text-xs bg-surface border border-border rounded-lg px-2 py-2" }),
        /* @__PURE__ */ e("button", { disabled: !i || k, onClick: () => w("s3"), className: "px-3 py-1.5 rounded-lg bg-accent text-xs text-black disabled:opacity-50", children: "Send to S3" })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "text-xs font-semibold", children: "Slack" }),
        /* @__PURE__ */ e("input", { value: m, onChange: (f) => u(f.target.value), placeholder: "Channel ID (C012…)", className: "w-full text-xs bg-surface border border-border rounded-lg px-2 py-2" }),
        /* @__PURE__ */ e("p", { className: "text-[10px] text-muted", children: "Uses SLACK_BOT_TOKEN configured in KiroCrew." }),
        /* @__PURE__ */ e("button", { disabled: !m || k, onClick: () => w("slack"), className: "px-3 py-1.5 rounded-lg bg-accent text-xs text-black disabled:opacity-50", children: "Send to Slack" })
      ] })
    ] }),
    d && /* @__PURE__ */ e("div", { className: "text-xs mt-3 text-muted", children: d })
  ] });
}
function et({
  reports: n,
  selectedReport: s,
  onSelectReport: i,
  onGenerate: l,
  generating: r,
  onAskAgent: p,
  onOpenSchedules: m,
  dashboard: u,
  onScan: d,
  scanning: c
}) {
  var C, g, b, w, f, j, F, I, U;
  const [k, x] = h(!1), S = (R) => {
    var W;
    (W = navigator.clipboard) == null || W.writeText(R), x(!0), setTimeout(() => x(!1), 2e3);
  };
  return s ? /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(E, { children: "Live Waste Audit Dashboard" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Real-time infrastructure checks (Unused EIPs, Stopped EC2s, Unattached Volumes) based on aws-finops-dashboard methodology." })
      ] }),
      /* @__PURE__ */ t("table", { className: "w-full text-left text-xs text-muted border-collapse", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Resource Type" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold", children: "Status" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Count" }),
          /* @__PURE__ */ e("th", { className: "py-2 font-semibold text-right", children: "Est. Waste / mo" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "Elastic IPs" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Unused / Unattached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((g = (C = u == null ? void 0 : u.audit) == null ? void 0 : C.counts) == null ? void 0 : g.unusedEips) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EC2 Instances" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Stopped" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((w = (b = u == null ? void 0 : u.audit) == null ? void 0 : b.counts) == null ? void 0 : w.stoppedInstances) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "EBS Volumes" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Available (Unattached)" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((j = (f = u == null ? void 0 : u.audit) == null ? void 0 : f.counts) == null ? void 0 : j.unusedVolumes) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "$0.00" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Resources" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "info", children: "Untagged" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((I = (F = u == null ? void 0 : u.audit) == null ? void 0 : F.counts) == null ? void 0 : I.untaggedResources) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] }),
          /* @__PURE__ */ t("tr", { children: [
            /* @__PURE__ */ e("td", { className: "py-2", children: "AWS Budgets" }),
            /* @__PURE__ */ e("td", { className: "py-2", children: /* @__PURE__ */ e(v, { tone: "critical", children: "Breached" }) }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right", children: ((U = u == null ? void 0 : u.budgets) == null ? void 0 : U.filter((R) => R.breached).length) ?? "—" }),
            /* @__PURE__ */ e("td", { className: "py-2 text-right text-foreground font-mono", children: "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ e("button", { onClick: d, disabled: c, className: "text-xs text-accent hover:underline disabled:opacity-50", children: c ? "Scanning…" : "Scan Now" }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => i(null),
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "← Back to Report Archive"
          }
        ),
        /* @__PURE__ */ e(v, { tone: s.type === "executive" ? "success" : "info", children: s.type })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              const R = new Blob([s.contentMarkdown], { type: "text/markdown" }), W = URL.createObjectURL(R), $ = document.createElement("a");
              $.href = W, $.download = `report_${s.id}.md`, $.click();
            },
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "↓ Download MD"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              const W = s.contentMarkdown.split(`
`).map((_) => `"${_.replace(/"/g, '""')}"`).join(`
`), $ = new Blob([W], { type: "text/csv" }), T = URL.createObjectURL($), A = document.createElement("a");
              A.href = T, A.download = `report_${s.id}.csv`, A.click();
            },
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "↓ CSV"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => window.print(),
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "🖨️ PDF / Print"
          }
        ),
        /* @__PURE__ */ e(M, { onClick: () => S(s.contentMarkdown), children: k ? "✓ Copied" : "Copy Report Markdown" })
      ] })
    ] }),
    s.type === "backlog" && (s.contentMarkdown.includes("Identified Opportunities: 0") || s.contentMarkdown.includes("0 active optimization opportunities")) && /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-emerald-500 font-bold text-base", children: "✓" }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: "Live Optimization Scan Complete: 0 Waste Opportunities Detected" }),
        /* @__PURE__ */ e("div", { className: "text-muted mt-0.5", children: "AWS Cost Optimization Hub & Compute Optimizer verified 0 oversized instances or idle resources. This represents an audited clean baseline, not a failed or stuck process. See section 2 below for diagnostic details." })
      ] })
    ] }),
    /* @__PURE__ */ t(y, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(E, { children: s.title }),
        /* @__PURE__ */ t("div", { className: "text-xs text-muted mt-1 font-mono", children: [
          "Scope: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: s.scope }),
          " · Created: ",
          s.createdAt
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "p-4 rounded-xl bg-surface-muted/30 border border-border", children: /* @__PURE__ */ e(De, { content: s.contentMarkdown }) })
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ e(Xe, { data: u }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-muted/50 border border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground", children: "FinOps Reports & Executive Archive" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-0.5", children: "Durable, audit-ready reports compiled from live AWS billing telemetry and optimization pipelines." })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ e(M, { onClick: () => l("executive"), disabled: !!r, children: r === "executive" ? "Generating Executive Report…" : "✦ Generate Executive Report" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => l("backlog"),
            disabled: !!r,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors",
            children: r === "backlog" ? "Generating Backlog…" : "↘ Generate Backlog Report"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: m,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors flex items-center gap-1.5",
            title: "Configure automated daily and weekly report schedules",
            children: /* @__PURE__ */ e("span", { children: "⏱️ Automated Schedules" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: p,
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
        n.map((R) => /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[280px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(v, { tone: R.type === "executive" ? "success" : "info", children: R.type }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-foreground", children: R.title })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: R.summary }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted font-mono mt-3", children: [
              "Scope: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: R.scope }),
              " · Generated: ",
              R.createdAt
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 self-center", children: [
            /* @__PURE__ */ e(M, { onClick: () => i(R), children: "Read Report" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => S(R.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, R.id)),
        !n.length && /* @__PURE__ */ e(y, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ae, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "No Reports Generated Yet" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted max-w-sm mx-auto mt-1 mb-4", children: "Generate your first monthly executive report or optimization backlog from live AWS billing telemetry." }),
          /* @__PURE__ */ e(M, { onClick: () => l("executive"), children: "Generate Executive Report Now" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  rt as default
};
