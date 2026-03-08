import { RiCheckLine } from "@remixicon/react";
import { voiceCustomization } from "@/config/landing-content";
import { Badge } from "@repo/ui-core/components/badge";

// ─── Section ──────────────────────────────────────────────────────────────────

export function VoiceCustomizationSection() {
  return (
    <section id="voice-direction" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20 md:mb-28">
          <Badge variant="secondary" className="p-4 text-sm">
            {voiceCustomization.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
            {voiceCustomization.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {voiceCustomization.sectionDescription}
          </p>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-24 md:gap-32 max-w-4xl mx-auto">
          {voiceCustomization.layers.map((layer, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <DirectionRow
                key={layer.number}
                number={layer.number}
                title={layer.title}
                description={layer.description}
                features={layer.features as readonly string[]}
                imageSlot={layer.imageSlot}
                isImageLeft={isImageLeft}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── DirectionRow ─────────────────────────────────────────────────────────────

interface DirectionRowProps {
  number: string;
  title: string;
  description: string;
  features: readonly string[];
  imageSlot: string;
  isImageLeft: boolean;
}

function DirectionRow({
  number,
  title,
  description,
  features,
  isImageLeft,
}: DirectionRowProps) {
  const imageWell = (
    <div className="shrink-0 w-100">
      <div className="w-full aspect-square rounded-xl bg-muted" />
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16">

      {/* Image — left or right */}
      {isImageLeft && imageWell}

      {/* Text */}
      <div className="flex-1 flex flex-col gap-6">
        {/* <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {number}
        </p> */}

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <RiCheckLine className="mt-0.5 shrink-0 w-5 h-5 text-primary" />
              <span className="text-base leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {!isImageLeft && imageWell}

    </div>
  );
}
