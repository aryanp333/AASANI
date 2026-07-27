import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import clsx from "clsx";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors overflow-hidden";

const variants = {
  primary:
    "bg-primary text-bg px-6 py-3 hover:bg-accent shadow-glow",
  secondary:
    "border border-border bg-card/50 text-white px-6 py-3 hover:border-primary/50 hover:bg-card",
  ghost: "text-muted hover:text-white px-4 py-2",
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
  const classes = clsx(base, variants[variant], className);

  const content = (
    <>
      <motion.span
        className="absolute inset-0 bg-white/10 opacity-0"
        whileTap={{ opacity: 1, scale: 2 }}
        transition={{ duration: 0.4 }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={classes} onClick={onClick} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
