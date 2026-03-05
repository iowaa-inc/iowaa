"use client";

import { GlobalCtaSection } from "@/components/section/global-cta-section";
import { HeroSection } from "./_components/hero-section";
import { TheProblemStatement } from "./_components/the-problem-statement";
import { CoreValueProposition } from "./_components/core-value-proposition";
import { MethodologyTeaser } from "./_components/methodology-teaser";
import { FeaturedMarketsCarousel } from "./_components/featured-markets-carousel";
import { ImpactAndMetrics } from "./_components/impact-and-metrics";
import { Preloader } from "@repo/ui-core/components/preloader";

const PAGE_WORDS = [
  { text: "Hello", lang: "en", font: null },
  { text: "Bonjour", lang: "fr", font: null },
  { text: "Hola", lang: "es", font: null },
  { text: "Olà", lang: "pt", font: null },
  { text: "Ciao", lang: "it", font: null },
  { text: "Hallå", lang: "sv", font: null },
  { text: "Guten Tag", lang: "de", font: null },
  { text: "こんにちは", lang: "ja", font: "'Noto Sans JP', sans-serif" },
  {
    text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    lang: "pa",
    font: "'Noto Sans Gurmukhi', sans-serif",
  },
  { text: "مرحبا", lang: "ar", font: "'Noto Sans Arabic', sans-serif" },
];

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background w-full">
      <Preloader words={PAGE_WORDS}>
        {/* ── Main content ── revealed beneath the preloader ── */}
        <HeroSection />
        <TheProblemStatement />
        <CoreValueProposition />
        <MethodologyTeaser />
        <FeaturedMarketsCarousel />
        <ImpactAndMetrics />
        <GlobalCtaSection />
      </Preloader>
    </main>
  );
}
