import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import clsx from "clsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/simulation", label: "Simulation" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30">
            A
          </span>
          <span className="text-lg font-semibold tracking-tight text-white group-hover:text-accent transition-colors">
            AASANI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                clsx(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-muted hover:text-white",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/simulation" variant="primary" className="!py-2.5 !px-5 text-sm">
            Start Project
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-muted hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive ? "bg-card text-white" : "text-muted",
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Button to="/simulation" className="mt-2 w-full" onClick={closeMenu}>
                Start Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
