"use client";

import {
  RiBookOpenLine,
  RiMicLine,
  RiPlayLine,
  RiGamepadLine,
} from "@remixicon/react";
import { hero } from "@/config/landing-content";

const iconMap = {
  book: RiBookOpenLine,
  mic: RiMicLine,
  play: RiPlayLine,
  gamepad: RiGamepadLine,
} as const;

export function ProductionTypesSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Label */}
          <p className="text-base text-muted-foreground max-w-2xl">
            {hero.productionTypes.label}
          </p>

          {/* Production Type Icons */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {hero.productionTypes.items.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 rounded-lg bg-muted/50 border border-border group-hover:border-primary/50 transition-colors">
                    <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
