import { motion } from "framer-motion";
import clsx from "clsx";

export function ProgressBar({ value, className, delay = 0 }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={clsx(
        "h-2 w-full overflow-hidden rounded-full bg-border/80",
        className,
      )}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
