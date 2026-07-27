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
    <footer className="border-t border-border bg-surface-muted">
      <Container className="grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-semibold text-ink">AASANI</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            The Healthcare Intelligence Platform. A secure cloud layer that unifies
            operational, financial, and clinical data—without replacing the systems
            you already run.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
            Healthcare Intelligence. Connected.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} AASANI. All rights reserved.
      </div>
    </footer>
  );
}
