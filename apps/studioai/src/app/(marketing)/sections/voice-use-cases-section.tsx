import {
  RiMicLine,
  RiBookOpenLine,
  RiGlobalLine,
  RiArchiveLine,
  RiArrowRightLine,
} from "@remixicon/react";

import { Button } from "@repo/ui-core/components/button";
import { voiceLibrary } from "@/config/landing-content";

const ICON_MAP = {
  mic:     RiMicLine,
  book:    RiBookOpenLine,
  global:  RiGlobalLine,
  archive: RiArchiveLine,
} as const;

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceUseCasesSection() {
  const useCases = voiceLibrary.useCases as readonly {
    title: string;
    description: string;
    icon: string;
  }[];

  return (
    <section id="voice-use-cases" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-12">

        {/* Header — two columns: label+title left, cta right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Who It&apos;s For</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              Perfect for diverse content creation
            </h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs sm:text-right shrink-0 sm:pb-1">
            From independent creators to global enterprises—every use case, one platform.
          </p>
        </div>

        {/* 4-column equal strip — each use case gets a tall portrait card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {useCases.map((useCase, index) => {
            const Icon = ICON_MAP[useCase.icon as keyof typeof ICON_MAP];
            return (
              <div
                key={useCase.title}
                className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-background"
              >
                {/* Image — tall portrait, fills top of card */}
                <div className="w-full aspect-3/4 bg-muted relative overflow-hidden">
                  {/* Index label — top-left corner */}
                  <span className="absolute top-4 left-4 text-xs font-mono text-muted-foreground tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                {/* Text footer */}
                <div className="p-5 flex flex-col gap-3 border-t border-border flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold leading-snug">{useCase.title}</h3>
                    {Icon && (
                      <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground leading-snug flex-1">
                    {useCase.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <Button variant="outline" className="gap-2">
            Explore all use cases
            <RiArrowRightLine className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}
