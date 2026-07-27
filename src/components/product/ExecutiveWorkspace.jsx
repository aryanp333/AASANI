import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Share2,
  FileText,
  Sparkles,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";
import {
  boardReports,
  departmentBenchmark,
  executiveKpis,
  strategicInsights,
  trendSeries,
} from "../../data/platform";

const ranges = ["7D", "30D", "90D", "YTD"];

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
  },
};

export function ExecutiveWorkspace() {
  const [tab, setTab] = useState("overview");
  const [range, setRange] = useState("30D");
  const [dept, setDept] = useState("All");

  const trendData = useMemo(() => {
    const factor = range === "7D" ? 0.92 : range === "90D" ? 1.05 : range === "YTD" ? 1.08 : 1;
    return trendSeries.map((d) => ({
      ...d,
      admissions: Math.round(d.admissions * factor),
      revenue: +(d.revenue * factor).toFixed(1),
    }));
  }, [range]);

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Executive Workspace
            </p>
            <h1 className="text-xl font-bold text-ink">Northbridge Health System</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold",
                  range === r
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-muted",
                )}
              >
                {r}
              </button>
            ))}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted"
            >
              Export <Download className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1400px] gap-1 px-6 pb-0 lg:px-8">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "insights", label: "Insights", icon: Sparkles },
            { id: "reports", label: "Reports", icon: FileText },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {executiveKpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="card-elevated rounded-2xl border border-border bg-white p-5"
                >
                  <p className="text-sm text-muted">{kpi.label}</p>
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

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="card-elevated rounded-2xl border border-border bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-ink">Trend analysis</h2>
                  <span className="text-xs text-muted">{range} view</span>
                </div>
                <div className="mt-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey="week" tick={{ fill: "#64748B", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                      <Tooltip {...tooltipStyle} />
                      <Line type="monotone" dataKey="admissions" stroke="#2563EB" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="revenue" stroke="#14B8A6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

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
                      {departmentBenchmark.map((d) => (
                        <option key={d.dept}>{d.dept}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-muted" />
                  </div>
                </div>
                <div className="mt-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentBenchmark} layout="vertical" margin={{ left: 12 }}>
                      <CartesianGrid stroke="#E2E8F0" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748B", fontSize: 12 }} />
                      <YAxis type="category" dataKey="dept" width={100} tick={{ fill: "#64748B", fontSize: 11 }} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="score" fill="#2563EB" radius={[0, 6, 6, 0]} name="Your system" />
                      <Bar dataKey="peer" fill="#14B8A6" radius={[0, 6, 6, 0]} name="Peer median" opacity={0.7} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "insights" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {strategicInsights.map((item) => (
              <article
                key={item.id}
                className="card-elevated rounded-2xl border border-border bg-white p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                      item.severity === "high"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700",
                    )}
                  >
                    {item.severity} priority
                  </span>
                </div>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InsightBlock label="Observation" value={item.observation} />
                  <InsightBlock label="Impact" value={item.impact} />
                  <InsightBlock label="Recommendation" value={item.recommendation} highlight />
                  <InsightBlock label="Business value" value={item.value} highlight />
                </dl>
              </article>
            ))}
          </motion.div>
        )}

        {tab === "reports" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {boardReports.map((report) => (
              <div
                key={report.id}
                className="card-elevated flex flex-col rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-ink">{report.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {report.description}
                </p>
                <p className="mt-4 text-xs font-medium text-muted">{report.pages} pages · Board ready</p>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
                  >
                    <Download className="h-4 w-4" /> Export PDF
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

function InsightBlock({ label, value, highlight }) {
  return (
    <div className={clsx("rounded-xl p-4", highlight ? "bg-teal-50/80" : "bg-surface-muted")}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  );
}
