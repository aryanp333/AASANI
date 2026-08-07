import { Link } from "react-router-dom";
import { Container } from "./Container";

const columns = [
  {
    title: "Product",
    links: [
      { to: "/platform", label: "Platform" },
      { to: "/solutions", label: "Solutions" },
      { to: "/integrations", label: "Integrations" },
      { to: "/experience", label: "Experience AASANI" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/security", label: "Security" },
      { to: "/pricing", label: "Pricing" },
      { to: "/resources", label: "Resources" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0b1220] text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold">
              A
            </span>
            <p className="text-lg font-bold tracking-tight">AASANI</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            AASANI integrates with company databases and business systems to deliver a
            single intelligence workspace—so teams grow revenue, cut waste, and decide
            with live truth.
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Your data. Connected. Actionable.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AASANI. All rights reserved.
      </div>
    </footer>
  );
}
