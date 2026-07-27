import { Link } from "react-router-dom";
import { Mail, Share2 } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/simulation", label: "Simulation" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">AASANI</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Analytics as a Service. Human analysts transform your business data
            into dashboards, reports, and recommendations—using SQL, Python,
            Power BI, Tableau, and Excel.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            Connect
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <Share2 size={18} />
              LinkedIn
            </a>
            <a
              href="mailto:hello@aasani.com"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <Mail size={18} />
              hello@aasani.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} AASANI. All rights reserved.
      </div>
    </footer>
  );
}
