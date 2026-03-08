"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@repo/ui-core/components/badge";
import { howItWorks } from "@/config/landing-content";

// Duration each step stays active before auto-advancing
const STEP_DURATION = 4500; // ms

// ─── Section ──────────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const stepCount = howItWorks.steps.length;

  // Animate progress bar and auto-advance using rAF
  useEffect(() => {
    setProgress(0);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Advance to next step (loops back to 0)
        setActiveStep((prev) => (prev + 1) % stepCount);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeStep, stepCount]);

  // On user click — jump to step (effect cleanup + restart handles timer reset)
  const handleStepClick = useCallback((index: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setActiveStep(index);
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">

          {/* ── Left: heading + animated step list ───────────────── */}
          <div className="flex flex-col gap-60 lg:w-[38%] lg:sticky lg:top-24">

            {/* Section heading */}
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit">
                {howItWorks.sectionBadge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
                {howItWorks.sectionTitle}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {howItWorks.sectionDescription}
              </p>
            </div>

            {/* Step list */}
            <ol className="flex flex-col">
              {howItWorks.steps.map((step, index) => {
                const isActive = activeStep === index;
                const isLast = index === stepCount - 1;

                return (
                  <li key={step.step}>
                    <button
                      onClick={() => handleStepClick(index)}
                      className="w-full text-left flex flex-col gap-2 py-4 focus-visible:outline-none"
                      aria-expanded={isActive}
                    >
                      {/* Title */}
                      <span
                        className={`text-base font-medium transition-colors duration-200 ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {step.title}
                      </span>

                      {/* Description — only visible on active step */}
                      {isActive && (
                        <span className="text-base text-muted-foreground leading-relaxed block">
                          {step.description}
                        </span>
                      )}

                      {/* Progress bar — only on active step */}
                      {isActive && (
                        <div className="w-full h-px bg-border mt-1 overflow-hidden rounded-full">
                          <div
                            className="h-full bg-foreground rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </button>

                    {/* Divider between steps */}
                    {!isLast && !isActive && (
                      <div className="h-px w-full bg-border" />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── Right: image panel ────────────────────────────────── */}
          <div className="flex-1 lg:sticky lg:top-24">
            <div className="w-full aspect-4/4 rounded-2xl bg-muted" />
          </div>

        </div>
      </div>
    </section>
  );
}
