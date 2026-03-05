import {
  SolutionOverviewHero,
  TheBusinessProblem,
  TheLocalContext,
  TheRoiAndImpact,
  DeploymentOptions,
  SolutionSpecificCta,
} from "@/features/markets";
import { TheSmartArchitecture } from "@/features/shared";

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
