import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export function ActivityFeed({ items }) {
  return (
    <div className="glass shadow-soft rounded-2xl border border-border p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Activity className="h-4 w-4 text-primary" />
        Live Activity Feed
      </div>
      <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
        <AnimatePresence initial={false} mode="popLayout">
          {items.length === 0 ? (
            <li className="text-sm text-muted">Waiting for analyst activity…</li>
          ) : (
            items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, x: -12, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-lg border border-border/80 bg-bg/40 px-4 py-3"
              >
                <p className="text-sm text-white">
                  <span className="font-semibold text-accent">{item.analyst}</span>{" "}
                  {item.action}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">{item.time}</p>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}
