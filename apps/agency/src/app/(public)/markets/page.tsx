import { MarketsHubHero, InteractiveRegionsGrid, CrossBorderScalabilityStatement } from '@/features/markets';
import { GlobalCtaSection } from '@/features/shared';



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
