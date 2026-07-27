import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { companyValues } from "../data/home";
import { useScrollReveal } from "../hooks/useScrollReveal";

const workflow = [
  "Client uploads data",
  "Professional analysts work",
  "Business dashboards",
  "Recommendations",
];

export function AboutPage() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            About AASANI
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Analytics as a Service means
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            AASANI is not an AI analytics platform. We are a services company:
            you share business data, and our analysts—using SQL, Python, Power
            BI, Tableau, and Excel—deliver cleaned datasets, dashboards, and
            written recommendations your leadership team can trust.
          </p>
        </motion.div>

        <section ref={ref} className="mt-20">
          <h2 className="text-2xl font-bold text-white">The workflow</h2>
          <div className="mt-10 flex flex-col items-center gap-2 sm:gap-4">
            {workflow.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                className="flex w-full max-w-md flex-col items-center"
              >
                <div className="glass shadow-soft w-full rounded-2xl border border-border px-8 py-5 text-center font-medium text-white">
                  {step}
                </div>
                {i < workflow.length - 1 && (
                  <ArrowDown className="my-1 h-5 w-5 text-primary" aria-hidden />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white">Company values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {companyValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass shadow-soft rounded-2xl border border-border p-8"
              >
                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
