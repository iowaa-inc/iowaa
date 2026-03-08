"use client";

import { Badge } from "@repo/ui-core/components/badge";
import { Card, CardContent, CardHeader } from "@repo/ui-core/components/card";
import {
  RiMicLine,
  RiBookOpenLine,
  RiGlobalLine,
  RiArchiveLine,
  RiCheckLine,
  RiVolumeUpLine,
} from "@remixicon/react";
import { voiceLibrary } from "@/config/landing-content";

const iconMap = {
  mic: RiMicLine,
  book: RiBookOpenLine,
  global: RiGlobalLine,
  archive: RiArchiveLine,
};

export function VoiceLibrarySection() {
  return (
    <section id="voice-library" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {voiceLibrary.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {voiceLibrary.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {voiceLibrary.sectionDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
          {voiceLibrary.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Language Categories */}
        <div className="space-y-8 mb-16">
          {voiceLibrary.categories.map((category, index) => (
            <Card
              key={index}
              className={`border-border/50 bg-background/50 backdrop-blur-sm ${
                category.highlight
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : ""
              }`}
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                      <RiVolumeUpLine className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.region}</h3>
                      {category.highlight && (
                        <Badge
                          variant="default"
                          className="mt-1 text-xs"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.languages.map((language, langIndex) => (
                    <div
                      key={langIndex}
                      className="flex flex-col p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="font-semibold text-sm">
                        {language.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {language.speakers} speakers
                      </div>
                      {"accents" in language && language.accents && (
                        <div className="text-xs text-muted-foreground mt-1 italic">
                          {language.accents}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {voiceLibrary.features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <RiCheckLine className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">
            Perfect for diverse content creation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {voiceLibrary.useCases.map((useCase, index) => {
              const Icon = iconMap[useCase.icon as keyof typeof iconMap];
              return (
                <Card
                  key={index}
                  className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
