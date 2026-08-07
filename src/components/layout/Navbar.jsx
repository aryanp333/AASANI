import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Button } from "../ui/Button";
import { Container } from "./Container";

const links = [
  { to: "/platform", label: "Platform" },
  { to: "/solutions", label: "Solutions" },
  { to: "/integrations", label: "Integrations" },
  { to: "/security", label: "Security" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-[4.25rem] items-center gap-6 lg:h-[4.75rem] lg:gap-8 xl:gap-10">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1d4ed8] text-sm font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)]">
            A
          </span>
          <div className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight text-ink">
              AASANI
            </span>
            <span className="hidden text-[10px] font-medium tracking-wide text-muted sm:block">
              Healthcare Intelligence
            </span>
          </div>
        </Link>

        {/* Nav + CTAs as a right cluster with explicit gap */}
        <div className="ml-auto flex min-w-0 items-center gap-6 lg:gap-8 xl:gap-10">
          <nav className="hidden items-center gap-1 lg:gap-2 xl:flex">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    "rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors whitespace-nowrap xl:px-3",
                    isActive
                      ? "bg-primary/8 text-primary"
                      : "text-muted hover:bg-surface-muted hover:text-ink",
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Visual separator before buttons (xl+) */}
          <div
            className="hidden h-6 w-px shrink-0 bg-border xl:block"
            aria-hidden
          />

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <Button
              to="/contact"
              variant="secondary"
              className="!px-4 !py-2.5 !text-[13px]"
            >
              Request Demo
            </Button>
            <Button to="/experience" className="!px-4 !py-2.5 !text-[13px]">
              Experience AASANI
            </Button>
          </div>

          <button
            type="button"
            className="rounded-xl p-2 text-muted transition hover:bg-surface-muted hover:text-ink xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-white xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-muted"
                >
                  {label}
                </NavLink>
              ))}
              <div className="mt-3 grid gap-2">
                <Button
                  to="/contact"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Request Demo
                </Button>
                <Button to="/experience" onClick={() => setOpen(false)}>
                  Experience AASANI
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
