import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { architectureLayers } from "../../data/platform";

export function ArchitectureScroll() {
  const { ref, visible } = useScrollReveal(0.12);

  return (
    <div ref={ref} className="relative space-y-6">
      {architectureLayers.map((layer, index) => (
        <motion.div
          key={layer.title}
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: index * 0.12 }}
          className="card-elevated relative overflow-hidden rounded-2xl border border-border bg-white p-8"
        >
          <div
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent"
            style={{ opacity: visible ? 1 : 0 }}
          />
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Layer {index + 1}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">{layer.title}</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {layer.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface-muted px-4 py-1.5 text-sm text-muted"
              >
                {item}
              </span>
            ))}
          </div>
          {index < architectureLayers.length - 1 && (
            <motion.div
              className="mx-auto mt-6 flex justify-center text-primary"
              animate={visible ? { y: [0, 6, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              ↓
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
