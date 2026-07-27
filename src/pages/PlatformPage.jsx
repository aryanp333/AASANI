import { motion } from "framer-motion";
import { Container, SectionHeader } from "../components/layout/Container";
import { ArchitectureScroll } from "../components/marketing/ArchitectureScroll";
import { Button } from "../components/ui/Button";

const capabilities = [
  {
    title: "Unified executive workspace",
    body: "One place for admissions, margin, quality, satisfaction, and revenue cycle—updated continuously from source systems.",
  },
  {
    title: "Operational intelligence",
    body: "Benchmark departments, detect drift early, and align operational and financial narratives without manual reconciliation.",
  },
  {
    title: "Strategic insights",
    body: "Every insight includes observation, impact, recommendation, and modeled business value—not vanity alerts.",
  },
  {
    title: "Board-ready reporting",
    body: "Export executive, operations, finance, clinical, and RCM reports formatted for governance conversations.",
  },
];

export function PlatformPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Platform"
          title="The intelligence layer above your healthcare stack"
          description="A secure cloud platform that unifies operational, financial, and clinical data—and transforms it into decisions your leadership team can act on."
        />
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
