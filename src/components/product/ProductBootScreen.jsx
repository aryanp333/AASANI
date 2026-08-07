import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Shield, Hospital } from "lucide-react";
import { useProductBoot } from "../../hooks/useProductBoot";
import { bootSystems } from "../../data/workspaceMock";

export function ProductBootScreen({ onComplete }) {
  const { phase, connected, isReady } = useProductBoot(true);
  const progress =
    phase === "ready"
      ? 100
      : phase === "sync"
        ? 88
        : Math.round((connected.length / Math.max(bootSystems.length, 1)) * 78);

  useEffect(() => {
    if (!isReady || !onComplete) return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [isReady, onComplete]);

  return (
    <div className="mesh-dark noise relative flex min-h-screen flex-col items-center justify-center px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold shadow-[0_12px_40px_rgba(37,99,235,0.4)]">
          A
        </div>
        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-teal-300/90">
          AASANI secure connectors
        </p>
        <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          {phase === "sync" && "Normalising clinical & operational streams"}
          {phase === "connecting" && "Connecting your healthcare ecosystem"}
          {phase === "ready" && "Executive workspace ready"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-slate-400">
          Establishing secure connectors across EHR, revenue cycle, scheduling, lab, HR, patient
          experience, and FHIR.
        </p>

        <div className="mt-8 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-slate-500">{progress}% complete</p>

        <ul className="mt-8 space-y-2.5">
          {connected.map((name) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300">
                <Check className="h-4 w-4" />
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-slate-100">
                <Hospital className="h-3.5 w-3.5 text-slate-400" />
                {name}
              </span>
              <span className="ml-auto text-[11px] font-medium text-teal-300/80">Connected</span>
            </motion.li>
          ))}
          {phase === "connecting" && connected.length < bootSystems.length && (
            <li className="flex items-center gap-3 px-4 py-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Authenticating connector…
            </li>
          )}
        </ul>

        <AnimatePresence>
          {(phase === "sync" || isReady) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-300"
            >
              {phase === "sync" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                  Building unified health data model…
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 text-teal-300" />
                  Access policies applied · launching workspace
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
