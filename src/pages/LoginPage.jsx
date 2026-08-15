import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { login } from "../services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/experience", { replace: true });
    } catch (err) {
      setError(err.message || "Couldn't log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mesh-light pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Sign in"
          title="Log in to your workspace"
          description="Enter your credentials to open your organization's Executive Workspace."
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@healthsystem.org"
              autoComplete="email"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              <LogIn className="h-4 w-4" />
              {submitting ? "Logging in…" : "Log In"}
            </Button>
            <p className="text-center text-sm text-muted">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary">
                Create one
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
