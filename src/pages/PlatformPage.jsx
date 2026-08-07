import { motion } from "framer-motion";
import { Container, SectionHeader } from "../components/layout/Container";
import { ArchitectureScroll } from "../components/marketing/ArchitectureScroll";
import { Button } from "../components/ui/Button";
import { connectSteps } from "../data/platform";

const capabilities = [
  {
    title: "Database-native connectors",
    body: "Secure, read-only links to Postgres, MySQL, SQL Server, Snowflake, BigQuery, MongoDB, and cloud warehouses—without disrupting production workloads.",
  },
  {
    title: "Unified business model",
    body: "Map tables to revenue, customers, ops, and cost so every KPI is defined once and trusted company-wide.",
  },
  {
    title: "Actionable insights",
    body: "Every insight pairs observation, impact, recommendation, and business value—not a noisy alert feed.",
  },
  {
    title: "Leadership reporting",
    body: "Export board-ready packs for growth, finance, operations, and product—always in sync with the source databases.",
  },
];

export function PlatformPage() {
  return (
    <div className="mesh-light pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Platform"
          title="The intelligence layer on top of company data"
          description="AASANI is the tool that integrates with the databases and systems you already run—then turns those tables into live business decisions."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {connectSteps.map((s) => (
            <div
              key={s.step}
              className="card-elevated rounded-2xl border border-border bg-white p-6"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-primary">{s.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-elevated rounded-2xl border border-border bg-white p-8"
            >
              <h3 className="text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20">
          <ArchitectureScroll />
        </div>
        <div className="mt-16 text-center">
          <Button to="/experience">Experience Platform</Button>
        </div>
      </Container>
    </div>
  );
}
