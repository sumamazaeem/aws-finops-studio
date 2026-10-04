import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { useState as x, useEffect as ce, useMemo as ge } from "react";
import { useAppApi as Ne, useChatLauncher as ye } from "@kirocrew/app-sdk";
import { Skeleton as de, PageHeader as we, ErrorNotice as Se, Card as b, Btn as A, Badge as N, CardTitle as y, StatCard as _, EmptyState as Ce } from "@kirocrew/app-sdk/ui";
const Ae = [
  { id: "Practitioner", label: "Practitioner", icon: "🛡️", desc: "Full query lineage, raw hashes, and FinOps evidence audit" },
  { id: "Finance", label: "Finance", icon: "💼", desc: "Pre-credit unblended costs, adjustments, credits, refunds, and net ledger" },
  { id: "Engineering", label: "Engineering", icon: "⚙️", desc: "Cost drivers, period-over-period deltas, and actionable rightsizing" },
  { id: "Leadership", label: "Leadership", icon: "📊", desc: "Executive cost trajectory, realized savings, and active optimization pipeline" }
], ke = [["Overview", "◫"], ["Cost Explorer", "▥"], ["Optimization", "↘"], ["Anomalies", "△"], ["Resources", "▤"], ["Commitments", "◇"], ["Well-Architected", "✓"], ["Ask FinOps", "✦"], ["Reports", "▧"], ["History", "◷"], ["Connection", "⚙"]], L = (s) => new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(s)), B = (s) => {
  const r = Number(s);
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(r) < 5e-3 ? 0 : r);
}, ue = (s) => s === "high" ? "success" : s === "medium" ? "warning" : "default";
function ie({ className: s = "w-6 h-6" }) {
  return /* @__PURE__ */ t("svg", { className: s, viewBox: "0 0 44 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M22 1.15L3.5 12.05L22 22.34L40.5 12.05L22 1.15Z", fill: "#00E5A3" }),
    /* @__PURE__ */ e("path", { d: "M18.8 47.66L0.5 37.36V16.71L18.8 27.01V47.66Z", fill: "#00C693" }),
    /* @__PURE__ */ e("path", { d: "M25.2 47.66L43.5 37.36V16.71L25.2 27.01V47.66Z", fill: "#00966F" })
  ] });
}
function Ve() {
  const s = Ne(), { openChat: r } = ye(), [n, i] = x("Overview"), [l, u] = x(() => {
    try {
      return localStorage.getItem("aws-finops-studio:demo") === "true";
    } catch {
      return !1;
    }
  }), [o, v] = x("Practitioner"), [c, p] = x(null), [f, S] = x([]), [O, M] = x([]), [P, H] = x(null), [q, C] = x(""), [W, F] = x(!1), [G, $] = x([]), [Q, g] = x(null), [U, w] = x(null), [m, se] = x(null), [Y, j] = x(null), [R, Z] = x(null), [X, D] = x(!1), [ee, te] = x(null), K = () => {
    p(null), C("");
    const a = "/apps/aws-finops-studio/api", h = l ? "demo" : "live";
    Promise.all([
      s.get(`${a}/overview?mode=${h}`),
      s.get(`${a}/recommendations?mode=${h}`),
      s.get(`${a}/evidence`),
      s.get(`${a}/reports`),
      s.get(`${a}/diagnostics`),
      s.get(`${a}/profiles`),
      s.get(`${a}/policies`),
      s.get(`${a}/schedules`)
    ]).then(([k, ne, J, E, me, le, I, ve]) => {
      p(k), S(ne.items), M((J == null ? void 0 : J.runs) || []), $((E == null ? void 0 : E.items) || []), H(me), se(le), j(I), Z(ve);
    }).catch((k) => C(k.message || "Unable to load FinOps data"));
  }, re = async (a) => {
    try {
      const h = await s.post("/apps/aws-finops-studio/api/schedules", a);
      h != null && h.schedule && Z(h.schedule);
      const k = (h == null ? void 0 : h.schedule) || { ...R, ...a }, ne = (m == null ? void 0 : m.activeProfile) || "default", J = k.frequency || "daily", E = await s.get("/api/crons"), le = (E != null && E.jobs ? E.jobs : Array.isArray(E) ? E : []).filter((I) => I.name === "aws-finops-daily" || I.name === "aws-finops-weekly");
      for (const I of le)
        I.id && await s.delete(`/api/crons/${I.id}`);
      if (k.enabled) {
        const I = J === "daily" ? `Run daily AWS cost and anomaly pulse for profile ${ne}. Check for service cost spikes >$${k.thresholdDollars} or >${k.thresholdPercent}%. Keep report concise and evidence-backed.` : `Run weekly executive FinOps digest and optimization backlog audit for profile ${ne}. Summarize MTD spend, top service deltas, and rightsizing opportunities.`;
        await s.post("/api/crons", {
          name: J === "daily" ? "aws-finops-daily" : "aws-finops-weekly",
          message: I,
          cron: J === "daily" ? "0 8 * * *" : "0 9 * * 1",
          agent: "finops-agent"
        });
      }
    } catch (h) {
      C(h.message || "Failed to update schedule");
    }
  }, d = async () => {
    D(!0), te(null), C("");
    try {
      const a = await s.post("/apps/aws-finops-studio/api/schedules", { action: "trigger" });
      te(a), a != null && a.schedule && Z(a.schedule);
      const h = await s.get("/apps/aws-finops-studio/api/reports");
      h != null && h.items && $(h.items);
    } catch (a) {
      C(a.message || "Failed to run anomaly sweep");
    } finally {
      D(!1);
    }
  };
  ce(() => {
    try {
      localStorage.setItem("aws-finops-studio:demo", String(l));
    } catch {
    }
    K();
  }, [l]);
  const T = (a) => r({ agent: "finops-agent", message: a, autoSend: !0 }), V = async () => {
    F(!0), C("");
    try {
      const a = await s.post("/apps/aws-finops-studio/api/refresh-live", {});
      p(a);
      const h = await s.get("/apps/aws-finops-studio/api/evidence");
      M((h == null ? void 0 : h.runs) || []);
      const k = await s.get("/apps/aws-finops-studio/api/diagnostics");
      H(k);
    } catch (a) {
      C(a.message || "Unable to load live AWS data");
    } finally {
      F(!1);
    }
  }, oe = async (a, h) => {
    C(""), F(!0);
    try {
      const k = await s.post("/apps/aws-finops-studio/api/profiles", { profile: a, region: h });
      se(k), K();
    } catch (k) {
      C(k.message || "Failed to switch AWS profile");
    } finally {
      F(!1);
    }
  }, fe = async (a) => {
    w(a), C("");
    try {
      const h = await s.post("/apps/aws-finops-studio/api/reports", { type: a, mode: l ? "demo" : "live" });
      h != null && h.items && $(h.items), h != null && h.report && g(h.report);
    } catch (h) {
      C(h.message || "Failed to generate report");
    } finally {
      w(null);
    }
  }, be = ge(() => c ? n === "Overview" ? c.mode === "live" ? /* @__PURE__ */ e(Pe, { data: c, persona: o, onAsk: T, onRefresh: V, refreshing: W }) : /* @__PURE__ */ e(Oe, { data: c, persona: o, onAsk: () => T("Explain the current AWS FinOps overview. Separate observed facts, inferences, and recommendations, and use deterministic calculations.") }) : n === "Optimization" || n === "Resources" ? /* @__PURE__ */ e(
    We,
    {
      items: f,
      title: n,
      demo: l,
      onSwitchToDemo: () => u(!0),
      onRefresh: V,
      refreshing: W
    }
  ) : n === "History" ? /* @__PURE__ */ e(je, { runs: O, recommendations: f, onRefresh: K }) : n === "Connection" ? /* @__PURE__ */ e(
    Me,
    {
      data: P,
      profilesData: m,
      policiesData: Y,
      onSwitchProfile: oe,
      onRefreshLive: V,
      refreshing: W
    }
  ) : n === "Ask FinOps" ? /* @__PURE__ */ e(Fe, { onAsk: T }) : n === "Anomalies" ? /* @__PURE__ */ e(
    Te,
    {
      scheduleConfig: R,
      onUpdateSchedule: re,
      onTriggerSweep: d,
      runningSweep: X,
      sweepResult: ee,
      demo: l,
      anomalies: c.anomalies,
      onAsk: T
    }
  ) : n === "Cost Explorer" ? c.mode === "demo" ? /* @__PURE__ */ e(ze, { items: c.drivers }) : c.dataAvailable ? /* @__PURE__ */ e(Re, { drivers: c.drivers, previous: c.previousDrivers || [], onRefresh: V, refreshing: W }) : /* @__PURE__ */ e(xe, { onRefresh: V, refreshing: W }) : n === "Commitments" ? /* @__PURE__ */ e(ae, { title: "Commitment intelligence", text: "Connect AWS to load Savings Plans and Reserved Instance coverage, utilization, and purchase recommendations. Purchases are never executed.", action: () => T("Analyze Savings Plans and Reserved Instance coverage and utilization. Read-only; do not purchase anything.") }) : n === "Well-Architected" ? /* @__PURE__ */ e(ae, { title: "Cost Optimization review", text: "Run an evidence-backed Cost Optimization pillar review using current AWS Well-Architected guidance.", action: () => T("Run a read-only AWS Well-Architected Cost Optimization review. Identify missing evidence explicitly.") }) : n === "Reports" ? /* @__PURE__ */ e(
    Le,
    {
      reports: G,
      selectedReport: Q,
      onSelectReport: g,
      onGenerate: fe,
      generating: U,
      onAskAgent: () => T("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly."),
      onOpenSchedules: () => i("Anomalies")
    }
  ) : /* @__PURE__ */ e(ae, { title: "FinOps reports", text: "Generate weekly, monthly, executive, or optimization-backlog reports from live evidence.", action: () => T("Use live AWS data only. Generate a monthly executive FinOps report from available evidence and identify missing evidence explicitly.") }) : /* @__PURE__ */ t("div", { className: "p-6 grid gap-4 grid-cols-3", children: [
    /* @__PURE__ */ e(de, {}),
    /* @__PURE__ */ e(de, {}),
    /* @__PURE__ */ e(de, {})
  ] }), [n, c, f, O, G, Q, U, P, m, Y, l, o, W, R, X, ee]), z = (c == null ? void 0 : c.callerIdentity) || (P == null ? void 0 : P.callerIdentity);
  return /* @__PURE__ */ t("div", { className: "h-full min-h-0 flex bg-surface text-foreground", children: [
    /* @__PURE__ */ t("aside", { className: "w-64 shrink-0 border-r border-border bg-surface-muted/40 p-3 overflow-y-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("div", { className: "p-3 mb-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 font-semibold", children: [
            /* @__PURE__ */ e("div", { className: "p-1.5 rounded-xl bg-surface border border-border shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(ie, { className: "w-5 h-5" }) }),
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
              onChange: (a) => oe(a.target.value, m.activeRegion),
              className: "w-full bg-surface border border-border rounded px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
              children: m.profiles.map((a) => /* @__PURE__ */ t("option", { value: a, children: [
                "Profile: ",
                a
              ] }, a))
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
        /* @__PURE__ */ e("nav", { className: "space-y-1", children: ke.map(([a, h]) => /* @__PURE__ */ t("button", { onClick: () => i(a), className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${n === a ? "bg-accent/15 text-accent font-medium" : "text-muted hover:bg-surface-muted"}`, children: [
          /* @__PURE__ */ e("span", { className: "w-4 text-center", "aria-hidden": !0, children: h }),
          a
        ] }, a)) })
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
                  onClick: (a) => {
                    a.stopPropagation(), u(!l);
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
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border", children: Ae.map((a) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => v(a.id),
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
      q && /* @__PURE__ */ e("div", { className: "px-6 mt-4", children: /* @__PURE__ */ e(Se, { message: q }) }),
      be
    ] })
  ] });
}
function he({ title: s, data: r, persona: n }) {
  const i = Math.abs(Number(r.credits)), l = Number(r.costBeforeCredits), u = l > 0 ? (i / l * 100).toFixed(1) : "0.0";
  return /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e(y, { children: s }),
        /* @__PURE__ */ t("p", { className: "text-xs text-muted mt-1 font-mono", children: [
          r.start,
          " → ",
          r.end,
          " · End exclusive",
          r.estimated ? " · estimated" : ""
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
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: B(r.costBeforeCredits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Credits Applied" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: B(r.credits) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Refunds" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1 text-emerald-600", children: B(r.refunds) })
      ] }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Net Billed (After Adjustments)" }),
        /* @__PURE__ */ e("div", { className: "text-xl font-semibold mt-1", children: B(r.netCost) })
      ] })
    ] }),
    (n === "Practitioner" || n === "Finance") && /* @__PURE__ */ t("details", { className: "mt-4 text-xs text-muted", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer hover:text-foreground", children: "Record-type breakdown & raw ledger" }),
      /* @__PURE__ */ e("pre", { className: "mt-2 p-2 bg-surface-muted/50 rounded font-mono whitespace-pre-wrap", children: JSON.stringify(r.recordTypes, null, 2) })
    ] })
  ] });
}
function xe({ onRefresh: s, refreshing: r }) {
  return /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "max-w-2xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ie, { className: "w-10 h-10" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: "Load live AWS evidence" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-muted mt-2", children: [
      "Executes two fixed read-only AWS Cost Explorer queries using profile ",
      /* @__PURE__ */ e("code", { children: "default" }),
      ": one grouped by billing record type and one by service with adjustments excluded. Results are cryptographically hashed and persisted in local SQLite storage."
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(A, { onClick: s, disabled: r, children: r ? "Loading live AWS data…" : "Approve & load live AWS data" }) })
  ] }) });
}
function Pe({ data: s, persona: r, onAsk: n, onRefresh: i, refreshing: l }) {
  var v, c, p, f;
  const u = (v = s.live) == null ? void 0 : v.previousMonth, o = (c = s.live) == null ? void 0 : c.monthToDate;
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60 border border-border", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(N, { tone: "success", children: "Live AWS" }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: r }),
          " · ",
          (p = s.live) != null && p.profile ? `Profile: ${s.live.profile}` : ""
        ] })
      ] }),
      s.payloadHash && /* @__PURE__ */ t("div", { className: "text-[11px] font-mono text-muted flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { children: "SHA-256 Provenance:" }),
        /* @__PURE__ */ t("code", { className: "px-1.5 py-0.5 rounded bg-surface border border-border text-foreground font-semibold", children: [
          s.payloadHash.slice(0, 16),
          "…"
        ] })
      ] })
    ] }),
    !s.dataAvailable && /* @__PURE__ */ e(xe, { onRefresh: i, refreshing: l }),
    u && /* @__PURE__ */ e(he, { title: "Previous complete month", data: u, persona: r }),
    o && /* @__PURE__ */ e(he, { title: "Month to date", data: o, persona: r }),
    s.dataAvailable && r === "Leadership" && /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Executive Summary" }),
      /* @__PURE__ */ t("div", { className: "grid sm:grid-cols-3 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Month to Date Net Spend" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5", children: B((o == null ? void 0 : o.netCost) || "0.00") })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Active Optimization Pipeline" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-accent", children: s.optimizationOpportunity ? L(s.optimizationOpportunity) : "$0" })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Verified Realized Savings" }),
          /* @__PURE__ */ e("div", { className: "text-lg font-semibold mt-0.5 text-emerald-600", children: "$0.00 (awaiting post-cycle verification)" })
        ] })
      ] })
    ] }),
    s.dataAvailable && /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: ((f = s.live) == null ? void 0 : f.refreshedAt) && `Last refreshed: ${s.live.refreshedAt}` }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ e(A, { onClick: i, disabled: l, children: l ? "Refreshing…" : "Refresh live AWS data" }),
        /* @__PURE__ */ e(A, { onClick: () => n("Use live AWS data only with profile default. Analyze month-to-date gross usage charges versus credits and refunds using RECORD_TYPE evidence. Report cost before credits, credits, refunds, discounts, taxes, and net cost separately; preserve raw API evidence and do not use demo data."), children: "Explain credits" })
      ] })
    ] }) })
  ] });
}
function Re({ drivers: s, previous: r, onRefresh: n, refreshing: i }) {
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
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: s.map((l) => {
        const u = Number(l.costDelta || 0);
        return /* @__PURE__ */ t("div", { className: "py-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-sm", children: l.service }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 text-right", children: [
            l.changePercent !== null && l.changePercent !== void 0 && /* @__PURE__ */ t(N, { tone: u > 0 ? "warning" : "success", children: [
              u > 0 ? "+" : "",
              l.changePercent,
              "% (",
              u > 0 ? "+" : "",
              B(l.costDelta || 0),
              ")"
            ] }),
            /* @__PURE__ */ e("b", { className: "font-mono text-sm", children: B(l.cost) })
          ] })
        ] }, l.service);
      }) }),
      !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No service groups returned." })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Previous Complete Month by Service" }),
      /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: r.map((l) => /* @__PURE__ */ t("div", { className: "py-3 flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ e("span", { children: l.service }),
        /* @__PURE__ */ e("b", { className: "font-mono", children: B(l.cost) })
      ] }, l.service)) }),
      !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-3", children: "No previous services returned." })
    ] })
  ] });
}
function Oe({ data: s, persona: r, onAsk: n }) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(N, { children: [
          "Demo mode · as of ",
          s.asOf
        ] }),
        /* @__PURE__ */ t("span", { className: "text-xs text-muted", children: [
          "Lens: ",
          /* @__PURE__ */ e("strong", { children: r })
        ] })
      ] }),
      /* @__PURE__ */ e(A, { onClick: n, children: "✦ Explain demo dataset" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]", children: [
      /* @__PURE__ */ e(_, { label: "Month to date", value: L(s.mtdSpend), accent: !0 }),
      /* @__PURE__ */ e(_, { label: "Forecast", value: L(s.forecast) }),
      /* @__PURE__ */ e(_, { label: "Previous equivalent", value: L(s.previousEquivalent) }),
      /* @__PURE__ */ e(_, { label: "Cost change", value: `${s.costChangePercent > 0 ? "+" : ""}${s.costChangePercent}%` }),
      /* @__PURE__ */ e(_, { label: "Optimization opportunity", value: L(s.optimizationOpportunity) }),
      /* @__PURE__ */ e(_, { label: "FinOps score", value: "Insufficient data" })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ t(b, { children: [
        /* @__PURE__ */ e(y, { children: "Major cost drivers" }),
        /* @__PURE__ */ e("div", { className: "mt-4 space-y-3", children: s.drivers.map((i) => /* @__PURE__ */ t("div", { children: [
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
      /* @__PURE__ */ t(b, { children: [
        /* @__PURE__ */ e(y, { children: "Recent anomalies" }),
        /* @__PURE__ */ e("div", { className: "mt-3 divide-y divide-border", children: s.anomalies.map((i) => /* @__PURE__ */ t("div", { className: "py-3 flex gap-3", children: [
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
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ e(y, { children: "Demo score status" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: s.finopsScoreReason })
    ] })
  ] });
}
function We({
  items: s,
  title: r,
  demo: n,
  onSwitchToDemo: i,
  onRefresh: l,
  refreshing: u
}) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6 space-y-4", children: s.length > 0 ? /* @__PURE__ */ e("div", { className: "grid gap-3", children: s.map((o) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex gap-4", children: [
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
            L(o.estimatedSaving),
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Confidence" }),
          /* @__PURE__ */ e(N, { tone: ue(o.confidence), children: o.confidence })
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-muted", children: "Risk" }),
          /* @__PURE__ */ e(N, { tone: ue(o.risk), children: o.risk })
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
  ] }) }, o.id)) }) : n ? /* @__PURE__ */ e(Ce, { title: `No ${r.toLowerCase()} records`, description: "Demo mode contains sample records." }) : /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "text-center py-8 max-w-lg mx-auto", children: [
    /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold", children: "✓" }),
    /* @__PURE__ */ t("h3", { className: "text-base font-semibold text-foreground", children: [
      "0 Active ",
      r,
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
function je({ runs: s, recommendations: r, onRefresh: n }) {
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
        s.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Every refresh persists an immutable query record with request parameters and hash" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border", children: [
        s.map((i) => /* @__PURE__ */ t("div", { className: "py-3 flex flex-wrap items-center justify-between gap-3 text-xs", children: [
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
        !s.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-3", children: "No durable evidence runs recorded yet. Run a live refresh to generate evidence." })
      ] })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t(y, { children: [
        "Recommendation Decision Lifecycle (",
        r.length,
        ")"
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-1", children: "Identified → Reviewed → Approved → Implemented → Verified" }),
      /* @__PURE__ */ t("div", { className: "mt-4 divide-y divide-border text-xs", children: [
        r.map((i) => /* @__PURE__ */ t("div", { className: "py-2.5 flex items-center justify-between gap-2", children: [
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
        !r.length && /* @__PURE__ */ e("p", { className: "text-sm text-muted py-2", children: "No recommendations currently stored." })
      ] })
    ] })
  ] });
}
function Me({
  data: s,
  profilesData: r,
  policiesData: n,
  onSwitchProfile: i,
  onRefreshLive: l,
  refreshing: u
}) {
  var Z, X, D, ee, te, K, re;
  const [o, v] = x((r == null ? void 0 : r.activeProfile) || "default"), [c, p] = x((r == null ? void 0 : r.activeRegion) || "us-east-1"), [f, S] = x(""), [O, M] = x("full"), [P, H] = x(!1), [q, C] = x(!1), [W, F] = x(!1), [G, $] = x(null);
  ce(() => {
    r != null && r.activeProfile && v(r.activeProfile), r != null && r.activeRegion && p(r.activeRegion);
  }, [r]);
  const Q = async () => {
    const d = (f.trim() || c).trim();
    F(!0), $(null);
    try {
      await i(o, d), $(`Scope applied: profile "${o}" in region "${d}"`), setTimeout(() => $(null), 4e3);
    } finally {
      F(!1);
    }
  }, g = ((Z = n == null ? void 0 : n.policies) == null ? void 0 : Z.find((d) => d.id === O)) || ((X = n == null ? void 0 : n.policies) == null ? void 0 : X[0]), U = () => {
    var d;
    g != null && g.policyJson && ((d = navigator.clipboard) == null || d.writeText(g.policyJson), H(!0), setTimeout(() => H(!1), 2500));
  }, w = () => {
    var V;
    const d = (f.trim() || c).trim(), T = `# 1. Opt-in to AWS Cost Optimization Hub (100% Free)
aws cost-optimization-hub update-enrollment-status --status Active --profile ${o} --region ${d}

# 2. Opt-in to AWS Compute Optimizer (100% Free Standard Tier)
aws compute-optimizer update-enrollment-status --status Active --profile ${o}`;
    (V = navigator.clipboard) == null || V.writeText(T), C(!0), setTimeout(() => C(!1), 2500);
  }, m = (r == null ? void 0 : r.callerIdentity) || (s == null ? void 0 : s.callerIdentity), se = (D = r == null ? void 0 : r.profiles) != null && D.length ? r.profiles : ["default"], Y = [
    { id: "us-east-1", label: "us-east-1 (N. Virginia)" },
    { id: "us-east-2", label: "us-east-2 (Ohio)" },
    { id: "us-west-1", label: "us-west-1 (N. California)" },
    { id: "us-west-2", label: "us-west-2 (Oregon)" },
    { id: "eu-west-1", label: "eu-west-1 (Ireland)" },
    { id: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
    { id: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
    { id: "ap-northeast-1", label: "ap-northeast-1 (Tokyo)" }
  ], j = (ee = s == null ? void 0 : s.checks) == null ? void 0 : ee.find((d) => d.name.includes("Cost Optimization Hub")), R = (te = s == null ? void 0 : s.checks) == null ? void 0 : te.find((d) => d.name.includes("Compute Optimizer"));
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
                children: se.map((d) => /* @__PURE__ */ t("option", { value: d, children: [
                  d,
                  " ",
                  d === (r == null ? void 0 : r.activeProfile) ? "(active)" : ""
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
                  value: Y.some((d) => d.id === c) ? c : "custom",
                  onChange: (d) => {
                    d.target.value !== "custom" && (p(d.target.value), S(""));
                  },
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent",
                  children: [
                    Y.map((d) => /* @__PURE__ */ e("option", { value: d.id, children: d.label }, d.id)),
                    /* @__PURE__ */ e("option", { value: "custom", children: "Other / Custom Region…" })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ca-central-1",
                  value: f || (Y.some((d) => d.id === c) ? "" : c),
                  onChange: (d) => S(d.target.value),
                  className: "bg-surface-muted/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                }
              )
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-muted mt-1", children: "Cost Explorer queries use global us-east-1 billing endpoints; regional telemetry uses this target region." })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3 pt-1", children: [
            /* @__PURE__ */ e(A, { onClick: Q, disabled: W, children: W ? "Applying Scope…" : "Switch & Verify Profile" }),
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
          G && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { children: "✓" }),
            /* @__PURE__ */ e("span", { children: G })
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
                /* @__PURE__ */ e("span", { className: "text-accent font-semibold", children: (r == null ? void 0 : r.activeProfile) || o })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex justify-between py-1 border-b border-border/50", children: [
                /* @__PURE__ */ e("span", { className: "text-muted", children: "Active Region:" }),
                /* @__PURE__ */ e("span", { className: "text-foreground", children: (r == null ? void 0 : r.activeRegion) || c })
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
        /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: U, children: P ? "✓ Policy JSON Copied!" : "📋 Copy Policy JSON" }) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid sm:grid-cols-4 gap-2 mt-4", children: (K = n == null ? void 0 : n.policies) == null ? void 0 : K.map((d) => /* @__PURE__ */ t(
        "button",
        {
          onClick: () => M(d.id),
          className: `p-3 rounded-xl border text-left transition-all ${O === d.id ? "border-accent bg-accent/10 shadow-sm" : "border-border bg-surface hover:border-border/80"}`,
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
                children: q ? "✓ CLI Commands Copied" : "📋 Copy Opt-in Commands"
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
                onClick: U,
                className: "text-accent hover:underline text-xs font-medium flex items-center gap-1",
                children: /* @__PURE__ */ e("span", { children: P ? "✓ Copied to clipboard" : "📋 Copy JSON" })
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
      /* @__PURE__ */ e("div", { className: "grid md:grid-cols-2 gap-3", children: (re = s == null ? void 0 : s.checks) == null ? void 0 : re.map((d) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex gap-3 items-start", children: [
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
function Fe({ onAsk: s }) {
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
    ].map((n) => /* @__PURE__ */ e("button", { className: "text-left p-3 rounded-lg border border-border hover:border-accent text-sm transition-colors", onClick: () => s(n), children: n }, n)) })
  ] }) });
}
function $e({
  config: s,
  onUpdate: r,
  onTriggerSweep: n,
  runningSweep: i,
  sweepResult: l
}) {
  var g, U;
  const [u, o] = x((s == null ? void 0 : s.enabled) || !1), [v, c] = x((s == null ? void 0 : s.frequency) || "daily"), [p, f] = x((s == null ? void 0 : s.thresholdDollars) || "10.00"), [S, O] = x((s == null ? void 0 : s.thresholdPercent) || "15.0"), [M, P] = x(!1), [H, q] = x(null), [C, W] = x(!1);
  ce(() => {
    s && (o(s.enabled), c(s.frequency), f(s.thresholdDollars), O(s.thresholdPercent));
  }, [s]);
  const F = async (w) => {
    P(!0), q(null);
    try {
      const m = w !== void 0 ? w : u;
      await r({
        enabled: m,
        frequency: v,
        thresholdDollars: p,
        thresholdPercent: S
      }), q(m ? "Schedule active & configured" : "Schedule paused"), setTimeout(() => q(null), 3e3);
    } finally {
      P(!1);
    }
  }, G = () => {
    const w = !u;
    o(w), F(w);
  }, $ = v === "daily" ? ((g = s == null ? void 0 : s.cliCommands) == null ? void 0 : g.daily) || 'kirocrew cron add "aws-finops-daily" "Run daily AWS cost and anomaly pulse." --cron "0 8 * * *" --agent finops-agent' : ((U = s == null ? void 0 : s.cliCommands) == null ? void 0 : U.weekly) || 'kirocrew cron add "aws-finops-weekly" "Run weekly executive FinOps digest." --cron "0 9 * * 1" --agent finops-agent', Q = () => {
    var w;
    (w = navigator.clipboard) == null || w.writeText($), W(!0), setTimeout(() => W(!1), 2500);
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
          onClick: G,
          disabled: M,
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
                onClick: () => c("daily"),
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
                onClick: () => c("weekly"),
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
                  value: p,
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
                  onChange: (w) => O(w.target.value),
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
          /* @__PURE__ */ e(A, { onClick: () => F(), disabled: M, children: M ? "Saving…" : "Save Schedule Settings" }),
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
        H && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "✓" }),
          /* @__PURE__ */ e("span", { children: H })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-surface-muted/40 border border-border", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs font-semibold mb-2", children: [
            /* @__PURE__ */ e("span", { children: "Latest Sweep Status" }),
            s != null && s.lastStatus ? /* @__PURE__ */ e(N, { tone: s.lastStatus === "clean" ? "success" : "alert", children: s.lastStatus === "clean" ? "Normal Baseline" : "Threshold Exceeded" }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-muted", children: "No runs yet" })
          ] }),
          s != null && s.lastRun ? /* @__PURE__ */ t("div", { className: "space-y-1 text-xs", children: [
            /* @__PURE__ */ t("div", { className: "text-muted text-[11px] font-mono", children: [
              "Last Run: ",
              s.lastRun
            ] }),
            /* @__PURE__ */ e("p", { className: "text-xs text-foreground mt-1 leading-relaxed", children: s.lastSummary })
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
                onClick: Q,
                className: "text-accent hover:underline text-xs font-medium",
                children: C ? "✓ Copied" : "📋 Copy Command"
              }
            )
          ] }),
          /* @__PURE__ */ e("p", { className: "text-[11px] text-muted leading-relaxed", children: "This schedule is automatically synchronized with your Kiro Crew background jobs. You can also deploy it via CLI if you prefer:" }),
          /* @__PURE__ */ e("pre", { className: "p-2.5 rounded-lg bg-surface border border-border text-[11px] font-mono text-foreground overflow-x-auto whitespace-pre-wrap select-all", children: $ })
        ] })
      ] })
    ] })
  ] });
}
function Te({
  scheduleConfig: s,
  onUpdateSchedule: r,
  onTriggerSweep: n,
  runningSweep: i,
  sweepResult: l,
  demo: u,
  anomalies: o,
  onAsk: v
}) {
  return /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-6", children: [
    /* @__PURE__ */ e(
      $e,
      {
        config: s,
        onUpdate: r,
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
      u ? /* @__PURE__ */ e("div", { className: "space-y-3", children: o.map((c) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e(y, { children: c.service }),
          /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2", children: c.summary })
        ] }),
        /* @__PURE__ */ t("div", { className: "text-right", children: [
          /* @__PURE__ */ e("b", { children: L(c.impact) }),
          /* @__PURE__ */ t("div", { className: "text-xs text-muted", children: [
            "estimated impact · ",
            c.date
          ] })
        ] })
      ] }) }, c.date + c.service)) }) : /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "py-6 text-center max-w-md mx-auto space-y-2", children: [
        /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold", children: "✓" }),
        /* @__PURE__ */ e("h4", { className: "text-sm font-semibold text-foreground", children: "0 Active AWS Cost Anomalies" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed", children: "AWS Cost Anomaly Detection has reported no severe unexpected spikes for this account scope. Recurring background sweeps will monitor telemetry as workloads run." })
      ] }) })
    ] })
  ] });
}
function ze({ items: s }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ t(b, { children: [
    /* @__PURE__ */ e(y, { children: "Demo service breakdown" }),
    /* @__PURE__ */ e("div", { className: "mt-4 divide-y divide-border", children: s.map((r) => /* @__PURE__ */ t("div", { className: "py-3 grid grid-cols-3", children: [
      /* @__PURE__ */ e("b", { children: r.service }),
      /* @__PURE__ */ e("span", { children: L(r.cost) }),
      /* @__PURE__ */ t("span", { className: (r.changePercent || 0) > 0 ? "text-amber-600" : "text-emerald-600", children: [
        (r.changePercent || 0) > 0 ? "+" : "",
        r.changePercent,
        "%"
      ] })
    ] }, r.service)) }),
    /* @__PURE__ */ e("p", { className: "text-xs text-muted mt-4", children: "Synthetic values shown only because Demo mode is enabled." })
  ] }) });
}
function ae({ title: s, text: r, action: n }) {
  return /* @__PURE__ */ e("div", { className: "px-6 py-6", children: /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "max-w-xl py-8 mx-auto text-center", children: [
    /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ie, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ e("h2", { className: "text-lg font-semibold mt-3", children: s }),
    /* @__PURE__ */ e("p", { className: "text-sm text-muted mt-2 mb-4", children: r }),
    /* @__PURE__ */ e(A, { onClick: n, children: "Open FinOps Agent" })
  ] }) }) });
}
function pe(s) {
  return s.split(/(\*\*.*?\*\*|`.*?`)/g).map((n, i) => n.startsWith("**") && n.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "text-foreground font-semibold", children: n.slice(2, -2) }, i) : n.startsWith("`") && n.endsWith("`") ? /* @__PURE__ */ e("code", { className: "px-1 py-0.5 rounded bg-surface-muted text-accent font-mono text-[11px]", children: n.slice(1, -1) }, i) : n);
}
function Ee({ content: s }) {
  const r = s.split(`
`), n = [];
  let i = [], l = !1;
  const u = (v, c) => {
    if (!v.length) return null;
    const p = v[0], f = v.slice(v.length > 1 && v[1].every((S) => S.trim().match(/^-+$/)) ? 2 : 1);
    return /* @__PURE__ */ e("div", { className: "overflow-x-auto my-3 rounded-lg border border-border", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
      /* @__PURE__ */ e("thead", { className: "bg-surface-muted border-b border-border text-foreground font-semibold", children: /* @__PURE__ */ e("tr", { children: p.map((S, O) => /* @__PURE__ */ e("th", { className: "px-3 py-2", children: S.trim() }, O)) }) }),
      /* @__PURE__ */ e("tbody", { className: "divide-y divide-border font-mono text-[11px]", children: f.map((S, O) => /* @__PURE__ */ e("tr", { className: "hover:bg-surface-muted/30", children: S.map((M, P) => /* @__PURE__ */ e("td", { className: "px-3 py-1.5", children: M.trim() }, P)) }, O)) })
    ] }) }, `table-${c}`);
  }, o = () => {
    l && i.length && (n.push(u(i, n.length)), i = [], l = !1);
  };
  return r.forEach((v, c) => {
    const p = v.trim();
    if (p.startsWith("|") && p.endsWith("|")) {
      l = !0;
      const f = p.split("|").slice(1, -1);
      i.push(f);
      return;
    } else
      o();
    p ? p.startsWith("# ") ? n.push(/* @__PURE__ */ e("h1", { className: "text-xl font-bold text-foreground mt-4 mb-2", children: p.slice(2) }, c)) : p.startsWith("## ") ? n.push(/* @__PURE__ */ e("h2", { className: "text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border", children: p.slice(3) }, c)) : p.startsWith("### ") ? n.push(/* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-foreground mt-3 mb-1", children: p.slice(4) }, c)) : p === "---" ? n.push(/* @__PURE__ */ e("hr", { className: "border-border my-4" }, c)) : p.startsWith("- ") || p.startsWith("* ") ? n.push(
      /* @__PURE__ */ t("div", { className: "flex gap-2 text-xs text-muted leading-relaxed my-0.5 ml-2", children: [
        /* @__PURE__ */ e("span", { className: "text-accent", children: "•" }),
        /* @__PURE__ */ e("span", { children: pe(p.slice(2)) })
      ] }, c)
    ) : n.push(
      /* @__PURE__ */ e("p", { className: "text-xs text-muted leading-relaxed my-1", children: pe(p) }, c)
    ) : n.push(/* @__PURE__ */ e("div", { className: "h-2" }, `blank-${c}`));
  }), o(), /* @__PURE__ */ e("div", { className: "space-y-1", children: n });
}
function Le({
  reports: s,
  selectedReport: r,
  onSelectReport: n,
  onGenerate: i,
  generating: l,
  onAskAgent: u,
  onOpenSchedules: o
}) {
  const [v, c] = x(!1), p = (f) => {
    var S;
    (S = navigator.clipboard) == null || S.writeText(f), c(!0), setTimeout(() => c(!1), 2e3);
  };
  return r ? /* @__PURE__ */ t("div", { className: "px-6 py-6 space-y-4", children: [
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
        /* @__PURE__ */ e(N, { tone: r.type === "executive" ? "success" : "info", children: r.type })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e(A, { onClick: () => p(r.contentMarkdown), children: v ? "✓ Copied" : "Copy Report Markdown" }) })
    ] }),
    r.type === "backlog" && (r.contentMarkdown.includes("Identified Opportunities: 0") || r.contentMarkdown.includes("0 active optimization opportunities")) && /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground flex items-center gap-3", children: [
      /* @__PURE__ */ e("span", { className: "text-emerald-500 font-bold text-base", children: "✓" }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: "Live Optimization Scan Complete: 0 Waste Opportunities Detected" }),
        /* @__PURE__ */ e("div", { className: "text-muted mt-0.5", children: "AWS Cost Optimization Hub & Compute Optimizer verified 0 oversized instances or idle resources. This represents an audited clean baseline, not a failed or stuck process. See section 2 below for diagnostic details." })
      ] })
    ] }),
    /* @__PURE__ */ t(b, { children: [
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ e(y, { children: r.title }),
        /* @__PURE__ */ t("div", { className: "text-xs text-muted mt-1 font-mono", children: [
          "Scope: ",
          /* @__PURE__ */ e("strong", { className: "text-foreground", children: r.scope }),
          " · Created: ",
          r.createdAt
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "p-4 rounded-xl bg-surface-muted/30 border border-border", children: /* @__PURE__ */ e(Ee, { content: r.contentMarkdown }) })
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
          s.length,
          ")"
        ] }),
        /* @__PURE__ */ e("span", { className: "text-xs text-muted", children: "Persisted in local SQLite database" })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid gap-3", children: [
        s.map((f) => /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
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
                onClick: () => p(f.contentMarkdown),
                className: "p-2 rounded-lg border border-border text-xs text-muted hover:text-foreground hover:bg-surface-muted transition-colors",
                title: "Copy Markdown",
                children: "📋"
              }
            )
          ] })
        ] }) }, f.id)),
        !s.length && /* @__PURE__ */ e(b, { children: /* @__PURE__ */ t("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ e("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ e(ie, { className: "w-8 h-8" }) }),
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
