"use client";

import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";
import { Badge } from "@repo/ui-core/components/badge";
import { hero } from "@/config/landing-content";
import { Separator } from "@repo/ui-core/components/separator";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center py-24 md:py-32 lg:py-40 lg:pb-20 space-y-12">
          {/* Badge */}
          <Badge variant="secondary" className="p-4 text-sm">
            {hero.badge}
          </Badge>

          {/* Headline */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {hero.subheadline}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" asChild>
              <Link href={hero.cta.primary.href}>
                {hero.cta.primary.text}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={hero.cta.secondary.href}>
                {hero.cta.secondary.text}
              </Link>
            </Button>
          </div>

          <Separator className="max-w-xl mx-auto" />
          
          {/* Stats */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {hero.stats.map((stat) => (
            <div key={stat.value} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

          {/* Image/Video slot */}
          <div className="w-full max-w-5xl">
            <div className="relative aspect-video rounded-xl border border-border bg-muted/50 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground/50 text-sm">
                  [Hero Demo Video/Screenshot]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
