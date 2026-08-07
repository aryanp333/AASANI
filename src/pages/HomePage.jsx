import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Unplug,
  LayoutGrid,
  Copy,
  Table2,
  CheckCircle2,
  Link2,
  LineChart,
  Server,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Container, SectionHeader } from "../components/layout/Container";
import { HeroProductPreview } from "../components/marketing/HeroProductPreview";
import { MetricsSection } from "../components/marketing/MetricsSection";
import { ArchitectureScroll } from "../components/marketing/ArchitectureScroll";
import {
  trustedOrganizations,
  problemPoints,
  connectSteps,
} from "../data/platform";
import { useScrollReveal } from "../hooks/useScrollReveal";

const problemIcons = [Unplug, LayoutGrid, Copy, Table2];

const outcomes = [
  {
    title: "One source of truth",
    body: "Sales, finance, and ops finally share the same numbers—live from company databases, not competing exports.",
  },
  {
    title: "Decisions in hours, not weeks",
    body: "Insights explain what changed, why it matters, and what to do next—ready for leadership standups.",
  },
  {
    title: "Plug into systems you already run",
    body: "No rip-and-replace. AASANI connects to your databases and tools, then becomes the intelligence layer above them.",
  },
];

const story = [
  "Scattered databases",
  "Fragmented metrics",
  "Slow reporting",
  "AASANI connects",
  "Live intelligence",
  "Better business outcomes",
];

export function HomePage() {
  const { ref: problemRef, visible: problemVisible } = useScrollReveal(0.1);

  return (
    <>
      <section className="mesh-light noise relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-dot opacity-40" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              <Database className="h-3.5 w-3.5" />
              Business intelligence · Connected to your databases
            </div>
            <h1 className="mt-7 text-[2.5rem] font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Your databases.
              <br />
              <span className="gradient-text">One growth workspace.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              AASANI plugs into company databases and business systems so leaders
              see revenue, operations, and customers in one live platform—and act
              before the opportunity disappears.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact">Request Demo</Button>
              <Button to="/experience" variant="secondary">
                Try the platform
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              {[
                "Read-only DB connectors",
                "Works with Postgres & Snowflake",
                "Board-ready reports",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <HeroProductPreview />
        </Container>
      </section>

      <section className="overflow-hidden border-y border-border bg-white py-10">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Built for modern operators
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee gap-12 px-6">
            {[...trustedOrganizations, ...trustedOrganizations].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-sm font-semibold tracking-tight text-slate-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-20 lg:py-24">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="How it works"
            title="From database connection to business clarity"
            description="Three steps. No multi-year BI rebuild. AASANI becomes the layer that turns stored data into decisions."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {connectSteps.map((item, i) => {
              const icons = [Server, Link2, LineChart];
              const Icon = icons[i];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-elevated relative rounded-2xl border border-border bg-surface-muted p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-primary">
                      {item.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <MetricsSection />

      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="The story"
            title="From chaos in the warehouse to decisions at the board table"
          />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {story.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <span
                  className={`rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm ${
                    i === 3
                      ? "border-primary/30 bg-primary text-white shadow-[0_8px_24px_rgba(37,99,235,0.25)]"
                      : "border-border bg-white text-ink"
                  }`}
                >
                  {step}
                </span>
                {i < story.length - 1 && (
                  <span className="hidden text-muted sm:inline" aria-hidden>
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section ref={problemRef} className="bg-surface-muted py-24 lg:py-32">
        <Container>
          <SectionHeader
            eyebrow="The problem"
            title="Your business already has the data—it's just locked away"
            description="CRMs, ERPs, product DBs, billing, and warehouses each hold part of the truth. AASANI unifies them for every leader who needs to grow the company."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {problemPoints.map((point, i) => {
              const Icon = problemIcons[i];
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={problemVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="card-elevated group rounded-2xl border border-border bg-white p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{point.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mesh-dark noise mt-16 overflow-hidden rounded-[28px] px-8 py-16 text-center text-white lg:px-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300/90">
              The shift
            </p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Connect once.
              <br className="hidden sm:block" /> Grow with every query.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              AASANI sits above your stacks—pulling live signals from the databases that
              already power the business, then delivering one workspace your entire
              leadership team can trust.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to="/platform" variant="dark">
                Explore the platform
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeader
            eyebrow="Platform architecture"
            title="Databases in. Decisions out."
            description="Secure connectors, a unified business model, and an executive workspace—without rebuilding your data estate."
            align="center"
          />
          <div className="mt-16">
            <ArchitectureScroll />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-muted py-24 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="Outcomes"
            title="What companies gain with AASANI"
            description="Built for founders, COOs, CFOs, and data teams who need growth clarity—not another disconnected dashboard."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {outcomes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-elevated rounded-2xl border border-border bg-white p-8"
              >
                <p className="text-sm font-semibold text-primary">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <div className="card-elevated-lg relative overflow-hidden rounded-[28px] border border-border bg-white px-8 py-16 text-center lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <SectionHeader
              align="center"
              eyebrow="Experience AASANI"
              title="Watch your stack come online"
              description="Simulate connecting company databases, syncing live metrics, and opening a full business intelligence workspace."
            />
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Button to="/experience">
                Launch experience
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/contact" variant="secondary">
                Talk to sales
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
