import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send } from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { Button } from "../components/ui/Button";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Partner with AASANI"
          description="Request a demo or book a consultation with our healthcare intelligence team. We respond within one business day."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="card-elevated space-y-5 rounded-2xl border border-border bg-white p-8 lg:col-span-3"
          >
            {sent ? (
              <p className="py-12 text-center text-ink">
                Thank you. A member of our team will contact you shortly.
              </p>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" placeholder="Jordan Lee" />
                  <Field label="Organisation" placeholder="Northbridge Health" />
                </div>
                <Field label="Work email" type="email" placeholder="jordan.lee@health.org" />
                <Field label="Role" placeholder="Chief Operating Officer" />
                <label className="block">
                  <span className="text-sm font-medium text-muted">How can we help?</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Describe your systems, priorities, and timeline…"
                  />
                </label>
                <Button type="submit">
                  <Send className="h-4 w-4" /> Request Demo
                </Button>
              </>
            )}
          </motion.form>
          <aside className="space-y-6 lg:col-span-2">
            <div className="card-elevated rounded-2xl border border-border bg-surface-muted p-8">
              <h3 className="font-semibold text-ink">Enterprise sales</h3>
              <p className="mt-2 text-sm text-muted">hello@aasani.com</p>
            </div>
            <div className="card-elevated rounded-2xl border border-border bg-white p-8">
              <h3 className="font-semibold text-ink">Executive consultation</h3>
              <p className="mt-2 text-sm text-muted">
                A 45-minute session to map your data estate and executive KPIs.
              </p>
              <Button
                href="mailto:hello@aasani.com?subject=Book%20Consultation"
                variant="secondary"
                className="mt-6 w-full"
              >
                <Calendar className="h-4 w-4" /> Book Consultation
              </Button>
            </div>
          </aside>
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
