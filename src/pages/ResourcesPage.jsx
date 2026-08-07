import { motion } from "framer-motion";
import { Container, SectionHeader } from "../components/layout/Container";
import { resources } from "../data/platform";

export function ResourcesPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Resources"
          title="Guides for operators and data teams"
          description="How to connect databases, define KPIs leadership trusts, and ship an intelligence layer without a multi-year rebuild."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {resources.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-elevated rounded-2xl border border-border bg-white p-8"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item.type}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
}
