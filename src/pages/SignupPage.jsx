import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { signup } from "../services/authService";

const orgTypes = [
  "Community Hospital",
  "Academic Medical Center",
  "Multi-Specialty Clinic",
  "Health System",
  "Ambulatory Network",
];

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    orgName: "",
    orgType: orgTypes[0],
    bedCount: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup({
        email: form.email,
        password: form.password,
        orgName: form.orgName,
        orgType: form.orgType,
        bedCount: form.bedCount ? Number(form.bedCount) : undefined,
      });
      navigate("/experience", { replace: true });
    } catch (err) {
      setError(err.message || "Couldn't create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mesh-light pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Get started"
          title="Create your AASANI workspace"
          description="Set up your organization and start connecting live data in minutes."
        />
        <div className="mt-12 max-w-md">
          <form
            onSubmit={handleSubmit}
            className="card-elevated space-y-5 rounded-2xl border border-border bg-white p-8"
          >
            {error && (
              <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            )}
            <Field
              label="Work email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@healthsystem.org"
              autoComplete="email"
            />
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={update("password")}
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={8}
            />
            <Field
              label="Organization name"
              value={form.orgName}
              onChange={update("orgName")}
              placeholder="Northbridge Health System"
            />
            <label className="block">
              <span className="text-sm font-medium text-muted">Organization type</span>
              <select
                required
                value={form.orgType}
                onChange={update("orgType")}
                className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {orgTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Bed count"
              type="number"
              min="1"
              value={form.bedCount}
              onChange={update("bedCount")}
              placeholder="250"
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              <UserPlus className="h-4 w-4" />
              {submitting ? "Creating workspace…" : "Create Workspace"}
            </Button>
            <p className="text-center text-sm text-muted">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-muted">{label}</span>
      <input
        required
        className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        {...props}
      />
    </label>
  );
}
