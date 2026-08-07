import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { heroMetrics } from "../../data/platform";

function MetricItem({ metric, active, index }) {
  const count = useAnimatedCounter(metric.value, 1800, active);

  let headline = String(count);
  if (metric.suffix === "+") headline = `${count}+`;
  if (metric.suffix === "% satisfaction") headline = `${count}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="card-elevated rounded-2xl border border-border bg-white p-7"
    >
      <p className="bg-gradient-to-br from-ink to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-5xl">
        {headline}
      </p>
      {metric.suffix !== "+" && metric.suffix !== "% satisfaction" && (
        <p className="mt-1.5 text-sm font-semibold text-accent">{metric.suffix}</p>
      )}
      {metric.suffix === "% satisfaction" && (
        <p className="mt-1.5 text-sm font-semibold text-accent">executive satisfaction</p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted">{metric.label}</p>
    </motion.div>
  );
}

export function MetricsSection() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Results that compound
        </p>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
          Built for companies that treat data as a growth engine—not a reporting afterthought.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((m, i) => (
            <MetricItem key={m.label} metric={m} active={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
