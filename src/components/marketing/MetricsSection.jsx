import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { heroMetrics } from "../../data/platform";

function MetricItem({ metric, active }) {
  const count = useAnimatedCounter(metric.value, 1800, active);

  let headline = String(count);
  if (metric.suffix === "+") headline = `${count}+`;
  if (metric.suffix === "% satisfaction") headline = `${count}%`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card-elevated rounded-2xl border border-border bg-white p-8"
    >
      <p className="text-4xl font-bold tracking-tight text-ink lg:text-5xl">{headline}</p>
      {metric.suffix !== "+" && metric.suffix !== "% satisfaction" && (
        <p className="mt-1 text-sm font-medium text-accent">{metric.suffix}</p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-muted">{metric.label}</p>
    </motion.div>
  );
}

export function MetricsSection() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="bg-surface-muted py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {heroMetrics.map((m) => (
          <MetricItem key={m.label} metric={m} active={visible} />
        ))}
      </div>
    </section>
  );
}
