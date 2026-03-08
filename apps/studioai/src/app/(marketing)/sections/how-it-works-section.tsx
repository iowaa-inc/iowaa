"use client";

import { Badge } from "@repo/ui-core/components/badge";
import { howItWorks } from "@/config/landing-content";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {howItWorks.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {howItWorks.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {howItWorks.sectionDescription}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-16">
            {howItWorks.steps.map((step, index) => (
              <div
                key={index}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Step number badge */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-4 border-background z-10">
                  {step.step}
                </div>

                {/* Content */}
                <div
                  className={`pl-24 md:pl-0 ${
                    index % 2 === 0
                      ? "md:pr-12 md:text-right md:order-1"
                      : "md:pl-12 md:order-2"
                  }`}
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Image slot */}
                <div
                  className={`${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="relative aspect-4/3 rounded-xl border border-border bg-muted/50 overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-muted-foreground/50 text-sm">
                        [{step.imageSlot}]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
