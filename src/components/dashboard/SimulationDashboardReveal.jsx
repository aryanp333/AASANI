import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import clsx from "clsx";
import {
  RevenueLineChart,
  RegionalBarChart,
  SegmentPieChart,
  ProfitBarChart,
} from "../charts/ChartBlocks";
import { kpiCards, recentInsights } from "../../data/dashboard";

function KpiCard({ card, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
    >
      <p className="text-sm text-muted">{card.label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
      <p
        className={clsx(
          "mt-2 inline-flex items-center gap-1 text-xs font-medium",
          card.positive ? "text-accent" : "text-red-400",
        )}
      >
        <TrendingUp className="h-3.5 w-3.5" />
        {card.change}
      </p>
    </motion.div>
  );
}

export function SimulationDashboardReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, i) => (
          <KpiCard key={card.id} card={card} delay={i * 0.08} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold text-white">Revenue Trend</h3>
          <div className="mt-4">
            <RevenueLineChart />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold text-white">Profit by Month</h3>
          <div className="mt-4">
            <ProfitBarChart />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold text-white">Regional Sales</h3>
          <div className="mt-4">
            <RegionalBarChart />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold text-white">Customer Segmentation</h3>
          <div className="mt-4">
            <SegmentPieChart />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-semibold text-white">Recent Insights</h3>
        <ul className="mt-4 space-y-3">
          {recentInsights.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-bg/40 px-4 py-3"
            >
              <span className="text-sm text-white">{item.title}</span>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                {item.tag}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
