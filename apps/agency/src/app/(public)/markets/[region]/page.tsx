import { RegionContextHero } from "../_components/region-context-hero";
import { RegionSpecificCta } from "../_components/region-specific-cta";
import { RegionalImpactStats } from "../_components/regional-impact-stats";
import { RegionalSolutionsGrid } from "../_components/regional-solutions-grid";
import { RegionalThesis } from "../_components/regional-thesis";

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
