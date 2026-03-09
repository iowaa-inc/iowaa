"use client";

import { Preloader } from "@repo/ui-core/components/preloader";
import {
  HeroSection,
  FeaturesSection,
  VoiceLibrarySection,
  VoiceCapabilitiesSection,
  VoiceUseCasesSection,
  VoiceCustomizationSection,
  HowItWorksSection,
  UseCasesSection,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  FinalCtaSection,
  FooterSection,
} from "./sections";

const PAGE_WORDS = [
  { text: "Audiobooks", lang: "en", font: null },
  { text: "Podcasts", lang: "en", font: null },
  { text: "Training", lang: "en", font: null },
  { text: "Games", lang: "en", font: null },
  { text: "Marketing", lang: "en", font: null },
  { text: "Production", lang: "en", font: null },
  { text: "Professional", lang: "en", font: null },
  { text: "Studio", lang: "en", font: null },
  { text: "Broadcast", lang: "en", font: null },
  { text: "Content", lang: "en", font: null },
];

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-background">
      <Preloader words={PAGE_WORDS}>
        <div>
          <HeroSection />
          <FeaturesSection />
          <VoiceLibrarySection />
          <VoiceCapabilitiesSection />
          <VoiceUseCasesSection />
          <VoiceCustomizationSection />
          <HowItWorksSection />
          <UseCasesSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <FinalCtaSection />
          <FooterSection />
        </div>
      </Preloader>
    </main>
  );
}