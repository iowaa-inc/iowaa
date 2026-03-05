'use client';
import Link from 'next/link';

import { useBilling } from '@/features/billing/hooks/use-billing';
import type { Transaction } from '@/features/billing/types';
import { ArrowLeft, CheckCircle2, Clock, Download } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { PageHeader } from '../../_components/layout/page-header';

const downloadReceipt = (transaction: Transaction) => {
  const receiptContent = `
TRANSACTION RECEIPT
==================

Transaction ID: ${transaction.id}
Date: ${new Date(transaction.date).toLocaleString()}
Description: ${transaction.description}

Details:
- Leads Purchased: ${transaction.leadsReceived?.toLocaleString?.() ?? ''}
- Amount Charged: $${transaction.amount?.toFixed?.(2) ?? ''}
- Status: ${transaction.status?.toUpperCase?.() ?? ''}

Thank you for your purchase!
  `;
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent),
  );
  element.setAttribute('download', `receipt-${transaction.id}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default function TransactionHistoryPage() {
  const billing = useBilling();
  const transactions = billing.get() as Transaction[];

  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <div className="mx-auto w-full max-w-5xl min-w-0">
        {/* Header with Back Button */}
        <div className="flex flex-col items-start justify-start gap-3">
          <Link href="/dashboard/wallet">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <PageHeader title="All Transactions" subtitle="Complete history of all lead purchases" />
        </div>

        {/* Transactions List Card */}
        <Card className="border-border rounded-lg py-0 shadow-none">
          <CardContent className="px-0">
            <div className="divide-border space-y-0 divide-y">
              {transactions.length === 0 ? (
                <div className="text-muted-foreground p-8 text-center text-base">
                  No transactions yet.
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="hover:bg-muted/50 flex items-center justify-between p-4 px-6 transition-colors"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      {transaction.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 shrink-0 text-yellow-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-foreground text-base font-medium">
                            {transaction.description}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              transaction.status === 'completed'
                                ? 'border-green-200 bg-green-50 text-green-700'
                                : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                            }
                          >
                            {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {new Date(transaction.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-8">
                      <div className="text-right">
                        <p className="text-foreground text-base font-medium">
                          ${transaction.amount.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadReceipt(transaction)}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Receipt</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
