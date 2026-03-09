"use client";

import Link from "next/link";
import { Button } from "@repo/ui-core/components/button";
import { Badge } from "@repo/ui-core/components/badge";
import { hero } from "@/config/landing-content";
import {
  RiBookOpenLine,
  RiMicLine,
  RiPlayLine,
  RiGamepadLine,
  RiArrowRightLine,
} from "@remixicon/react";

const PRODUCTION_ICONS = {
  book:    RiBookOpenLine,
  mic:     RiMicLine,
  play:    RiPlayLine,
  gamepad: RiGamepadLine,
} as const;

// ─── Section ──────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section id="hero" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Left: text block ────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-8 lg:pt-6">

            {/* Badge */}
            <Badge variant="secondary" className="w-fit p-4 text-sm">
              {hero.badge}
            </Badge>

            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.1]">
                {hero.headline}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                {hero.subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button size="default" asChild className="gap-2">
                <Link href={hero.cta.primary.href}>
                  {hero.cta.primary.text}
                  <RiArrowRightLine className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="default" variant="outline" asChild>
                <Link href={hero.cta.secondary.href}>
                  {hero.cta.secondary.text}
                </Link>
              </Button>
            </div>

            {/* Production type chips */}
            <div className="flex flex-col gap-2.5">
              <p className="text-sm text-muted-foreground">
                {hero.productionTypes.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {hero.productionTypes.items.map((item) => {
                  const Icon = PRODUCTION_ICONS[item.icon as keyof typeof PRODUCTION_ICONS];
                  return (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-2 border-t border-border">
              {hero.stats.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: image panel ──────────────────────────────────── */}
          <div className="w-full lg:w-[50%] shrink-0">
            <div className="flex flex-col gap-3">

              {/* Main wide image */}
              <div className="w-full aspect-4/3 rounded-2xl bg-muted border border-border" />

              {/* Two small images beneath */}
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-4/3 rounded-xl bg-muted border border-border" />
                <div className="aspect-4/3 rounded-xl bg-muted border border-border" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
