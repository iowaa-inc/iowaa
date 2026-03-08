"use client";

import { Badge } from "@repo/ui-core/components/badge";
import { RiCheckLine } from "@remixicon/react";
import { voiceCustomization } from "@/config/landing-content";

export function VoiceCustomizationSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {voiceCustomization.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {voiceCustomization.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {voiceCustomization.sectionDescription}
          </p>
        </div>

        <div className="space-y-24">
          {voiceCustomization.layers.map((layer, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="space-y-2">
                  <div className="text-sm font-mono text-primary font-semibold">
                    {layer.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {layer.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {layer.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {layer.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <RiCheckLine className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image slot */}
              <div
                className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-xl border border-border bg-muted/50 overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-muted-foreground/50 text-sm">
                      [{layer.imageSlot}]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
