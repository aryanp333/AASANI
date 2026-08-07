import { motion } from "framer-motion";
import {
  Database,
  Calendar,
  FlaskConical,
  Users,
  HeartHandshake,
  Cable,
  ArrowRight,
} from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { healthcareConnectors, howItWorksSteps } from "../data/workspaceMock";
import { Button } from "../components/ui/Button";

const iconMap = {
  EHR: Database,
  Scheduling: Calendar,
  Laboratory: FlaskConical,
  HR: Users,
  "Patient Experience": HeartHandshake,
  "FHIR / HL7": Cable,
};

export function IntegrationsPage() {
  return (
    <div className="mesh-light pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Integrations"
          title="Plug AASANI into your health system stack"
          description="A secure AI intelligence layer over systems you already run—EHR, scheduling, labs, HR, patient experience, and standards-based FHIR/HL7 interfaces."
          align="center"
        />

        <div className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            How it works
          </h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-elevated relative rounded-2xl border border-border bg-white p-7"
              >
                <p className="text-xs font-bold tracking-[0.16em] text-primary">{item.step}</p>
                <h4 className="mt-3 text-lg font-bold text-ink">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                {i < howItWorksSteps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {healthcareConnectors.map((c, i) => {
            const Icon = iconMap[c.name] || Database;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                whileHover={{ y: -4 }}
                className="card-elevated rounded-2xl border border-border bg-white p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  {c.name}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button to="/experience">See connectors in the product demo</Button>
        </div>
      </Container>
    </div>
  );
}
