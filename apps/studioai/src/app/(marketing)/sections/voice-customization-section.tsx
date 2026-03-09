import { RiArrowRightLine, RiCheckLine } from "@remixicon/react";
import { voiceCustomization } from "@/config/landing-content";
import { Badge } from "@repo/ui-core/components/badge";
import { Button } from "@repo/ui-core/components/button";

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceCustomizationSection() {
  return (
    <section id="voice-direction" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header — left-aligned */}
        <div className="flex flex-col gap-4 mb-16 md:mb-20 max-w-2xl">
          <Badge variant="secondary" className="w-fit">
            {voiceCustomization.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
            {voiceCustomization.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {voiceCustomization.sectionDescription}
          </p>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {voiceCustomization.layers.map((layer, index) => (
            <LayerRow
              key={layer.number}
              number={layer.number}
              title={layer.title}
              description={layer.description}
              features={layer.features as readonly string[]}
              isLast={index === voiceCustomization.layers.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── LayerRow ─────────────────────────────────────────────────────────────────

interface LayerRowProps {
  number: string;
  title: string;
  description: string;
  features: readonly string[];
  isLast: boolean;
}

function LayerRow({ number, title, description, features, isLast }: LayerRowProps) {
  return (
    <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 py-16 md:py-20 ${!isLast ? "border-b border-border" : ""}`}>

      {/* Left: text block */}
      <div className="lg:w-[42%] shrink-0 flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-6">
          {/* Eyebrow number */}
          <p className="text-sm font-semibold text-primary tracking-widest uppercase">
            {number}
          </p>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.2]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Feature bullet list */}
          <ul className="flex flex-col gap-2.5 pt-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <RiCheckLine className="mt-0.5 shrink-0 w-4 h-4 text-primary" />
                <span className="text-base leading-snug text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <Button variant="outline" size="default" className="gap-2">
            Learn more
            <RiArrowRightLine className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Right: image panel */}
      <div className="flex-1 flex items-start justify-center md:justify-end">
        <div className="w-full md:max-w-md aspect-square rounded-2xl bg-muted" />
      </div>

    </div>
  );
}
