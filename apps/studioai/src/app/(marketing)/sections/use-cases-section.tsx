"use client";

import React, { useState, useEffect } from "react";
import {
  RiCheckLine,
  RiBookOpenLine,
  RiMicLine,
  RiGraduationCapLine,
  RiGamepadLine,
  RiVideoLine,
  RiFileTextLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { Button } from "@repo/ui-core/components/button";
import { Badge } from "@repo/ui-core/components/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  useCarousel,
} from "@repo/ui-core/components/carousel";
import { useCases } from "@/config/landing-content";

// ─── Icon map keyed by category ───────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Publishing:    RiBookOpenLine,
  "Content Creation": RiMicLine,
  Education:     RiGraduationCapLine,
  Entertainment: RiGamepadLine,
  Marketing:     RiVideoLine,
  Business:      RiFileTextLine,
};

// ─── Section ──────────────────────────────────────────────────────────────────

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useCases.cases[activeIndex]!;

  return (
    <section id="use-cases" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-12">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4">
          <Badge variant="secondary" className="w-fit">
            {useCases.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
            {useCases.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {useCases.sectionDescription}
          </p>
        </div>


        {/* ── Desktop layout ──────────────────────────────────────── */}
        <div className="hidden md:flex flex-col gap-0 rounded-2xl border border-border overflow-hidden">

          {/* Tab strip */}
          <div className="flex border-b border-border bg-muted/40">
            {useCases.cases.map((c, i) => {
              const Icon = CATEGORY_ICONS[c.category] ?? RiFileTextLine;
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`
                    flex-1 flex flex-col items-center gap-2 px-4 py-5
                    text-center transition-colors duration-150
                    focus-visible:outline-none
                    ${isActive
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }
                  `}
                >
                  <span
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-xl
                      transition-colors duration-150
                      ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {c.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div className="flex min-h-[720px]">
            {/* Left: text */}
            <div className="flex flex-col justify-center gap-6 px-10 py-10 w-[38%] shrink-0">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight leading-snug">
                  {active.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </div>

              {/* Bullet benefits */}
              <ul className="flex flex-col gap-2">
                {active.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <RiCheckLine className="mt-0.5 shrink-0 w-4 h-4 text-primary" />
                    <span className="text-base text-muted-foreground leading-snug">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <Button variant="default" size="lg">
                  See use case
                </Button>
              </div>
            </div>

            {/* Right: image */}
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="aspect-square h-full max-h-full rounded-xl bg-muted" />
            </div>
          </div>
        </div>

        {/* ── Mobile layout — Carousel ─────────────────────────── */}
        <div className="md:hidden flex flex-col gap-5">
          <Carousel opts={{ align: "start" }}>

            {/* Category badge selector — inside Carousel so it can use context */}
            <MobileCarouselBadges />

            {/* Cards */}
            <CarouselContent className="-ml-4">
              {useCases.cases.map((c, i) => {
                const Icon = CATEGORY_ICONS[c.category] ?? RiFileTextLine;
                return (
                  <CarouselItem
                    key={i}
                    className="pl-4 basis-[80vw] sm:basis-[60vw]"
                  >
                    <div className="flex flex-col rounded-2xl border border-border overflow-hidden bg-background h-full">
                      {/* Card header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-2.5">
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-base font-semibold">{c.category}</span>
                        </div>
                        <Button variant="default" size="sm">
                          See use case
                        </Button>
                      </div>

                      {/* Image placeholder */}
                      <div className="w-full aspect-4/3 bg-muted" />

                      {/* Text */}
                      <div className="flex flex-col gap-3 p-4">
                        <h3 className="text-base font-semibold leading-snug">
                          {c.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {c.description}
                        </p>

                        {/* Bullet benefits */}
                        <ul className="flex flex-col gap-2 pt-1">
                          {c.benefits.map((benefit, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <RiCheckLine className="mt-0.5 shrink-0 w-4 h-4 text-primary" />
                              <span className="text-base text-muted-foreground leading-snug">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Arrow nav — bottom row */}
            <MobileCarouselArrows />

          </Carousel>
        </div>

      </div>
    </section>
  );
}

// ─── MobileCarouselBadges ─────────────────────────────────────────────────────
// Must be rendered inside <Carousel> to access context via useCarousel()

function MobileCarouselBadges() {
  const { api } = useCarousel();
  const [current, setCurrent] = useState(0);

  // Sync active badge with Embla scroll position
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex gap-3 flex-wrap pb-1 mb-4">
      {useCases.cases.map((c, i) => (
        <button
          key={i}
          onClick={() => api?.scrollTo(i)}
          className={`
            shrink-0 px-3 py-2 rounded-full text-sm font-medium
            transition-colors duration-150 border
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            ${current === i
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
            }
          `}
        >
          {c.category}
        </button>
      ))}
    </div>
  );
}

// ─── MobileCarouselArrows ─────────────────────────────────────────────────────

function MobileCarouselArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  return (
    <div className="flex items-center justify-end gap-2 mt-5">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous use case"
        className="
          flex items-center justify-center w-9 h-9 rounded-full
          border border-border text-foreground bg-background
          transition-colors hover:border-foreground/60 hover:bg-muted
          disabled:opacity-30 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        <RiArrowLeftLine className="w-4 h-4" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next use case"
        className="
          flex items-center justify-center w-9 h-9 rounded-full
          border border-border text-foreground bg-background
          transition-colors hover:border-foreground/60 hover:bg-muted
          disabled:opacity-30 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        <RiArrowRightLine className="w-4 h-4" />
      </button>
    </div>
  );
}
