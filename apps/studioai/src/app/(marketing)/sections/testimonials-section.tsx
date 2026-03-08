"use client";

import { Badge } from "@repo/ui-core/components/badge";
import { Card, CardContent } from "@repo/ui-core/components/card";
import { Avatar, AvatarFallback } from "@repo/ui-core/components/avatar";
import { testimonials } from "@/config/landing-content";

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {testimonials.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {testimonials.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {testimonials.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.items.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Avatar>
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
