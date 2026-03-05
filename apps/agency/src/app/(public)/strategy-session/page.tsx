import { BookingHero, WhatToExpectTimeline, StrategyIntakeForm, TrustBadgesAndReassurance } from '@/features/strategy-session';



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
