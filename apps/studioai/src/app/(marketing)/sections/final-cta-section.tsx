"use client";

import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";
import { Badge } from "@repo/ui-core/components/badge";
import { RiArrowRightLine } from "@remixicon/react";
import { finalCta } from "@/config/landing-content";

export function FinalCtaSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {finalCta.badge}
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {finalCta.headline}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {finalCta.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" asChild>
              <Link href={finalCta.cta.primary.href}>
                {finalCta.cta.primary.text}
                <RiArrowRightLine className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
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
