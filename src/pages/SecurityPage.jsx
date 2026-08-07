import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { securityFeatures } from "../data/platform";

export function SecurityPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Security"
          title="Built for how companies actually connect data"
          description="Security and IT teams need proof—not slideware. AASANI is designed for least-privilege database access, auditability, and enterprise control."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated rounded-2xl border border-border bg-white p-8"
            >
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
