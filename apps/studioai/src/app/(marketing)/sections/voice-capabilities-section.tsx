import {
  RiCheckLine,
} from "@remixicon/react";

import { voiceLibrary } from "@/config/landing-content";

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceCapabilitiesSection() {
  const features = voiceLibrary.features as readonly { title: string; description: string }[];
  const [featHero, ...featRest] = features;

  return (
    <section id="voice-capabilities" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-10">

        {/* Section header */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Platform Features</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-xl">
              Built for authentic, global production
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm md:text-right shrink-0">
              Every feature engineered to keep voices sounding natural across languages, regions, and formats.
            </p>
          </div>
        </div>

        {/* Bento: hero left (7/12) + 3 compact stacked right (5/12) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

          {/* Hero feature */}
          <div className="md:col-span-7 flex flex-col rounded-2xl border border-border overflow-hidden">
            <div className="flex-1 min-h-[280px] md:min-h-[400px] bg-foreground/20" />
            <div className="p-6 flex flex-col gap-2.5 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                  <RiCheckLine className="w-3 h-3" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Feature</span>
              </div>
              <h3 className="text-xl font-semibold">{featHero!.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{featHero!.description}</p>
            </div>
          </div>

          {/* 3 compact features */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {featRest.map((feat) => (
              <div key={feat.title} className="flex-1 flex flex-col rounded-2xl border border-border overflow-hidden">
                <div className="flex-1 min-h-[100px] bg-foreground/20" />
                <div className="p-5 flex flex-col gap-1.5 border-t border-border">
                  <h3 className="text-base font-semibold">{feat.title}</h3>
                  <p className="text-base text-muted-foreground leading-snug">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
