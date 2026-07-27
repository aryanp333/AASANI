import { motion } from "framer-motion";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Container, SectionHeader } from "../components/layout/Container";
import { pricingTiers } from "../data/platform";
import { Button } from "../components/ui/Button";

export function PricingPage() {
  return (
    <div className="pt-28 pb-24">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title="Enterprise programs for health systems"
          description="Transparent partnership models—scoped to your integration complexity, user footprint, and governance requirements."
          align="center"
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              whileHover={{ y: -4 }}
              className={clsx(
                "flex flex-col rounded-2xl border p-8 card-elevated",
                tier.featured
                  ? "border-primary bg-white ring-2 ring-primary/20"
                  : "border-border bg-white",
              )}
            >
              {tier.featured && (
                <span className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Most selected
                </span>
              )}
              <h3 className="text-xl font-bold text-ink">{tier.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {tier.description}
              </p>
              <p className="mt-6 text-3xl font-bold text-ink">{tier.price}</p>
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                to="/contact"
                variant={tier.featured ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Contact sales
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
