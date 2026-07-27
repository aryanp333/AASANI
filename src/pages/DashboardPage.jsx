import { motion } from "framer-motion";
import { ExecutiveDashboard } from "../components/dashboard/ExecutiveDashboard";

export function DashboardPage() {
  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Client deliverable
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Executive dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Sample output from an AASANI engagement—KPIs, trends, and reports
            prepared by professional analysts from your business data.
          </p>
        </motion.div>
        <div className="mt-12">
          <ExecutiveDashboard />
        </div>
      </div>
    </div>
  );
}
