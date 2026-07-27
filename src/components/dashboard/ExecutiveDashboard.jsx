import { motion } from "framer-motion";
import {
  executiveKpis,
  latestReports,
  topProducts,
} from "../../data/dashboard";
import {
  RevenueAreaChart,
  RegionalBarChart,
  SegmentPieChart,
} from "../charts/ChartBlocks";
import { FileText } from "lucide-react";

export function ExecutiveDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {executiveKpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass shadow-soft rounded-2xl p-6"
          >
            <p className="text-sm text-muted">{kpi.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white">
              {kpi.value}
            </p>
            <p className="mt-2 text-xs text-muted">{kpi.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass shadow-soft rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Revenue trend</h2>
          <p className="mt-1 text-sm text-muted">Monthly performance · analyst-built</p>
          <div className="mt-6">
            <RevenueAreaChart />
          </div>
        </div>
        <div className="glass shadow-soft rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Customer segmentation</h2>
          <div className="mt-4">
            <SegmentPieChart />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass shadow-soft rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Regional sales</h2>
          <div className="mt-6">
            <RegionalBarChart />
          </div>
        </div>
        <div className="glass shadow-soft rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Top products</h2>
          <ul className="mt-6 space-y-4">
            {topProducts.map((p, i) => (
              <li key={p.product}>
                <div className="flex justify-between text-sm">
                  <span className="text-white">{p.product}</span>
                  <span className="text-muted">
                    ${(p.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(p.revenue / topProducts[0].revenue) * 100}%`,
                    }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass shadow-soft rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Latest reports</h2>
        </div>
        <div className="mt-6 divide-y divide-border">
          {latestReports.map((report) => (
            <div
              key={report.id}
              className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-white">{report.title}</p>
                <p className="text-sm text-muted">
                  {report.analyst} · {report.date}
                </p>
              </div>
              <span className="rounded-lg border border-border px-3 py-1 text-xs text-muted">
                PDF
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
