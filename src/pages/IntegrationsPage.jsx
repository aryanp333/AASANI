import { motion } from "framer-motion";
import { Container, SectionHeader } from "../components/layout/Container";
import { integrations } from "../data/platform";

export function IntegrationsPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Integrations"
          title="Connect the systems you already run"
          description="AASANI integrates with leading EHR, ERP, analytics, and interoperability standards—so your data estate stays intact."
          align="center"
        />
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.04 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(37,99,235,0.12)" }}
              className="flex min-h-[100px] items-center justify-center rounded-2xl border border-border bg-white p-6 text-center text-sm font-semibold text-ink card-elevated"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
