import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Download,
  FileText,
  Sparkles,
  LayoutDashboard,
  ChevronDown,
  MessageSquare,
  X,
  Send,
  Building2,
  ShieldAlert,
  HeartPulse,
  Wallet,
  Activity,
  RefreshCw,
} from "lucide-react";
import clsx from "clsx";
import {
  DEFAULT_ORG_ID,
  getKPIs,
  getDepartmentScorecards,
  getTrendData,
  getInsights,
  getNarrativeSummary,
  getOrganizations,
  getSuggestedPrompts,
  getPeriodLabel,
  askQuestion,
} from "../../services/dataService";
import { useAsyncData } from "../../hooks/useAsyncData";

const ranges = /** @type {const} */ (["7D", "30D", "90D"]);

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
  },
};

const categoryStyles = {
  Cost: "bg-amber-50 text-amber-800 border-amber-100",
  Quality: "bg-blue-50 text-blue-800 border-blue-100",
  "Operational Risk": "bg-rose-50 text-rose-800 border-rose-100",
  "Patient Experience": "bg-teal-50 text-teal-800 border-teal-100",
};

const categoryIcons = {
  Cost: Wallet,
  Quality: HeartPulse,
  "Operational Risk": ShieldAlert,
  "Patient Experience": Activity,
};

function Bone({ className }) {
  return <div className={clsx("skeleton-shimmer rounded-lg", className)} aria-hidden />;
}

function SectionError({ message, onRetry, className }) {
  return (
    <div
      className={clsx(
        "card-elevated flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white px-6 py-8 text-center",
        className,
      )}
      role="alert"
    >
      <p className="max-w-sm text-sm text-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary/40"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </button>
    </div>
  );
}

function SectionEmpty({ message, className }) {
  return (
    <div
      className={clsx(
        "card-elevated flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/80 px-6 py-10 text-center",
        className,
      )}
    >
      <p className="max-w-sm text-sm text-muted">{message}</p>
    </div>
  );
}

function KpiSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading KPIs">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="card-elevated rounded-2xl border border-border bg-white p-5"
        >
          <Bone className="h-3.5 w-24" />
          <Bone className="mt-3 h-8 w-20" />
          <Bone className="mt-3 h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton({ title }) {
  const heights = [40, 62, 55, 78, 48, 70, 58, 66];
  return (
    <div
      className="card-elevated rounded-2xl border border-border bg-white p-6"
      aria-busy="true"
      aria-label={`Loading ${title}`}
    >
      <div className="flex items-center justify-between">
        <Bone className="h-4 w-36" />
        <Bone className="h-3 w-10" />
      </div>
      <div className="mt-6 flex h-64 items-end gap-2 px-2">
        {heights.map((h, i) => (
          <div
            key={i}
            className="skeleton-shimmer w-full rounded-t-md"
            style={{ height: `${h}%` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

function InsightsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading insights">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-elevated rounded-2xl border border-border bg-white p-7">
          <div className="flex gap-3">
            <Bone className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Bone className="h-5 w-3/4 max-w-md" />
              <div className="flex gap-2">
                <Bone className="h-5 w-24 rounded-full" />
                <Bone className="h-5 w-28 rounded-full" />
              </div>
            </div>
          </div>
          <Bone className="mt-5 h-4 w-full" />
          <Bone className="mt-2 h-4 w-5/6" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Bone className="h-24 rounded-xl" />
            <Bone className="h-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NarrativeSkeleton() {
  return (
    <div
      className="card-elevated rounded-2xl border border-border bg-white p-8 lg:p-10"
      aria-busy="true"
      aria-label="Loading executive summary"
    >
      <Bone className="h-3 w-40" />
      <Bone className="mt-3 h-8 w-64" />
      <Bone className="mt-2 h-4 w-48" />
      <Bone className="mt-8 h-6 w-full max-w-xl" />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface-muted p-5">
            <Bone className="h-3 w-20" />
            <Bone className="mt-3 h-7 w-16" />
            <Bone className="mt-2 h-3 w-28" />
          </div>
        ))}
      </div>
      <Bone className="mt-8 h-4 w-full" />
      <Bone className="mt-2 h-4 w-full" />
      <Bone className="mt-2 h-4 w-4/5" />
    </div>
  );
}

/** Clean dual-metric chart rows from two getTrendData results. */
function mergeTrendSeries(admissions, revenue) {
  return (admissions || []).map((point, i) => ({
    period: point.date,
    admissions: point.value,
    revenue: revenue?.[i]?.value ?? null,
  }));
}

export function ExecutiveWorkspace() {
  const [tab, setTab] = useState("overview");
  const [range, setRange] = useState("30D");
  const [dept, setDept] = useState("All");
  const [orgId, setOrgId] = useState(DEFAULT_ORG_ID);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I'm AASANI. Ask about readmissions, ED waits, margin, or department risk—I'll ground answers in your live demo data.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [exportNote, setExportNote] = useState("");
  const chatEndRef = useRef(null);

  // Meta fetches (org list / prompts / period label) — independent of section failures
  const orgsAsync = useAsyncData(() => getOrganizations(), []);
  const promptsAsync = useAsyncData(() => getSuggestedPrompts(), []);
  const labelAsync = useAsyncData(() => getPeriodLabel(range), [range]);

  // Independent section fetches (orgId drives multi-tenant data)
  const kpisAsync = useAsyncData(() => getKPIs(orgId, range), [orgId, range]);
  const scorecardsAsync = useAsyncData(() => getDepartmentScorecards(orgId, range), [
    orgId,
    range,
  ]);
  const trendsAsync = useAsyncData(async () => {
    const [admissions, revenue] = await Promise.all([
      getTrendData(orgId, range, "admissions"),
      getTrendData(orgId, range, "revenue"),
    ]);
    return mergeTrendSeries(admissions, revenue);
  }, [orgId, range]);
  const insightsAsync = useAsyncData(() => getInsights(orgId, range), [orgId, range]);
  const narrativeAsync = useAsyncData(() => getNarrativeSummary(orgId, range), [orgId, range]);

  const orgs = orgsAsync.data?.length
    ? orgsAsync.data
    : [{ id: DEFAULT_ORG_ID, name: "Northbridge Health System", type: "", bedCount: 0 }];
  const activeOrg = orgs.find((o) => o.id === orgId) || orgs[0];
  const orgName = activeOrg?.name || "Northbridge Health System";
  const orgType = activeOrg?.type || "";
  const prompts = promptsAsync.data ?? [];
  const periodLabel = labelAsync.success && labelAsync.data ? labelAsync.data : range;

  const kpis = kpisAsync.data ?? [];
  const departments = useMemo(
    () => scorecardsAsync.data ?? [],
    [scorecardsAsync.data],
  );
  const trendChart = trendsAsync.data ?? [];
  const insights = insightsAsync.data ?? [];
  const narrative = narrativeAsync.data;

  const filteredDepartments = useMemo(() => {
    if (dept === "All") return departments;
    return departments.filter((d) => d.name === dept);
  }, [departments, dept]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const selectRange = useCallback((r) => {
    setRange(r);
    setDept("All");
  }, []);

  const selectOrg = useCallback((nextId) => {
    setOrgId(nextId);
    setDept("All");
  }, []);

  const ask = useCallback(
    async (question) => {
      const q = question.trim();
      if (!q) return;
      setMessages((m) => [...m, { role: "user", text: q }]);
      setDraft("");
      setChatOpen(true);
      try {
        const answer = await askQuestion(q, range, orgId);
        setMessages((m) => [...m, { role: "assistant", text: answer.text }]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: "I couldn't reach the insight service just now. Try again in a moment.",
          },
        ]);
      }
    },
    [range, orgId],
  );

  function handleExport() {
    setExportNote(
      `Executive report for ${orgName} (${periodLabel}) staged for download · shareable link stub: aasani.app/r/demo-${range.toLowerCase()}`,
    );
    setTimeout(() => setExportNote(""), 5000);
  }

  return (
    <div className="relative min-h-screen bg-surface-muted">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1d4ed8] text-sm font-bold text-white">
              A
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Executive Workspace
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <h1 className="mt-0.5 truncate text-xl font-bold tracking-tight text-ink">
                {orgName}
              </h1>
              <p className="text-xs text-muted">
                {orgType
                  ? `${orgType}${activeOrg?.bedCount ? ` · ${activeOrg.bedCount} beds` : ""} · `
                  : ""}
                Synced from EHR · Scheduling · Labs · HR · PE · FHIR
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Org switcher — multi-tenant scaffold */}
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <select
                value={orgId}
                onChange={(e) => selectOrg(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-white py-1.5 pl-8 pr-8 text-xs font-semibold text-ink"
                aria-label="Select organization"
                data-testid="org-switcher"
              >
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </div>

            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => selectRange(r)}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  range === r
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-muted hover:border-primary/30",
                )}
              >
                {r}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary/30"
            >
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              Ask AASANI
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-[1400px] gap-1 px-6 lg:px-8">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "insights", label: "AI Insights", icon: Sparkles },
            { id: "reports", label: "Reports", icon: FileText },
            { id: "chat", label: "Ask AASANI", icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                if (id === "chat") {
                  setChatOpen(true);
                  setTab("overview");
                } else {
                  setTab(id);
                }
              }}
              className={clsx(
                "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        {tab === "overview" && (
          <motion.div
            key={`overview-${range}-${orgId}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mb-4 text-sm text-muted">
              Showing{" "}
              <span className="font-semibold text-ink">
                {labelAsync.loading ? "…" : periodLabel}
              </span>{" "}
              for <span className="font-semibold text-ink">{orgName}</span>
            </p>

            {/* KPIs — independent lifecycle */}
            {kpisAsync.loading && <KpiSkeleton />}
            {kpisAsync.failed && (
              <SectionError
                message="Couldn't load KPI data. Check your connection and try again."
                onRetry={kpisAsync.retry}
              />
            )}
            {kpisAsync.success && kpis.length === 0 && (
              <SectionEmpty message="No data available for this period." />
            )}
            {kpisAsync.success && kpis.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="card-elevated rounded-2xl border border-border bg-white p-5"
                  >
                    <p className="text-sm text-muted">{kpi.name}</p>
                    <p className="mt-2 text-2xl font-bold text-ink">{kpi.value}</p>
                    <p
                      className={clsx(
                        "mt-2 text-xs font-semibold",
                        kpi.up ? "text-accent" : "text-amber-600",
                      )}
                    >
                      {kpi.delta} vs prior period
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Trends */}
              {trendsAsync.loading && <ChartSkeleton title="Admissions & revenue" />}
              {trendsAsync.failed && (
                <SectionError
                  message="Couldn't load trend data."
                  onRetry={trendsAsync.retry}
                  className="min-h-[320px]"
                />
              )}
              {trendsAsync.success && trendChart.length === 0 && (
                <SectionEmpty
                  message="No data available for this period."
                  className="min-h-[320px]"
                />
              )}
              {trendsAsync.success && trendChart.length > 0 && (
                <div className="card-elevated rounded-2xl border border-border bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-ink">Admissions & revenue</h2>
                    <span className="text-xs text-muted">{range}</span>
                  </div>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendChart}>
                        <CartesianGrid stroke="#E2E8F0" vertical={false} />
                        <XAxis dataKey="period" tick={{ fill: "#64748B", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                        <Tooltip {...tooltipStyle} />
                        <Line
                          type="monotone"
                          dataKey="admissions"
                          stroke="#2563EB"
                          strokeWidth={2}
                          dot={false}
                          name="Admissions"
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#0D9488"
                          strokeWidth={2}
                          dot={false}
                          name="Revenue ($M)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Scorecards */}
              {scorecardsAsync.loading && <ChartSkeleton title="Department benchmarking" />}
              {scorecardsAsync.failed && (
                <SectionError
                  message="Couldn't load department scorecards."
                  onRetry={scorecardsAsync.retry}
                  className="min-h-[320px]"
                />
              )}
              {scorecardsAsync.success && departments.length === 0 && (
                <SectionEmpty
                  message="No data available for this period."
                  className="min-h-[320px]"
                />
              )}
              {scorecardsAsync.success && departments.length > 0 && (
                <div className="card-elevated rounded-2xl border border-border bg-white p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-semibold text-ink">Department benchmarking</h2>
                    <div className="relative">
                      <select
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="appearance-none rounded-lg border border-border bg-white py-2 pl-3 pr-8 text-sm font-medium text-ink"
                      >
                        <option>All</option>
                        {departments.map((d) => (
                          <option key={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-muted" />
                    </div>
                  </div>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredDepartments} layout="vertical" margin={{ left: 12 }}>
                        <CartesianGrid stroke="#E2E8F0" horizontal={false} />
                        <XAxis
                          type="number"
                          domain={[0, 100]}
                          tick={{ fill: "#64748B", fontSize: 12 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={110}
                          tick={{ fill: "#64748B", fontSize: 11 }}
                        />
                        <Tooltip {...tooltipStyle} />
                        <Bar
                          dataKey="score"
                          fill="#2563EB"
                          radius={[0, 6, 6, 0]}
                          name="Your system"
                        />
                        <Bar
                          dataKey="benchmark"
                          fill="#0D9488"
                          radius={[0, 6, 6, 0]}
                          name="Peer median"
                          opacity={0.7}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {tab === "insights" && (
          <motion.div
            key={`insights-${range}-${orgId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div>
              <h2 className="text-lg font-bold text-ink">AI Insights · {periodLabel}</h2>
              <p className="mt-1 text-sm text-muted">
                Auto-generated from connected systems for {orgName}. Fictional demo data only.
              </p>
            </div>

            {insightsAsync.loading && <InsightsSkeleton />}
            {insightsAsync.failed && (
              <SectionError
                message="Couldn't load AI insights."
                onRetry={insightsAsync.retry}
              />
            )}
            {insightsAsync.success && insights.length === 0 && (
              <SectionEmpty message="No data available for this period." />
            )}
            {insightsAsync.success &&
              insights.length > 0 &&
              insights.map((item) => {
                const Icon = categoryIcons[item.category] || Sparkles;
                return (
                  <article
                    key={item.id}
                    className="card-elevated rounded-2xl border border-border bg-white p-7"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span
                              className={clsx(
                                "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                                categoryStyles[item.category] || "bg-surface-muted text-muted",
                              )}
                            >
                              {item.category}
                            </span>
                            <span className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                              {item.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.explanation}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-surface-muted p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Why this matters
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink">
                          {item.whyItMatters}
                        </p>
                      </div>
                      <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          Recommended action
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink">
                          {item.recommendedAction}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
          </motion.div>
        )}

        {tab === "reports" && (
          <motion.div
            key={`reports-${range}-${orgId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {narrativeAsync.loading && <NarrativeSkeleton />}
            {narrativeAsync.failed && (
              <SectionError
                message="Couldn't load executive summary."
                onRetry={narrativeAsync.retry}
              />
            )}
            {narrativeAsync.success && !narrative && (
              <SectionEmpty message="No data available for this period." />
            )}
            {narrativeAsync.success && narrative && (
              <div className="card-elevated rounded-2xl border border-border bg-white p-8 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Board-ready · Auto-generated
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                      Executive Summary
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {orgName} · {periodLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.25)]"
                  >
                    <Download className="h-4 w-4" /> Export
                  </button>
                </div>

                {exportNote && (
                  <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    {exportNote}
                  </p>
                )}

                <h3 className="mt-8 text-xl font-semibold leading-snug text-ink">
                  {narrative.headline}
                </h3>

                {(!narrative.keyMetrics || narrative.keyMetrics.length === 0) && (
                  <p className="mt-6 text-sm text-muted">No data available for this period.</p>
                )}

                {narrative.keyMetrics?.length > 0 && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {narrative.keyMetrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-border bg-surface-muted p-5"
                      >
                        <p className="text-xs font-medium text-muted">{m.label}</p>
                        <p className="mt-1 text-2xl font-bold text-ink">{m.value}</p>
                        <p className="mt-1 text-xs font-semibold text-primary">{m.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    What changed and why
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                    {(narrative.summary || "").replace(/Northbridge/g, orgName.split(" ")[0])}
                  </p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-xs text-muted">
                    Generated by AASANI AI layer over FHIR-connected systems. Demo data only — not
                    for clinical decision-making.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {!chatOpen && (
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,99,235,0.4)]"
        >
          <MessageSquare className="h-4 w-4" />
          Ask AASANI
        </button>
      )}

      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close chat overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px]"
              onClick={() => setChatOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="text-sm font-bold text-ink">Ask AASANI</p>
                  <p className="text-xs text-muted">
                    Grounded in {range} data · {orgName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-ink"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-3">
                {prompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => ask(p)}
                    className="shrink-0 rounded-full border border-border bg-surface-muted px-3 py-1.5 text-left text-[11px] font-medium text-ink hover:border-primary/40"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-auto bg-primary text-white"
                        : "bg-surface-muted text-ink",
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form
                className="border-t border-border p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(draft);
                }}
              >
                <div className="flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask about KPIs, risks, ED waits…"
                    className="flex-1 rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-3 text-white"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
