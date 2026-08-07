import { motion } from "framer-motion";
import { architectureLayers } from "../../data/platform";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function ArchitectureScroll() {
  const { ref, visible } = useScrollReveal(0.12);

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl space-y-4">
      {architectureLayers.map((layer, index) => (
        <motion.div key={layer.title} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="card-elevated relative overflow-hidden rounded-2xl border border-border bg-white p-7"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent" />
            <div className="flex flex-wrap items-start justify-between gap-3 pl-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Layer 0{index + 1}
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink">
                  {layer.title}
                </h3>
              </div>
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-muted">
                {layer.items.length} systems
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 pl-3">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface-muted px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          {index < architectureLayers.length - 1 && (
            <div className="flex justify-center py-1 text-primary" aria-hidden>
              <motion.span
                animate={visible ? { y: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                ↓
              </motion.span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
