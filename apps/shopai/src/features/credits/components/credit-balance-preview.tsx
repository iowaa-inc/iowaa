import { CircularProgress } from '@/components/ui/circular-progress';

import { useCredits } from '../hooks/use-credits';

export function CreditBalancePreview() {
  const wallet = useCredits().get();

  return (
    <div className="flex items-center justify-center gap-2">
      <CircularProgress
        bgCircleClassName="stroke-black/10 dark:stroke-white/10"
        className="size-11 text-xs font-semibold"
        value={wallet.balance}
        max={wallet.maxCapacity}
        strokeWidth={4}
      >
        {wallet.balance}
      </CircularProgress>
      <p className="text-muted-foreground text-sm">Leads remaining</p>
    </div>
  );
}
