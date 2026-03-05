import { MethodologyHero, AntiToolJunkyManifesto, PhaseOneBusinessGoal, PhaseTwoHyperLocalContext, PhaseThreeSmartArchitecture, MethodologyInAction } from '@/features/methodology';
import { GlobalCtaSection, TheSmartArchitecture } from '@/features/shared';



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
