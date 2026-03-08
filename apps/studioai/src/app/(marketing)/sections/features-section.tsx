"use client";

import {
  RiMicLine,
  RiEmotionLine,
  RiTextSpacing,
  RiTeamLine,
  RiFileListLine,
  RiSettings3Line,
} from "@remixicon/react";
import { Badge } from "@repo/ui-core/components/badge";
import { Card, CardContent } from "@repo/ui-core/components/card";
import { features } from "@/config/landing-content";

const iconMap = {
  mic: RiMicLine,
  emotion: RiEmotionLine,
  text: RiTextSpacing,
  team: RiTeamLine,
  "file-list": RiFileListLine,
  settings: RiSettings3Line,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {features.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {features.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {features.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Card
                key={index}
                className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
