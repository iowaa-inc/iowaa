import { GlobalCtaSection } from "@/components/section/global-cta-section";
import { TheSmartArchitecture } from "@/components/section/the-smart-architecture";
import { AntiToolJunkyManifesto } from "./_components/anti-tool-junky-manifesto";
import { MethodologyHero } from "./_components/methodology-hero";
import { MethodologyInAction } from "./_components/methodology-in-action";
import { PhaseOneBusinessGoal } from "./_components/phase-one-business-goal";
import { PhaseThreeSmartArchitecture } from "./_components/phase-three-smart-architecture";
import { PhaseTwoHyperLocalContext } from "./_components/phase-two-hyper-local-context";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <MethodologyHero />
      <AntiToolJunkyManifesto />
      <PhaseOneBusinessGoal />
      <PhaseTwoHyperLocalContext />
      <PhaseThreeSmartArchitecture />
      <TheSmartArchitecture />
      <MethodologyInAction />
      <GlobalCtaSection />
    </main>
  );
}
