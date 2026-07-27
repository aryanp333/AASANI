import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useProductBoot } from "../../hooks/useProductBoot";

export function ProductBootScreen({ onComplete }) {
  const { phase, connected, isReady } = useProductBoot(true);

  useEffect(() => {
    if (!isReady || !onComplete) return;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [isReady, onComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1220] px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-teal-400">
          AASANI
        </p>
        <h1 className="mt-4 text-center text-2xl font-semibold tracking-tight">
          {phase === "sync" && "Synchronising…"}
          {phase === "connecting" && "Connecting to your healthcare ecosystem"}
          {phase === "ready" && "Executive workspace ready"}
        </h1>

        <ul className="mt-10 space-y-3">
          {connected.map((name) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <Check className="h-4 w-4 text-teal-400" />
              <span className="text-sm text-slate-200">{name}</span>
            </motion.li>
          ))}
          {phase === "connecting" && connected.length < 7 && (
            <li className="flex items-center gap-3 px-4 py-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Establishing secure connection…
            </li>
          )}
        </ul>

        <AnimatePresence>
          {phase === "sync" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex justify-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            </motion.div>
          )}
          {isReady && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center text-sm text-teal-300"
            >
              Preparing workspace…
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
