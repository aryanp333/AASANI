import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Mail, Send } from "lucide-react";
import { faqItems } from "../data/faq";
import { Button } from "../components/ui/Button";
import clsx from "clsx";

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start a conversation
          </h1>
          <p className="mt-4 text-muted">
            Tell us about your data and goals. We will respond within one
            business day.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass shadow-soft space-y-5 rounded-2xl border border-border p-8 lg:col-span-3"
          >
            {submitted ? (
              <p className="py-8 text-center text-white">
                Thank you—we will be in touch shortly. (Demo form, no backend.)
              </p>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-muted">Name</span>
                    <input
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                      placeholder="Jane Smith"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted">Company</span>
                    <input
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                      placeholder="Acme Ltd"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm text-muted">Email</span>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-muted">Message</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    placeholder="Describe your data and what you need from analytics…"
                  />
                </label>
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  Send message
                </Button>
              </>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="glass shadow-soft rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 text-white">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-semibold">Company email</span>
              </div>
              <a
                href="mailto:hello@aasani.com"
                className="mt-3 block text-accent hover:underline"
              >
                hello@aasani.com
              </a>
            </div>
            <div className="glass shadow-soft rounded-2xl border border-border p-6">
              <p className="font-semibold text-white">Prefer a call?</p>
              <p className="mt-2 text-sm text-muted">
                Book a consultation with our team to scope your first project.
              </p>
              <Button
                href="mailto:hello@aasani.com?subject=Book%20Consultation"
                variant="secondary"
                className="mt-4 w-full"
              >
                <Calendar className="h-4 w-4" />
                Book Consultation
              </Button>
            </div>
          </motion.aside>
        </div>

        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white">FAQ</h2>
          <ul className="mt-8 space-y-3">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <li
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-border bg-card/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-white">{item.q}</span>
                    <ChevronDown
                      className={clsx(
                        "h-5 w-5 shrink-0 text-muted transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="border-t border-border px-6 pb-5 pt-2 text-sm leading-relaxed text-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
