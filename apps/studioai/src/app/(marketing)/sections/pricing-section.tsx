"use client";

import Link from "next/link";
import { Badge } from "@repo/ui-core/components/badge";
import { Button } from "@repo/ui-core/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui-core/components/card";
import { RiCheckLine } from "@remixicon/react";
import { pricing } from "@/config/landing-content";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {pricing.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {pricing.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {pricing.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border/50 bg-background/50 backdrop-blur-sm flex flex-col ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  {plan.price.monthly !== null ? (
                    <>
                      <span className="text-4xl font-bold">
                        ${plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <RiCheckLine className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  <Link href={plan.cta.href}>{plan.cta.text}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
