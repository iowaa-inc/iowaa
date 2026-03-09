"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";
import { RiCheckLine, RiArrowRightLine } from "@remixicon/react";
import { pricing } from "@/config/landing-content";
import { Badge } from "@repo/ui-core/components/badge";

// ─── Section ──────────────────────────────────────────────────────────────────

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {pricing.sectionBadge}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
            {pricing.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {pricing.sectionDescription}
          </p>

          {/* Monthly / Annual toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-muted/40 mt-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                !isAnnual
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isAnnual
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => {
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const monthlyEquiv =
              plan.price.annual != null
                ? Math.round((plan.price.annual as number) / 12)
                : null;

            return (
              <div
                key={index}
                className={`relative flex flex-col rounded-2xl border p-6 gap-6 ${
                  plan.highlighted
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                {/* Most Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}

                {/* Plan name + description */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-base text-muted-foreground leading-snug">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  {price != null ? (
                    <>
                      <span className="text-4xl font-semibold tracking-tight">
                        ${isAnnual ? monthlyEquiv : price}
                      </span>
                      <span className="text-base text-muted-foreground">
                        /month
                      </span>
                      {isAnnual && (
                        <span className="text-sm text-muted-foreground ml-1">
                          billed annually
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-semibold tracking-tight">
                      Custom
                    </span>
                  )}
                </div>

                {/* CTA button */}
                <Button
                  asChild
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  <Link href={plan.cta.href}>{plan.cta.text}</Link>
                </Button>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <RiCheckLine className="mt-0.5 shrink-0 w-4 h-4 text-primary" />
                      <span className="text-base text-muted-foreground leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

        {/* See full pricing link */}
        <div className="flex justify-center mt-10">
          <Button variant="ghost" asChild className="gap-1.5 text-muted-foreground hover:text-foreground">
            <Link href="/pricing">
              See full pricing details
              <RiArrowRightLine className="w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
