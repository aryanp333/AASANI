import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { howItWorksSteps } from "../../data/home";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export function HowItWorks() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How AASANI Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            From file upload to executive dashboard—every step handled by people,
            not algorithms.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center lg:gap-4">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center lg:flex-row">
                <motion.div
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={
                    visible
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 32, scale: 0.96 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass shadow-soft w-full max-w-sm rounded-2xl p-8 lg:max-w-xs"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </motion.div>
                {index < howItWorksSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.2 }}
                    className="flex py-2 text-primary lg:px-3 lg:py-0"
                    aria-hidden
                  >
                    <ChevronDown className="h-6 w-6 rotate-90 lg:rotate-0" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
