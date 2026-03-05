'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useCredits } from '../hooks/use-credits';

export function BalanceCard() {
  const wallet = useCredits().get();
  const capacityPercentage = (wallet.balance / wallet.maxCapacity) * 100;

  return (
    <Card className="border-border rounded-lg shadow-none">
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-muted-foreground text-sm">Available lead credits</h3>
          <p className="text-foreground mt-1 text-4xl font-semibold">
            {wallet.balance.toLocaleString()}
          </p>
        </section>

        <section>
          <h4 className="text-muted-foreground text-sm">Credit capacity status</h4>
          <div className="mt-3 space-y-2">
            <Progress value={capacityPercentage} />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">
                {capacityPercentage.toFixed(2)}%
              </span>
              <span className="text-muted-foreground text-sm font-normal">
                {wallet.maxCapacity.toLocaleString()} Max
              </span>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
