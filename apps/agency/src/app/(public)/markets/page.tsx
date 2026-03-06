import { GlobalCtaSection } from "@/components/section/global-cta-section";
import { CrossBorderScalabilityStatement } from "./_components/cross-border-scalability-statement";
import { InteractiveRegionsGrid } from "./_components/interactive-regions-grid";
import { MarketsHubHero } from "./_components/markets-hub-hero";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <MarketsHubHero />
      <InteractiveRegionsGrid />
      <CrossBorderScalabilityStatement />
      <GlobalCtaSection />
    </main>
  );
}
