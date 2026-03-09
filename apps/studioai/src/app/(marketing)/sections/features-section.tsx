"use client";

import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { Button } from "@repo/ui-core/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@repo/ui-core/components/carousel";
import { features } from "@/config/landing-content";

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
        >
          {/* Header row with title + arrows in the same flex row */}
          <div className="flex items-end justify-between gap-8 mb-12">
            {/* Left: eyebrow + heading */}
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {features.sectionBadge}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
                {features.sectionTitle}
              </h2>
            </div>

            {/* Right: nav arrows — wired to Embla via context */}
            <div className="flex items-center gap-2 shrink-0 pb-1">
              <CarouselNavPrev />
              <CarouselNavNext />
            </div>
          </div>

          {/* Carousel track */}
          <CarouselContent className="-ml-6">
            {features.items.map((feature, i) => (
              <CarouselItem
                key={i}
                className="pl-6 basis-[400px] md:basis-[440px] lg:basis-[420px]"
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

// ─── Custom nav buttons (consume CarouselContext) ─────────────────────────────

function CarouselNavPrev() {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
    className="rounded-full"
      id="features-prev"
      aria-label="Previous features"
      variant="outline"
      size="icon-lg"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <RiArrowLeftLine />
    </Button>
  );
}

function CarouselNavNext() {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
    className="rounded-full"
      id="features-next"
      aria-label="Next features"
      variant="outline"
      size="icon-lg"
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <RiArrowRightLine />
    </Button>
  );
}

// ─── FeatureCard ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Image well — muted surface, ready for a real <Image /> drop-in */}
      <div
        className="
          relative w-full rounded-xl overflow-hidden
          bg-foreground/10
          aspect-4/5
          mb-5
          transition-transform duration-300 ease-out
          group-hover:-translate-y-1
        "
        aria-hidden
      />

      {/* Text */}
      <div className="space-y-2 px-1">
        <h3 className="text-base font-semibold leading-snug">{title}.</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
