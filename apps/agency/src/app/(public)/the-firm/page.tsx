import { FirmIdentityHero, MissionAndVision, TheCulturalMoat, LeadershipAndArchitects, CareersAndCulture } from '@/features/firm';
import { GlobalCtaSection } from '@/features/shared';



export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <FirmIdentityHero />
      <MissionAndVision />
      <TheCulturalMoat />
      <LeadershipAndArchitects />
      <CareersAndCulture />
      <GlobalCtaSection />
    </main>
  );
}
