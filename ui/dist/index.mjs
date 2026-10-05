import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { useState as m, useEffect as me, useMemo as Pe } from "react";
import { useAppApi as Re, useChatLauncher as Oe } from "@kirocrew/app-sdk";
import { Skeleton as ce, PageHeader as We, Card as f, Btn as O, Badge as S, CardTitle as k, StatCard as Y, EmptyState as je } from "@kirocrew/app-sdk/ui";
const Me = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], Fe = [["Overview", "◫"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], L = (r) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(r)), B = (r) => {
  const n = Number(r);
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(n) < 5e-3 ? 0 : n);
}, ge = (r) => r === "high" ? "success" : r === "medium" ? "warning" : "default";
function de({ className: r = "w-6 h-6" }) {
  return /* @__PURE__ */ t("svg", { className: r, viewBox: "0 0 44 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M22 1.15L3.5 12.05L22 22.34L40.5 12.05L22 1.15Z", fill: "#00E5A3" }),
    /* @__PURE__ */ e("path", { d: "M18.8 47.66L0.5 37.36V16.71L18.8 27.01V47.66Z", fill: "#00C693" }),
    /* @__PURE__ */ e("path", { d: "M25.2 47.66L43.5 37.36V16.71L25.2 27.01V47.66Z", fill: "#00966F" })
  ] });
}
function _e() {
  const r = Re(), { openChat: n } = Oe(), [s, i] = m("Overview"), [d, p] = m(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [o, g] = m("Practitioner"), [c, x] = m(null), [h, b] = m([]), [N, P] = m([]), [w, T] = m(null), [H, A] = m(""), [M, $] = m(!1), [G, U] = m("30"), [Z, C] = m(""), [J, R] = m(""), [v, ue] = m(""), [Q, j] = m([]), [F, _] = m(null), [K, X] = m(null), [y, D] = m(null), [ee, se] = m(null), [l, te] = m(null), [re, he] = m(!1), [pe, xe] = m(null), le = () => {
    x(null), A("");
    const a = "/apps/aws-finops-studio/api", u = d ? "demo" : "live";
    Promise.all([
      r.get(`${a}/overview?mode=${u}`),
      r.get(`${a}/recommendations?mode=${u}`),
      r.get(`${a}/evidence`),
      r.get(`${a}/reports`),
      r.get(`${a}/diagnostics`),
      r.get(`${a}/profiles`),
      r.get(`${a}/policies`),
      r.get(`${a}/schedules`)
    ]).then(([W, ie, V, E, be, ae, I, Ae]) => {
      x(W), b(ie.items), P((V == null ? void 0 : V.runs) || []), j((E == null ? void 0 : E.items) || []), T(be), D(ae), se(I), te(Ae);
    }).catch((W) => A(W.message || "Unable to load FinOps data"));
  }, we = async (a) => {
    try {
      const u = await r.post("/apps/aws-finops-studio/api/schedules", a);
      u != null && u.schedule && te(u.schedule);
      const W = (u == null ? void 0 : u.schedule) || { ...l, ...a }, ie = (y == null ? void 0 : y.activeProfile) || "default", V = W.frequency || "daily", E = await r.get("/api/crons"), ae = (E != null && E.jobs ? E.jobs : Array.isArray(E) ? E : []).filter((I) => I.name === "aws-finops-daily" || I.name === "aws-finops-weekly");
      for (const I of ae)
        I.id && await r.delete(`/api/crons/${I.id}`);
      if (W.enabled) {
        const I = V === "daily" ? `Run daily AWS cost and anomaly pulse for profile ${ie}. Check for service cost spikes >$${W.thresholdDollars} or >${W.thresholdPercent}%. Keep report concise and evidence-backed.` : `Run weekly executive FinOps digest and optimization backlog audit for profile ${ie}. Summarize MTD spend, top service deltas, and rightsizing opportunities.`;
        await r.post("/api/crons", {
          name: V === "daily" ? "aws-finops-daily" : "aws-finops-weekly",
          message: I,
          cron: V === "daily" ? "0 8 * * *" : "0 9 * * 1",
          agent: "finops-agent"
        });
      }
    } catch (u) {
      A(u.message || "Failed to update schedule");
    }
  }, Se = async () => {
    he(!0), xe(null), A("");
    try {
      const a = await r.post("/apps/aws-finops-studio/api/schedules", { action: "trigger" });
      xe(a), a != null && a.schedule && te(a.schedule);
      const u = await r.get("/apps/aws-finops-studio/api/reports");
      u != null && u.items && j(u.items);
    } catch (a) {
      A(a.message || "Failed to run anomaly sweep");
    } finally {
      he(!1);
    }
  };
  me(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(d));
    } catch {
    }
    le();
  }, [d]);
  const q = (a) => n({ agent: "finops-agent", message: a, autoSend: !0 }), ne = async () => {
    $(!0), A("");
    try {
      const a = await r.post("/apps/aws-finops-studio/api/refresh-live", {});
      x(a);
      const u = await r.get("/apps/aws-finops-studio/api/evidence");
      P((u == null ? void 0 : u.runs) || []);
      const W = await r.get("/apps/aws-finops-studio/api/diagnostics");
      T(W);
    } catch (a) {
      A(a.message || "Unable to load live AWS data");
    } finally {
      $(!1);
    }
  }, fe = async (a, u) => {
    A(""), $(!0);
    try {
      const W = await r.post("/apps/aws-finops-studio/api/profiles", { profile: a, region: u });
      D(W), le();
    } catch (W) {
      A(W.message || "Failed to switch AWS profile");
    } finally {
      $(!1);
    }
  }, Ce = async (a) => {
    X(a), A("");
    try {
      const u = await r.post("/apps/aws-finops-studio/api/reports", { type: a, mode: d ? "demo" : "live" });
      u != null && u.items && j(u.items), u != null && u.report && _(u.report);
    } catch (u) {
      A(u.message || "Failed to generate report");
    } finally {
      X(null);
    }
  }, ke = Pe(() => c ? s === "Overview" ? c.mode === "live" ? /* @__PURE__ */ e(Te, { data: c, persona: o, onAsk: q, onRefresh: ne, refreshing: M, timeRange: G, setTimeRange: U, tagFilter: Z, setTagFilter: C }) : /* @__PURE__ */ e(ze, { data: c, persona: o, onAsk: () => q("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : s === "Optimization" || s === "Resources" ? /* @__PURE__ */ e(
    Ee,
    {
      items: h,
      title: s,
      demo: d,
      onSwitchToDemo: () => p(!0),
      onRefresh: ne,
      refreshing: M
    }
  ) : s === "History" ? /* @__PURE__ */ e(Le, { runs: N, recommendations: h, onRefresh: le }) : s === "Connection" ? /* @__PURE__ */ e(
    Ie,
    {
      data: w,
      profilesData: y,
      policiesData: ee,
      onSwitchProfile: fe,
      onRefreshLive: ne,
      refreshing: M
    }
  ) : s === "Ask FinOps" ? /* @__PURE__ */ e(He, { onAsk: q }) : s === "Anomalies" ? /* @__PURE__ */ e(
    qe,
    {
      scheduleConfig: l,
      onUpdateSchedule: we,
      onTriggerSweep: Se,
      runningSweep: re,
      sweepResult: pe,
      demo: d,
      anomalies: c.anomalies,
      onAsk: q
    }
  ) : s === "Cost Explorer" ? c.mode === "demo" ? /* @__PURE__ */ e(Be, { items: c.drivers }) : c.dataAvailable ? /* @__PURE__ */ e($e, { drivers: c.drivers, previous: c.previousDrivers || [], onRefresh: ne, refreshing: M }) : /* @__PURE__ */ e(ye, { onRefresh: ne, refreshing: M }) : s === "Commitments" ? /* @__PURE__ */ e(oe, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => q("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : s === "Well-Architected" ? /* @__PURE__ */ e(oe, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => q("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : s === "Reports" ? /* @__PURE__ */ e(
    Ge,
    {
      reports: Q,
      selectedReport: F,
      onSelectReport: _,
      onGenerate: Ce,
      generating: K,
      onAskAgent: () => q("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly."),
      onOpenSchedules: () => i("Anomalies")
    }
  ) : /* @__PURE__ */ e(oe, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => q("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(ce, {}),
    /* @__PURE__ */ e(ce, {}),
    /* @__PURE__ */ e(ce, {})
  ] }), [s, c, h, N, Q, F, K, w, y, ee, d, o, M, l, re, pe]), z = (c == null ? void 0 : c.callerIdentity) || (w == null ? void 0 : w.callerIdentity);
  return /* @__PURE__ */ t("div", { className: "h-full min-h-0 flex bg-surface text-foreground", children: [
    /* @__PURE__ */ t("aside", { className: "w-64 shrink-0 border-r border-border bg-surface-muted/40 p-3 overflow-y-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "p-3 mb-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 font-semibold", children: [
            /* @__PURE__ */ e("div", { className: "p-1.5 rounded-xl bg-surface border border-border shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(de, { className: "w-5 h-5" }) }),
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
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${d ? "bg-amber-500" : z != null && z.verified ? "bg-emerald-500" : "bg-muted"}` })
          ] }),
          !d && (y != null && y.profiles) && y.profiles.length > 1 ? /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
            "select",
            {
              value: y.activeProfile,
              onChange: (a) => fe(a.target.value, y.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: y.profiles.map((a) => /* @__PURE__ */ t("option", { value: a, children: [
                "Profile: ",
                a
              ] }, a))
            }
          ) }) : /* @__PURE__ */ e("div", { className: "font-medium mt-1 truncate", children: d ? "Synthetic Sandbox" : z != null && z.accountMasked ? `Account ${z.accountMasked}` : `Profile: ${(y == null ? void 0 : y.activeProfile) || "default"}` }),
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-[11px] text-muted mt-1 truncate", children: [
            /* @__PURE__ */ e("span", { children: d ? "Mock AWS Environment" : `${(y == null ? void 0 : y.activeRegion) || (z == null ? void 0 : z.region) || "us-east-1"} · Read-only` }),
            !d && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => i("Connection"),
                className: "text-accent hover:underline text-[10px] font-medium",
                children: "IAM Helper →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: Fe.map(([a, u]) => /* @__PURE__ */ t("button", { onClick: () => i(a), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${s === a ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: u }),
          a
        ] }, a)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-4 pt-3 border-t border-border", children: /* @__PURE__ */ t(
        "div",
        {
          onClick: () => p(!d),
          className: `p-3 rounded-xl border cursor-pointer select-none transition-all ${d ? "border-border bg-surface-muted/40 hover:border-border/80" : "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-500/60"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${d ? "bg-muted-foreground/40" : "bg-emerald-500"}` }),
                /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "Live AWS" }),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: `text-[10px] font-bold px-1.5 py-0.5 rounded ${d ? "bg-surface-muted text-muted" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"}`,
                    children: d ? "OFF" : "ON"
                  }
                )
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": !d,
                  "aria-label": "Toggle Live AWS",
                  onClick: (a) => {
                    a.stopPropagation(), p(!d);
                  },
                  className: `relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${d ? "bg-slate-300 dark:bg-slate-600" : "bg-emerald-500"}`,
                  children: /* @__PURE__ */ e(
                    "span",
                    {
                      className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${d ? "translate-x-0" : "translate-x-5"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-2 leading-snug", children: d ? "Demo sandbox mode. Turn ON for real AWS telemetry." : "Connected to live AWS. Real billing queries & strict evidence." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-y-auto", children: [
      /* @__PURE__ */ t("div", { className: "px-6 pt-5 pb-3 border-b border-border flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ e(We, { title: s, subtitle: "Deterministic, read-only AWS financial operations workspace" }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border", children: Me.map((a) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => g(a.id),
            title: a.desc,
            className: `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${o === a.id ? "bg-surface text-foreground shadow-sm font-semibold" : "text-muted hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ e("span", { children: a.icon }),
              /* @__PURE__ */ e("span", { children: a.label })
            ]
          },
          a.id
        )) })
      ] }),
      H && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e("div", { className: "p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm", children: H }) }),
      ke
    ] })
  ] });
}
function ve({ title: r, data: n, persona: s }) {
  const i = Math.abs(Number(n.credits)), d = Number(n.costBeforeCredits), p = d > 0 ? (i / d * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(f, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(k, { children: r }),
        /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1 font-mono", children: [
          n.start,
          " → ",
          n.end,
          " · End exclusive",
          n.estimated ? " · estimated" : ""
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        s === "Finance" && /* @__PURE__ */ t(S, { tone: "info", children: [
          "Credit ratio: ",
          p,
          "%"
        ] }),
        /* @__PURE__ */ e(S, { children: "RECORD_TYPE" })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Unblended Gross (Pre-Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: B(n.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: B(n.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: B(n.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: B(n.netCost) })
      ] })
    ] }),
    (s === "Practitioner" || s === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(n.recordTypes, null, 2) })
    ] })
  ] });
}
function ye({ onRefresh: r, refreshing: n }) {
  return /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(de, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(O, { onClick: r, disabled: n, children: n ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function Te({ data: r, persona: n, onAsk: s, onRefresh: i, refreshing: d, timeRange: p, setTimeRange: o, tagFilter: g, setTagFilter: c }) {
  var b, N, P, w;
  const x = (b = r.live) == null ? void 0 : b.previousMonth, h = (N = r.live) == null ? void 0 : N.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(S, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: n }),
          " · ",
          (P = r.live) != null && P.profile ? `Profile: ${r.live.profile}` : ""
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
    !r.dataAvailable && /* @__PURE__ */ e(ye, { onRefresh: i, refreshing: d }),
    x && /* @__PURE__ */ e(ve, { title: "Previous complete month", data: x, persona: n }),
    h && /* @__PURE__ */ e(ve, { title: "Month to date", data: h, persona: n }),
    r.dataAvailable && n === "Leadership" && /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ e(k, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: B((h == null ? void 0 : h.netCost) || "0.00") })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Active Optimization Pipeline" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-accent", children: r.optimizationOpportunity ? L(r.optimizationOpportunity) : "$0" })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Verified Realized Savings" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-emerald-600", children: "$0.00 (awaiting post-cycle verification)" })
        ] })
      ] })
    ] }),
    r.dataAvailable && /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((w = r.live) == null ? void 0 : w.refreshedAt) && `Last refreshed: ${r.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(O, { onClick: i, disabled: d, children: d ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(O, { onClick: () => s("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
      ] })
    ] }) })
  ] });
}
function $e({ drivers: r, previous: n, onRefresh: s, refreshing: i }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Service Cost Drivers" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Pre-credit unblended cost with Month-over-Month delta tracking" })
      ] }),
      /* @__PURE__ */ e(O, { onClick: s, disabled: i, children: i ? "Refreshing…" : "Refresh live AWS data" })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ e(k, { children: "Month-to-Date Services & MoM Change" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "UnblendedCost · Excludes Credit & Refund record types" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: r.map((d) => {
        const p = Number(d.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: d.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            d.changePercent !== null && d.changePercent !== void 0 && /* @__PURE__ */ t(S, { tone: p > 0 ? "warning" : "success", children: [
              p > 0 ? "+" : "",
              d.changePercent,
              "% (",
              p > 0 ? "+" : "",
              B(d.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: B(d.cost) })
          ] })
        ] }, d.service);
      }) }),
      !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ e(k, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: n.map((d) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: d.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: B(d.cost) })
      ] }, d.service)) }),
      !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function ze({ data: r, persona: n, onAsk: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(S, { children: [
          "Demo mode · as of ",
          r.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: n })
        ] })
      ] }),
      /* @__PURE__ */ e(O, { onClick: s, children: "✦ Explain demo dataset" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]", children: [
      /* @__PURE__ */ e(Y, { label: "Month to date", value: L(r.mtdSpend), accent: !0 }),
      /* @__PURE__ */ e(Y, { label: "Forecast", value: L(r.forecast) }),
      /* @__PURE__ */ e(Y, { label: "Previous equivalent", value: L(r.previousEquivalent) }),
      /* @__PURE__ */ e(Y, { label: "Cost change", value: `${r.costChangePercent > 0 ? "+" : ""}${r.costChangePercent}%` }),
      /* @__PURE__ */ e(Y, { label: "Optimization opportunity", value: L(r.optimizationOpportunity) }),
      /* @__PURE__ */ e(Y, { label: "FinOps score", value: "Insufficient data" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t(f, { children: [
        /* @__PURE__ */ e(k, { children: "Major cost drivers" }),
        /* @__PURE__ */ e("div", { className: "mt-4 space-y-3", children: r.drivers.map((i) => /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ e("span", { children: i.service }),
            /* @__PURE__ */ t("span", { className: "font-medium", children: [
              L(i.cost),
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
      /* @__PURE__ */ t(f, { children: [
        /* @__PURE__ */ e(k, { children: "Recent anomalies" }),
        /* @__PURE__ */ e("div", { className: "mt-3 divide-y divide-border", children: r.anomalies.map((i) => /* @__PURE__ */ t("div", { className: "py-3 flex gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-amber-500", "aria-hidden": !0, children: "△" }),
          /* @__PURE__ */ t("div", { className: "flex-1", children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium", children: [
              i.service,
              " · ",
              L(i.impact)
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
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ e(k, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: r.finopsScoreReason })
    ] })
  ] });
}
function Ee({
  items: r,
  title: n,
  demo: s,
  onSwitchToDemo: i,
  onRefresh: d,
  refreshing: p
}) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-4", children: r.length > 0 ? /* @__PURE__ */ e("div", { className: "grid gap-3", children: r.map((o) => /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/10 text-emerald-600 h-fit", children: "↘" }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ e(k, { children: o.what }),
        /* @__PURE__ */ e(S, { children: o.service }),
        /* @__PURE__ */ e(S, { tone: o.status === "verified" ? "success" : o.status === "approved" ? "info" : "default", children: o.status })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: o.why }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-4 gap-3 mt-4 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Potential saving" }),
          /* @__PURE__ */ t("b", { children: [
            L(o.estimatedSaving),
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
          /* @__PURE__ */ e(S, { tone: ge(o.confidence), children: o.confidence })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
          /* @__PURE__ */ e(S, { tone: ge(o.risk), children: o.risk })
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
  ] }) }, o.id)) }) : s ? /* @__PURE__ */ e(je, { title: `No ${n.toLowerCase()} records`, description: "Demo mode contains sample records." }) : /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "text-center py-8 max-w-lg mx-auto", children: [
    /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold", children: "✓" }),
    /* @__PURE__ */ t("h3", { className: "text-base font-semibold text-foreground", children: [
      "0 Active ",
      n,
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
      /* @__PURE__ */ e(O, { onClick: i, children: "✦ Switch to Demo Mode to Explore Workflow" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: d,
          disabled: p,
          className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
          children: p ? "Scanning AWS…" : "↻ Re-scan AWS Telemetry"
        }
      )
    ] })
  ] }) }) });
}
function Le({ runs: r, recommendations: n, onRefresh: s }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: "Immutable Evidence & Audit Trail" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted", children: "Durable SQLite runs, SHA-256 provenance hashes, and lifecycle state" })
      ] }),
      /* @__PURE__ */ e(O, { onClick: s, children: "Refresh audit log" })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ t(k, { children: [
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
            /* @__PURE__ */ e(S, { tone: "success", children: "Verified" }),
            /* @__PURE__ */ e("div", { className: "text-muted mt-1", children: i.timestamp })
          ] })
        ] }, i.id)),
        !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ t(k, { children: [
        "Recommendation Decision Lifecycle (",
        n.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Identified → Reviewed → Approved → Implemented → Verified" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border text-xs", children: [
        n.map((i) => /* @__PURE__ */ t("div", { className: "py-2.5 flex items-center justify-between gap-2", children: [
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
          /* @__PURE__ */ e(S, { tone: i.status === "verified" ? "success" : i.status === "approved" ? "info" : "default", children: i.status })
        ] }, i.id)),
        !n.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-2", children: "No recommendations currently stored." })
      ] })
    ] })
  ] });
}
function Ie({
  data: r,
  profilesData: n,
  policiesData: s,
  onSwitchProfile: i,
  onRefreshLive: d,
  refreshing: p
}) {
  var _, K, X, y, D, ee, se;
  const [o, g] = m((n == null ? void 0 : n.activeProfile) || "default"), [c, x] = m((n == null ? void 0 : n.activeRegion) || "us-east-1"), [h, b] = m(""), [N, P] = m("full"), [w, T] = m(!1), [H, A] = m(!1), [M, $] = m(!1), [G, U] = m(null);
  me(() => {
    n != null && n.activeProfile && g(n.activeProfile), n != null && n.activeRegion && x(n.activeRegion);
  }, [n]);
  const Z = async () => {
    const l = (h.trim() || c).trim();
    $(!0), U(null);
    try {
      await i(o, l), U(`Scope applied: profile "${o}" in region "${l}"`), setTimeout(() => U(null), 4e3);
    } finally {
      $(!1);
    }
  }, C = ((_ = s == null ? void 0 : s.policies) == null ? void 0 : _.find((l) => l.id === N)) || ((K = s == null ? void 0 : s.policies) == null ? void 0 : K[0]), J = () => {
    var l;
    C != null && C.policyJson && ((l = navigator.clipboard) == null || l.writeText(C.policyJson), T(!0), setTimeout(() => T(!1), 2500));
  }, R = () => {
    var re;
    const l = (h.trim() || c).trim(), te = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${o} --region ${l}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${o}`;
    (re = navigator.clipboard) == null || re.writeText(te), A(!0), setTimeout(() => A(!1), 2500);
  }, v = (n == null ? void 0 : n.callerIdentity) || (r == null ? void 0 : r.callerIdentity), ue = (X = n == null ? void 0 : n.profiles) != null && X.length ? n.profiles : ["default"], Q = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], j = (y = r == null ? void 0 : r.checks) == null ? void 0 : y.find((l) => l.name.includes("Cost Optimization Hub")), F = (D = r == null ? void 0 : r.checks) == null ? void 0 : D.find((l) => l.name.includes("Compute Optimizer"));
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(k, { children: "AWS Profile & Scope Management" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Select which local AWS profile and target region to query. Works with AWS Control Tower, IAM Identity Center (SSO), and named CLI profiles." })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: `w-2.5 h-2.5 rounded-full ${v != null && v.verified ? "bg-emerald-500" : "bg-amber-500"}` }),
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: v != null && v.verified ? "STS Verified" : "Unauthenticated" })
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
                onChange: (l) => g(l.target.value),
                className: "flex-1 bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                children: ue.map((l) => /* @__PURE__ */ t("option", { value: l, children: [
                  l,
                  " ",
                  l === (n == null ? void 0 : n.activeProfile) ? "(active)" : ""
                ] }, l))
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
                  value: Q.some((l) => l.id === c) ? c : "custom",
                  onChange: (l) => {
                    l.target.value !== "custom" && (x(l.target.value), b(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    Q.map((l) => /* @__PURE__ */ e("option", { value: l.id, children: l.label }, l.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: h || (Q.some((l) => l.id === c) ? "" : c),
                  onChange: (l) => b(l.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(O, { onClick: Z, disabled: M, children: M ? "Applying Scope…" : "Switch & Verify Profile" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: d,
                disabled: p,
                className: "px-3 py-2 rounded-lg border border-border text-xs font-medium hover:bg-surface-muted text-foreground transition-colors",
                children: p ? "Refreshing…" : "↻ Test Connection & Ingest"
              }
            )
          ] }),
          G && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { children: "✓" }),
            /* @__PURE__ */ e("span", { children: G })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-surface-muted/40 border border-border flex flex-col justify-between", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] uppercase font-bold tracking-wider text-muted", children: "Caller Identity Provenance" }),
              /* @__PURE__ */ e(S, { tone: v != null && v.verified ? "success" : "default", children: v != null && v.verified ? "Active & Verified" : "Pending Verification" })
            ] }),
            /* @__PURE__ */ t("div", { className: "space-y-2 mt-3 font-mono text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Account:" }),
                /* @__PURE__ */ e("span", { className: "font-semibold text-foreground", children: (v == null ? void 0 : v.accountMasked) || "unknown" })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Profile:" }),
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (n == null ? void 0 : n.activeProfile) || o })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (n == null ? void 0 : n.activeRegion) || c })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: [
                /* @__PURE__ */ e("span", { className: "text-muted block mb-1", children: "IAM ARN:" }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-foreground/90 break-all select-all", children: (v == null ? void 0 : v.arn) || "None (verify credentials)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "text-[11px] text-muted mt-3 pt-3 border-t border-border/60", children: "Zero mutations: AWS FinOps Studio runs 100% read-only operations via STS and Cost APIs." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(k, { children: "IAM Least-Privilege Policy Helper" }),
            /* @__PURE__ */ e(S, { tone: "success", children: "Read-Only Guardrails" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1", children: [
            "Exact IAM policy definitions for AWS profile ",
            /* @__PURE__ */ e("code", { className: "font-mono text-accent", children: o }),
            ". Ready for 1-click copy-paste into the AWS IAM Console."
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(O, { onClick: J, children: w ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (ee = s == null ? void 0 : s.policies) == null ? void 0 : ee.map((l) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => P(l.id),
          className: `p-3 rounded-xl border text-left transition-all ${N === l.id ? "border-accent bg-accent/10 shadow-sm" : "border-border bg-surface hover:border-border/80"}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted", children: l.tier }),
              l.recommended && /* @__PURE__ */ e("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400", children: "Recommended" })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-foreground truncate", children: l.title }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted mt-1", children: [
              l.actionCount,
              " IAM Actions"
            ] })
          ]
        },
        l.id
      )) }),
      C && /* @__PURE__ */ t("div", { className: "mt-4 p-4 rounded-xl bg-surface-muted/30 border border-border space-y-4", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { children: C.title }),
              /* @__PURE__ */ e(S, { tone: C.recommended ? "success" : "default", children: C.file })
            ] }),
            /* @__PURE__ */ t("span", { className: "text-xs text-muted font-mono", children: [
              C.actionCount,
              " read-only permissions"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1.5 leading-relaxed", children: C.summary })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] uppercase font-bold text-muted mb-2", children: "Capabilities Unlocked:" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: C.services.map((l) => /* @__PURE__ */ t("span", { className: "px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-mono text-foreground/80", children: [
            "✓ ",
            l
          ] }, l)) })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3 rounded-lg bg-surface border border-border text-xs space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "font-semibold text-foreground flex items-center gap-1.5", children: /* @__PURE__ */ e("span", { children: "⚙️ Service Enrollment & Free Tier Status" }) }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: R,
                className: "text-accent hover:underline text-[11px] font-medium",
                children: H ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "grid md:grid-cols-2 gap-2 text-[11px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: j != null && j.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: j != null && j.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Cost Optimization Hub (100% Free)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (j == null ? void 0 : j.detail) || "Opt-in required for automated rightsizing" })
              ] })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 p-2 rounded bg-surface-muted/50 border border-border/60", children: [
              /* @__PURE__ */ e("span", { className: F != null && F.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold", children: F != null && F.ok ? "✓" : "○" }),
              /* @__PURE__ */ t("div", { children: [
                /* @__PURE__ */ e("div", { className: "font-semibold", children: "Compute Optimizer (100% Free Standard Tier)" }),
                /* @__PURE__ */ e("div", { className: "text-muted", children: (F == null ? void 0 : F.detail) || "Opt-in required for EC2 & EBS rightsizing" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-bold uppercase tracking-wider text-muted", children: [
              "JSON Policy Definition (",
              C.file,
              ")"
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: J,
                className: "text-accent hover:underline text-xs font-medium flex items-center gap-1",
                children: /* @__PURE__ */ e("span", { children: w ? "✓ Copied to clipboard" : "📋 Copy JSON" })
              }
            )
          ] }),
          /* @__PURE__ */ e("pre", { className: "p-3.5 rounded-xl bg-surface-muted/80 border border-border text-[11px] font-mono text-foreground overflow-x-auto max-h-64 leading-relaxed select-all", children: C.policyJson })
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
            onClick: d,
            disabled: p,
            className: "text-accent hover:underline text-xs font-medium",
            children: p ? "Probing…" : "↻ Re-run Health Probes"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (se = r == null ? void 0 : r.checks) == null ? void 0 : se.map((l) => /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ e("div", { className: `mt-0.5 text-sm ${l.ok ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}`, children: l.ok ? "✓" : "○" }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ e(k, { children: l.name }),
            /* @__PURE__ */ e(S, { tone: l.ok ? "success" : "default", children: l.ok ? "Passing" : "Action Required" })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1 leading-relaxed", children: l.detail })
        ] })
      ] }) }, l.name)) })
    ] })
  ] });
}
function He({ onAsk: r }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(f, { children: [
    /* @__PURE__ */ e(k, { children: "Ask an evidence-backed question" }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: "The FinOps Agent uses live, read-only AWS tools and deterministic arithmetic." }),
    /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-2 mt-4", children: [
      "Why did my AWS bill increase this month?",
      "What are my top 10 cost drivers?",
      "Are credits or refunds making my net cost look like zero?",
      "Where am I wasting money?",
      "Compare this month against last month.",
      "Find my highest-confidence optimization opportunities."
    ].map((s) => /* @__PURE__ */ e("button", { className: "text-left p-3 rounded-lg border border-border hover:border-accent text-sm transition-colors", onClick: () => r(s), children: s }, s)) })
  ] }) });
}
function Ue({
  config: r,
  onUpdate: n,
  onTriggerSweep: s,
  runningSweep: i,
  sweepResult: d
}) {
  var C, J;
  const [p, o] = m((r == null ? void 0 : r.enabled) || !1), [g, c] = m((r == null ? void 0 : r.frequency) || "daily"), [x, h] = m((r == null ? void 0 : r.thresholdDollars) || "10.00"), [b, N] = m((r == null ? void 0 : r.thresholdPercent) || "15.0"), [P, w] = m(!1), [T, H] = m(null), [A, M] = m(!1);
  me(() => {
    r && (o(r.enabled), c(r.frequency), h(r.thresholdDollars), N(r.thresholdPercent));
  }, [r]);
  const $ = async (R) => {
    w(!0), H(null);
    try {
      const v = R !== void 0 ? R : p;
      await n({
        enabled: v,
        frequency: g,
        thresholdDollars: x,
        thresholdPercent: b
      }), H(v ? "Schedule active & configured" : "Schedule paused"), setTimeout(() => H(null), 3e3);
    } finally {
      w(!1);
    }
  }, G = () => {
    const R = !p;
    o(R), $(R);
  }, U = g === "daily" ? ((C = r == null ? void 0 : r.cliCommands) == null ? void 0 : C.daily) || 'kirocrew cron add "aws-finops-daily" "Run daily AWS cost and anomaly pulse." --cron "0 8 * * *" --agent finops-agent' : ((J = r == null ? void 0 : r.cliCommands) == null ? void 0 : J.weekly) || 'kirocrew cron add "aws-finops-weekly" "Run weekly executive FinOps digest." --cron "0 9 * * 1" --agent finops-agent', Z = () => {
    var R;
    (R = navigator.clipboard) == null || R.writeText(U), M(!0), setTimeout(() => M(!1), 2500);
  };
  return /* @__PURE__ */ t(f, { children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(k, { children: "Automated Health & Anomaly Schedules" }),
          /* @__PURE__ */ e(S, { tone: p ? "success" : "default", children: p ? "Active · Scheduled" : "Paused / Off" })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Configure automated recurring sweeps to monitor cost trajectory, detect spikes, and generate audit-ready pulses." })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: G,
          disabled: P,
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
                onClick: () => c("daily"),
                className: `p-3 rounded-xl border text-left transition-all ${g === "daily" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
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
                onClick: () => c("weekly"),
                className: `p-3 rounded-xl border text-left transition-all ${g === "weekly" ? "border-accent bg-accent/10 text-accent font-medium" : "border-border bg-surface-muted/30 text-muted hover:border-border/80"}`,
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
                  value: x,
                  onChange: (R) => h(R.target.value),
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
                  value: b,
                  onChange: (R) => N(R.target.value),
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
          /* @__PURE__ */ e(O, { onClick: () => $(), disabled: P, children: P ? "Saving…" : "Save Schedule Settings" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: s,
              disabled: i,
              className: "px-3 py-2 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors flex items-center gap-1.5",
              children: /* @__PURE__ */ e("span", { children: i ? "Scanning Telemetry…" : "⚡ Test Sweep Now" })
            }
          )
        ] }),
        T && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "✓" }),
          /* @__PURE__ */ e("span", { children: T })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/40 border border-border", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs font-semibold mb-2", children: [
            /* @__PURE__ */ e("span", { children: "Latest Sweep Status" }),
            r != null && r.lastStatus ? /* @__PURE__ */ e(S, { tone: r.lastStatus === "clean" ? "success" : "alert", children: r.lastStatus === "clean" ? "Normal Baseline" : "Threshold Exceeded" }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-muted", children: "No runs yet" })
          ] }),
          r != null && r.lastRun ? /* @__PURE__ */ t("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ t("div", { className: "text-muted text-[11px] font-mono", children: [
              "Last Run: ",
              r.lastRun
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-foreground mt-1 leading-relaxed", children: r.lastSummary })
          ] }) : /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "Run an immediate test sweep or enable recurring schedules to record telemetry checkpoints in SQLite." }),
          d && /* @__PURE__ */ t("div", { className: "mt-3 pt-3 border-t border-border/80 text-xs space-y-1", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold flex items-center gap-1.5 text-foreground", children: [
              /* @__PURE__ */ e("span", { children: d.isAlert ? "⚠️" : "✓" }),
              /* @__PURE__ */ t("span", { children: [
                "Test Sweep Result: ",
                d.isAlert ? "Threshold Flagged" : "Clean Baseline"
              ] })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-muted text-[11px] leading-relaxed", children: d.summary })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/60 border border-border space-y-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-foreground", children: "CLI Command Helper" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: Z,
                className: "text-accent hover:underline text-xs font-medium",
                children: A ? "✓ Copied" : "📋 Copy Command"
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
function qe({
  scheduleConfig: r,
  onUpdateSchedule: n,
  onTriggerSweep: s,
  runningSweep: i,
  sweepResult: d,
  demo: p,
  anomalies: o,
  onAsk: g
}) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ e(
      Ue,
      {
        config: r,
        onUpdate: n,
        onTriggerSweep: s,
        runningSweep: i,
        sweepResult: d
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
            onClick: () => g("Analyze current cost anomalies and verify if any service exceeded variance thresholds."),
            className: "px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors",
            children: "💬 Deep Anomaly Analysis in Agent"
          }
        )
      ] }),
      p ? /* @__PURE__ */ e("div", { className: "space-y-3", children: o.map((c) => /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(k, { children: c.service }),
          /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: c.summary })
        ] }),
        /* @__PURE__ */ t("div", { className: "text-right", children: [
          /* @__PURE__ */ e("b", { children: L(c.impact) }),
          /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
            "estimated impact · ",
            c.date
          ] })
        ] })
      ] }) }, c.date + c.service)) }) : /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "py-6 text-center max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold", children: "✓" }),
        /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "0 Active AWS Cost Anomalies" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "AWS Cost Anomaly Detection has reported no severe unexpected spikes for this account scope. Recurring background sweeps will monitor telemetry as workloads run." })
      ] }) })
    ] })
  ] });
}
function Be({ items: r }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(f, { children: [
    /* @__PURE__ */ e(k, { children: "Demo service breakdown" }),
    /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: r.map((n) => /* @__PURE__ */ t("div", { className: "py-3 grid grid-cols-3", children: [
      /* @__PURE__ */ e("b", { children: n.service }),
      /* @__PURE__ */ e("span", { children: L(n.cost) }),
      /* @__PURE__ */ t("span", { className: (n.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
        (n.changePercent || 0) > 0 ? "+" : "",
        n.changePercent,
        "%"
      ] })
    ] }, n.service)) }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-4", children: "Synthetic values shown only because Demo mode is enabled." })
  ] }) });
}
function oe({ title: r, text: n, action: s }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(de, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: r }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: n }),
    /* @__PURE__ */ e(O, { onClick: s, children: "Open FinOps Agent" })
  ] }) }) });
}
function Ne(r) {
  return r.split(/(\*\*.*?\*\*|`.*?`)/g).map((s, i) => s.startsWith("**") && s.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: s.slice(2, -2) }, i) : s.startsWith("`") && s.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: s.slice(1, -1) }, i) : s);
}
function Ve({ content: r }) {
  const n = r.split(`
`), s = [];
  let i = [], d = !1;
  const p = (g, c) => {
    if (!g.length) return null;
    const x = g[0], h = g.slice(g.length > 1 && g[1].every((b) => b.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: x.map((b, N) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: b.trim() }, N)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: h.map((b, N) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: b.map((P, w) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: P.trim() }, w)) }, N)) })
    ] }) }, `table-${c}`);
  }, o = () => {
    d && i.length && (s.push(p(i, s.length)), i = [], d = !1);
  };
  return n.forEach((g, c) => {
    const x = g.trim();
    if (x.startsWith("|") && x.endsWith("|")) {
      d = !0;
      const h = x.split("|").slice(1, -1);
      i.push(h);
      return;
    } else
      o();
    x ? x.startsWith("# ") ? s.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: x.slice(2) }, c)) : x.startsWith("## ") ? s.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: x.slice(3) }, c)) : x.startsWith("### ") ? s.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: x.slice(4) }, c)) : x === "---" ? s.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, c)) : x.startsWith("- ") || x.startsWith("* ") ? s.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: Ne(x.slice(2)) })
      ] }, c)
    ) : s.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: Ne(x) }, c)
    ) : s.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${c}`));
  }), o(), /* @__PURE__ */ e("div", { className: "space-y-1", children: s });
}
function Ge({
  reports: r,
  selectedReport: n,
  onSelectReport: s,
  onGenerate: i,
  generating: d,
  onAskAgent: p,
  onOpenSchedules: o
}) {
  const [g, c] = m(!1), x = (h) => {
    var b;
    (b = navigator.clipboard) == null || b.writeText(h), c(!0), setTimeout(() => c(!1), 2e3);
  };
  return n ? /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
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
        /* @__PURE__ */ e(S, { tone: n.type === "executive" ? "success" : "info", children: n.type })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              const h = new Blob([n.contentMarkdown], { type: "text/markdown" }), b = URL.createObjectURL(h), N = document.createElement("a");
              N.href = b, N.download = `report_${n.id}.md`, N.click();
            },
            className: "text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg border border-border bg-surface",
            children: "↓ Download MD"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              const b = n.contentMarkdown.split(`
`).map((T) => `"${T.replace(/"/g, '""')}"`).join(`
`), N = new Blob([b], { type: "text/csv" }), P = URL.createObjectURL(N), w = document.createElement("a");
              w.href = P, w.download = `report_${n.id}.csv`, w.click();
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
        /* @__PURE__ */ e(O, { onClick: () => x(n.contentMarkdown), children: g ? "✓ Copied" : "Copy Report Markdown" })
      ] })
    ] }),
    n.type === "backlog" && (n.contentMarkdown.includes("Identified Opportunities: 0") || n.contentMarkdown.includes("0 active optimization opportunities")) && /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-emerald-500 font-bold text-base", children: "✓" }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: "Live Optimization Scan Complete: 0 Waste Opportunities Detected" }),
        /* @__PURE__ */ e("div", { className: "text-muted mt-0.5", children: "AWS Cost Optimization Hub & Compute Optimizer verified 0 oversized instances or idle resources. This represents an audited clean baseline, not a failed or stuck process. See section 2 below for diagnostic details." })
      ] })
    ] }),
    /* @__PURE__ */ t(f, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(k, { children: n.title }),
        /* @__PURE__ */ t("div", { className: "text-xs text-muted mt-1 font-mono", children: [
          "Scope: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: n.scope }),
          " · Created: ",
          n.createdAt
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "p-4 rounded-xl bg-surface-muted/30 border border-border", children: /* @__PURE__ */ e(Ve, { content: n.contentMarkdown }) })
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-muted/50 border border-border", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground", children: "FinOps Reports & Executive Archive" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-0.5", children: "Durable, audit-ready reports compiled from live AWS billing telemetry and optimization pipelines." })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ e(O, { onClick: () => i("executive"), disabled: !!d, children: d === "executive" ? "Generating Executive Report…" : "✦ Generate Executive Report" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => i("backlog"),
            disabled: !!d,
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-surface text-foreground transition-colors",
            children: d === "backlog" ? "Generating Backlog…" : "↘ Generate Backlog Report"
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
          r.length,
          ")"
        ] }),
        /* @__PURE__ */ e("span", { className: "text-xs text-muted", children: "Persisted in local SQLite database" })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid gap-3", children: [
        r.map((h) => /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[280px]", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(S, { tone: h.type === "executive" ? "success" : "info", children: h.type }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-foreground", children: h.title })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-2", children: h.summary }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-muted font-mono mt-3", children: [
              "Scope: ",
              /* @__PURE__ */ e("strong", { className: "text-foreground", children: h.scope }),
              " · Generated: ",
              h.createdAt
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 self-center", children: [
            /* @__PURE__ */ e(O, { onClick: () => s(h), children: "Read Report" }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => x(h.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, h.id)),
        !r.length && /* @__PURE__ */ e(f, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(de, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "No Reports Generated Yet" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-muted max-w-sm mx-auto mt-1 mb-4", children: "Generate your first monthly executive report or optimization backlog from live AWS billing telemetry." }),
          /* @__PURE__ */ e(O, { onClick: () => i("executive"), children: "Generate Executive Report Now" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  _e as default
};
