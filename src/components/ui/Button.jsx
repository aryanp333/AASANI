import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

const styles = {
  primary:
    "bg-primary text-white shadow-[0_10px_30px_rgba(37,99,235,0.28)] hover:bg-[#1d4ed8] hover:shadow-[0_14px_36px_rgba(37,99,235,0.32)]",
  secondary:
    "bg-white text-ink border border-border hover:border-primary/35 hover:bg-surface-muted hover:shadow-md",
  ghost: "text-muted hover:text-ink",
  dark: "bg-white/10 text-white border border-white/20 hover:bg-white/16",
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
    "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-200",
    styles[variant],
    className,
  );

  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      className="inline-flex items-center gap-2"
    >
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
