import {
  RegionContextHero,
  RegionalThesis,
  RegionalSolutionsGrid,
  RegionalImpactStats,
  RegionSpecificCta,
} from "@/features/markets";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <RegionContextHero />
      <RegionalThesis />
      <RegionalSolutionsGrid />
      <RegionalImpactStats />
      <RegionSpecificCta />
    </main>
  );
}
