import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Database } from "lucide-react";

export function HeroProductPreview() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="card-elevated-lg relative overflow-hidden rounded-[28px] border border-border bg-white"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-white">
              A
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">Business Workspace</p>
              <p className="text-[10px] text-muted">Meridian Retail · Live from warehouse</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="hidden items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 sm:inline-flex">
              <Database className="h-3 w-3" /> 4 DBs linked
            </span>
            <span className="rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-white">
              30D
            </span>
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {[
            { label: "Revenue", value: "$12.4M", delta: "+8.2%", good: true },
            { label: "Gross Margin", value: "33.1%", delta: "+1.2 pts", good: true },
            { label: "Churn", value: "2.8%", delta: "+0.4 pts", good: false },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="rounded-2xl border border-border bg-surface-muted/70 p-3.5"
            >
              <p className="text-[11px] font-medium text-muted">{kpi.label}</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-ink">{kpi.value}</p>
              <p
                className={`mt-1 inline-flex items-center gap-1 text-[11px] font-semibold ${
                  kpi.good ? "text-accent" : "text-amber-600"
                }`}
              >
                {kpi.good ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <AlertTriangle className="h-3 w-3" />
                )}
                {kpi.delta}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-border p-4 sm:col-span-3">
            <p className="text-xs font-semibold text-ink">Orders · revenue trend</p>
            <div className="mt-4 flex h-28 items-end gap-1.5">
              {[42, 50, 48, 58, 64, 60, 72, 70, 80, 78, 86, 92].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/85 to-accent/70"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.5 }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 sm:col-span-2">
            <div className="flex items-center gap-1.5 text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              <p className="text-[11px] font-semibold uppercase tracking-wide">Insight</p>
            </div>
            <p className="mt-2 text-sm font-semibold leading-snug text-ink">
              Mid-market churn rising
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              SLA breaches correlated with ticket spikes. Protect ~$340K ARR with faster response.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="card-elevated absolute -right-2 top-20 hidden rounded-2xl border border-border bg-white px-3.5 py-2.5 sm:block lg:-right-6"
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted">Sources</p>
        <p className="text-sm font-semibold text-ink">Postgres + CRM</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="card-elevated absolute -bottom-3 left-4 hidden rounded-2xl border border-border bg-white px-3.5 py-2.5 sm:block"
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted">Sync</p>
        <p className="text-sm font-semibold text-accent">Continuous</p>
      </motion.div>
    </div>
  );
}
