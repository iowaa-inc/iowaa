"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@repo/ui-core/components/badge";
import { Avatar, AvatarFallback } from "@repo/ui-core/components/avatar";
import { testimonials } from "@/config/landing-content";

const STEP_DURATION = 5000; // ms each testimonial displays

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const count = testimonials.items.length;

  // rAF-driven progress + auto-advance
  useEffect(() => {
    setProgress(0);
    const startTime = performance.now();

    const tick = (now: number) => {
      const pct = Math.min(((now - startTime) / STEP_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActive((prev) => (prev + 1) % count);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, count]);

  const goTo = useCallback((index: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setActive(index);
  }, []);

  const current = testimonials.items[active]!;

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <Badge variant="secondary" className="w-fit">
            {testimonials.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] max-w-2xl">
            {testimonials.sectionTitle}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {testimonials.sectionDescription}
          </p>
        </div>

        {/* Testimonial card */}
        <div className="rounded-2xl bg-muted/40 px-8 md:px-16 lg:px-24 py-14 md:py-20 flex flex-col items-center text-center gap-8 max-w-7xl mx-auto">

          {/* Avatar */}
          <Avatar className="w-14 h-14">
            <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
              {current.author.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-foreground max-w-2xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="text-base font-semibold">{current.author}</span>
            <span className="hidden sm:inline text-muted-foreground/50">·</span>
            <span className="text-base text-muted-foreground">{current.role}</span>
          </div>

          {/* Progress loaders */}
          <div className="flex items-center gap-2 w-full max-w-xs">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="flex-1 h-1 rounded-full bg-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div
                  className="h-full bg-foreground rounded-full transition-none"
                  style={{
                    width: i < active ? "100%" : i === active ? `${progress}%` : "0%",
                  }}
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
