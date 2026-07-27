import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

const styles = {
  primary:
    "bg-primary text-white shadow-[0_8px_30px_rgba(37,99,235,0.25)] hover:bg-blue-600",
  secondary:
    "bg-white text-ink border border-border hover:border-primary/30 hover:shadow-md",
  ghost: "text-muted hover:text-ink",
  dark: "bg-white/10 text-white border border-white/20 hover:bg-white/15",
};

export function Button({
  children,
  variant = "primary",
  to,
  href,
  className,
  onClick,
  type = "button",
  ...props
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all",
    styles[variant],
    className,
  );

  const inner = (
    <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {inner}
    </button>
  );
}
