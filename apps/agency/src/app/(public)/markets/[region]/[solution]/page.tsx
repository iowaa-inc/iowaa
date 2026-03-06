import { TheSmartArchitecture } from "@/components/section/the-smart-architecture";
import { DeploymentOptions } from "../../_components/deployment-options";
import { SolutionOverviewHero } from "../../_components/solution-overview-hero";
import { SolutionSpecificCta } from "../../_components/solution-specific-cta";
import { TheBusinessProblem } from "../../_components/the-business-problem";
import { TheLocalContext } from "../../_components/the-local-context";
import { TheRoiAndImpact } from "../../_components/the-roi-and-impact";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <SolutionOverviewHero />
      <TheBusinessProblem />
      <TheLocalContext />
      <TheSmartArchitecture />
      <TheRoiAndImpact />
      <DeploymentOptions />
      <SolutionSpecificCta />
    </main>
  );
}
