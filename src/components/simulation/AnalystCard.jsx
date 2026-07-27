import { motion } from "framer-motion";
import { ProgressBar } from "../ui/ProgressBar";

export function AnalystCard({ analyst, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className="glass shadow-soft rounded-2xl border border-border p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/20 text-sm font-bold text-white ring-1 ring-border">
          {analyst.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">{analyst.name}</p>
          <p className="text-sm text-muted">{analyst.role}</p>
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-accent">{analyst.task}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>Progress</span>
        <span className="font-semibold text-white">{analyst.progress}%</span>
      </div>
      <ProgressBar value={analyst.progress} className="mt-2" delay={index * 0.1} />
    </motion.div>
  );
}
