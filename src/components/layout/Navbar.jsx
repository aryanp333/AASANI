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
          ? "border-b border-border/80 bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
            A
          </span>
          <div className="leading-tight">
            <span className="block text-base font-semibold tracking-tight text-ink">
              AASANI
            </span>
            <span className="hidden text-[11px] font-medium text-muted sm:block">
              Healthcare Intelligence. Connected.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted hover:text-ink",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/contact" variant="secondary" className="!py-2.5 !px-4">
            Request Demo
          </Button>
          <Button to="/experience" className="!py-2.5 !px-4">
            Experience AASANI
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted"
                >
                  {label}
                </NavLink>
              ))}
              <Button to="/experience" className="mt-2" onClick={() => setOpen(false)}>
                Experience AASANI
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
