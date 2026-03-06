// import { GlobalCtaSection } from '';
import { CareersAndCulture } from "./_components/careers-and-culture";
import { FirmIdentityHero } from "./_components/firm-identity-hero";
import { LeadershipAndArchitects } from "./_components/leadership-and-architects";
import { MissionAndVision } from "./_components/mission-and-vision";
import { TheCulturalMoat } from "./_components/the-cultural-moat";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <FirmIdentityHero />
      <MissionAndVision />
      <TheCulturalMoat />
      <LeadershipAndArchitects />
      <CareersAndCulture />
      {/* <GlobalCtaSection /> */}
    </main>
  );
}
