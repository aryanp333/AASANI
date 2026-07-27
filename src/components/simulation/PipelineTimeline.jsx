import { motion } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";
import { pipelineStages } from "../../data/analysts";

export function PipelineTimeline({ activeIndex }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-px" />
      <ol className="space-y-4 md:space-y-0">
        {pipelineStages.map((stage, index) => {
          const active = index <= activeIndex;
          const current = index === activeIndex;
          return (
            <motion.li
              key={stage.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={clsx(
                "relative md:flex md:items-center md:gap-8",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              )}
            >
              <div className="hidden flex-1 md:block" />
              <div
                className={clsx(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500",
                  active
                    ? "border-primary bg-primary text-bg shadow-glow"
                    : "border-border bg-card text-muted",
                )}
              >
                {active && index < activeIndex ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div
                className={clsx(
                  "mt-3 flex-1 rounded-xl border p-4 transition-all duration-500 md:mt-0",
                  current
                    ? "border-primary/50 bg-primary/5 shadow-glow"
                    : active
                      ? "border-border bg-card/80"
                      : "border-border/60 bg-card/40 opacity-60",
                )}
              >
                <p
                  className={clsx(
                    "font-semibold",
                    active ? "text-white" : "text-muted",
                  )}
                >
                  {stage.label}
                </p>
                {index < pipelineStages.length - 1 && (
                  <p className="mt-1 hidden text-primary md:block">↓</p>
                )}
              </div>
              <div className="hidden flex-1 md:block" />
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
