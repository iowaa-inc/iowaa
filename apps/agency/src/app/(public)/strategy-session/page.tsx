import { BookingHero } from "./_components/booking-hero";
import { StrategyIntakeForm } from "./_components/strategy-intake-form";
import { TrustBadgesAndReassurance } from "./_components/trust-badges-and-reassurance";
import { WhatToExpectTimeline } from "./_components/what-to-expect-timeline";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <BookingHero />
      <WhatToExpectTimeline />
      <StrategyIntakeForm />
      <TrustBadgesAndReassurance />
    </main>
  );
}
