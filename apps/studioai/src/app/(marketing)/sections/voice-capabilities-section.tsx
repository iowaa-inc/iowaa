import {
  RiCheckLine,
  RiMicLine,
  RiBookOpenLine,
  RiGlobalLine,
  RiArchiveLine,
} from "@remixicon/react";
import { Badge } from "@repo/ui-core/components/badge";
import { voiceLibrary } from "@/config/landing-content";

const ICON_MAP = {
  mic:     RiMicLine,
  book:    RiBookOpenLine,
  global:  RiGlobalLine,
  archive: RiArchiveLine,
} as const;

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceCapabilitiesSection() {
  return (
    <section id="voice-capabilities" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-20">

        {/* ── Platform features ─────────────────────────────────────── */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <Badge variant="secondary" className="w-fit">Platform Features</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              Built for authentic, global production
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every feature engineered to keep voices sounding natural across languages, regions, and content types.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border rounded-2xl overflow-hidden bg-border">
            {voiceLibrary.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 p-6 bg-background"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                  <RiCheckLine className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use cases ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <Badge variant="secondary" className="w-fit">Who It&apos;s For</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              Perfect for diverse content creation
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              From individual creators to global enterprises — the voice library scales to every use case.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border rounded-2xl overflow-hidden bg-border">
            {voiceLibrary.useCases.map((useCase) => {
              const Icon = ICON_MAP[useCase.icon as keyof typeof ICON_MAP];
              return (
                <div
                  key={useCase.title}
                  className="flex flex-col gap-4 p-6 bg-background"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                    {Icon && <Icon className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">{useCase.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
