import { motion } from "framer-motion";
import { Container, SectionHeader } from "../components/layout/Container";
import { solutions } from "../data/platform";
import { Button } from "../components/ui/Button";

export function SolutionsPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Solutions"
          title="Intelligence for every leadership conversation"
          description="Whether you lead operations, finance, or clinical quality—AASANI connects your metrics to the systems that produce them."
        />
        <div className="mt-16 space-y-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-8 rounded-2xl border border-border bg-white p-10 lg:grid-cols-[1fr_2fr] card-elevated"
            >
              <h3 className="text-2xl font-bold text-ink">{s.title}</h3>
              <p className="text-muted leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Button to="/contact">Request Demo</Button>
        </div>
      </Container>
    </div>
  );
}
