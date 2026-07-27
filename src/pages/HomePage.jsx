import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Container, SectionHeader } from "../components/layout/Container";
import { HeroDataFlow } from "../components/illustrations/HeroDataFlow";
import { MetricsSection } from "../components/marketing/MetricsSection";
import { ArchitectureScroll } from "../components/marketing/ArchitectureScroll";
import { trustedOrganizations, problemPoints } from "../data/platform";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function HomePage() {
  const { ref: problemRef, visible: problemVisible } = useScrollReveal(0.1);

  return (
    <>
      <section className="mesh-light overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              The Healthcare Intelligence Platform
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              One Platform.
              <br />
              <span className="gradient-text">Every Healthcare Decision.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Connect your existing healthcare ecosystem to AASANI and gain complete
              operational, financial, and clinical visibility through a single
              intelligence platform.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/contact">Request Demo</Button>
              <Button to="/experience" variant="secondary">
                Experience Platform <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative aspect-[4/3] rounded-3xl border border-border bg-white p-4 card-elevated"
          >
            <HeroDataFlow />
          </motion.div>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-12">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">
            Trusted by healthcare organisations
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedOrganizations.map((name) => (
              <span key={name} className="text-sm font-semibold text-slate-400">
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <MetricsSection />

      <section ref={problemRef} className="py-24 lg:py-32">
        <Container>
          <SectionHeader
            eyebrow="The problem"
            title="Healthcare runs on fragmented information"
            description="Leadership teams inherit dozens of systems—but no single place to see performance, compare departments, or act with confidence."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {problemPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                animate={problemVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-surface-muted p-8"
              >
                <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{point.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mesh-dark mt-20 rounded-3xl px-8 py-16 text-center text-white lg:px-16"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              The shift
            </p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              One connected platform. Real-time intelligence.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-slate-300">
              AASANI sits above your existing systems—unifying data, benchmarking
              performance, and delivering insights executives can trust.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface-muted py-24 lg:py-32">
        <Container>
          <SectionHeader
            eyebrow="Platform architecture"
            title="From hospital systems to executive intelligence"
            description="AASANI does not replace your EHR or revenue cycle. It becomes the intelligence layer that connects them."
            align="center"
          />
          <div className="mt-16">
            <ArchitectureScroll />
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container className="text-center">
          <SectionHeader
            align="center"
            eyebrow="Experience AASANI"
            title="See the executive workspace in action"
            description="Launch a full product simulation—connect systems, explore KPIs, insights, and board-ready reports."
          />
          <Button to="/experience" className="mt-10">
            Experience Platform
          </Button>
        </Container>
      </section>
    </>
  );
}
