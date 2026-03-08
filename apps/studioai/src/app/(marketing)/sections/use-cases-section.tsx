"use client";

import { Badge } from "@repo/ui-core/components/badge";
import { Card, CardContent, CardHeader } from "@repo/ui-core/components/card";
import { RiCheckLine } from "@remixicon/react";
import { useCases } from "@/config/landing-content";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {useCases.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {useCases.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {useCases.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {useCases.cases.map((useCase, index) => (
            <Card
              key={index}
              className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              {/* Image slot */}
              <div className="relative aspect-video rounded-t-xl border-b border-border bg-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-muted-foreground/50 text-sm">
                    [{useCase.imageSlot}]
                  </div>
                </div>
              </div>

              <CardHeader className="space-y-2">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {useCase.category}
                </div>
                <h3 className="text-xl font-semibold">{useCase.title}</h3>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-border/50">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <RiCheckLine className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
