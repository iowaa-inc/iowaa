"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui-core/components/collapsible";
import { RiAddLine, RiSubtractLine, RiArrowRightLine } from "@remixicon/react";
import { Button } from "@repo/ui-core/components/button";
import { faq } from "@/config/landing-content";

// Show this many items initially; the rest are hidden behind "See More"
const INITIAL_COUNT = 5;

// ─── Section ──────────────────────────────────────────────────────────────────

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? faq.items : faq.items.slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* ── Left: heading ──────────────────────────────────────── */}
          <div className="lg:w-[36%] lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
              {faq.sectionTitle}
            </h2>
          </div>

          {/* ── Right: accordion list ──────────────────────────────── */}
          <div className="flex-1 flex flex-col">
            {visibleItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Collapsible
                  key={index}
                  open={isOpen}
                  onOpenChange={(open) => setOpenIndex(open ? index : null)}
                >
                  {/* Divider above each item */}
                  <div className="h-px w-full bg-border" />

                  <CollapsibleTrigger className="flex items-start gap-4 w-full text-left py-5 group focus-visible:outline-none">
                    {/* +/− icon */}
                    <span className="mt-0.5 shrink-0 text-primary">
                      {isOpen
                        ? <RiSubtractLine className="w-4 h-4" />
                        : <RiAddLine className="w-4 h-4" />
                      }
                    </span>

                    {/* Question */}
                    <span className={`text-base font-medium leading-snug transition-colors duration-150 ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                      {item.question}
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {/* Answer padded left to align with question text */}
                    <div className="pl-8 pb-5">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Bottom divider */}
            <div className="h-px w-full bg-border" />

            {/* See More / Collapse */}
            <div className="pt-6">
              <Button variant="secondary" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show fewer FAQs" : "See More FAQs"}
                <RiArrowRightLine className={`w-4 h-4 transition-transform duration-200 ${showAll ? "rotate-90" : ""}`} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
