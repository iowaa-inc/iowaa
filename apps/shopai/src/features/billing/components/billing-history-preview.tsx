'use client';

import Link from 'next/link';

import { CheckCircle2, ChevronRight, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useBilling } from '../hooks/use-billing';
import type { Transaction } from '../types';

const TRANSACTION_VIEW_THRESHOLD = 5;

const getStatusIcon = (status: string | undefined) => {
  if (status === 'completed') {
    return <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />;
  }
  return <Clock className="h-5 w-5 shrink-0 text-yellow-500" />;
};

export function BillingHistoryPreview() {
  const billing = useBilling();
  const transactions = billing.get() as Transaction[];

  const showViewAll = transactions.length > TRANSACTION_VIEW_THRESHOLD;
  const displayedTransactions = transactions.slice(0, TRANSACTION_VIEW_THRESHOLD);

  return (
    <Card className="bg-card border-border rounded-lg shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Transaction History</CardTitle>
        <CardDescription>Your recent purchases</CardDescription>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <>
            {/* Transaction List */}
            <div className="divide-border space-y-0 divide-y">
              {displayedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="hover:bg-muted/50 flex items-center justify-between p-3 transition-colors"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {getStatusIcon(transaction.status)}
                    <div className="min-w-0">
                      <p className="text-foreground text-base font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {new Date(transaction.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <p className="text-foreground text-right text-base font-medium">
                      ${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Link */}
            {showViewAll && (
              <Link href="/dashboard/wallet/history">
                <Button variant="ghost" className="mt-4 w-full justify-center">
                  View All Transactions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
