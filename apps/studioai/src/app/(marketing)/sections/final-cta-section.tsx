"use client";

import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";
import { RiArrowRightLine } from "@remixicon/react";
import { finalCta } from "@/config/landing-content";

export function FinalCtaSection() {
  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {finalCta.badge}
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
            {finalCta.headline}
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {finalCta.subheadline}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="default" asChild className="gap-2">
              <Link href={finalCta.cta.primary.href}>
                {finalCta.cta.primary.text}
                <RiArrowRightLine className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="default" variant="outline" asChild>
              <Link href={finalCta.cta.secondary.href}>
                {finalCta.cta.secondary.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
