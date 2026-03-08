"use client";

import { Badge } from "@repo/ui-core/components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui-core/components/collapsible";
import { RiArrowDownSLine } from "@remixicon/react";
import { faq } from "@/config/landing-content";

export function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            {faq.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            {faq.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {faq.sectionDescription}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item, index) => (
            <Collapsible key={index} className="group">
              <div className="border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
                  <h3 className="text-lg font-semibold pr-8">
                    {item.question}
                  </h3>
                  <RiArrowDownSLine className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
