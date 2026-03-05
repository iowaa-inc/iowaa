'use client';

import { useState } from 'react';

import { useBilling } from '@/features/billing/hooks/use-billing';
import { Transaction } from '@/features/billing/types';
import {
  calculatePrice,
  getApplicablePricingTier,
  validateLeadSelection,
} from '@/features/credits/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

import { BASE_PRICE_PER_LEAD, PRICING_TIERS, WALLET_DEFAULTS } from '../config';
import { useCredits } from '../hooks/use-credits';

// <--- new import

export function PurchaseCard() {
  const [selectedLeads, setSelectedLeads] = useState<number>(WALLET_DEFAULTS.selectedLeads);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const credits = useCredits();
  const wallet = credits.get();

  const billing = useBilling();

  const tier = getApplicablePricingTier(selectedLeads);
  const { base, discountValue, total } = calculatePrice(
    selectedLeads,
    BASE_PRICE_PER_LEAD,
    tier.discount,
  );

  // Over max is if purchase would take us past wallet's maxCapacity (not maxLeads per purchase)
  const isOverMaxLeads = wallet.balance + selectedLeads > WALLET_DEFAULTS.maxCapacity;

  const handlePurchase = async () => {
    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentBalance = wallet.balance;
    credits.update({ balance: currentBalance + selectedLeads });

    const transactionId = `tx-${crypto.randomUUID?.() ?? 'fallback'}`;
    const tx: Transaction = {
      id: transactionId,
      date: new Date().toISOString(),
      amount: total,
      description: `Purchased ${selectedLeads} leads`,
      leadsReceived: selectedLeads,
      status: 'pending',
    };

    // --- UPDATE transaction history using billing.add ---
    billing.add(tx);

    // Simulated async status update on billing (changes 'pending' -> 'completed')
    setTimeout(() => {
      billing.update({ status: 'completed' }, transactionId);
    }, 3000);

    setIsPurchasing(false);
  };

  return (
    <Card className="bg-card border-border rounded-lg shadow-none">
      <CardHeader className="">
        <CardTitle className="text-lg">Purchase Leads</CardTitle>
        <CardDescription>Select the number of leads you need</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-end justify-between pb-2">
            <div className="flex flex-col gap-1">
              <label className="text-foreground text-sm font-medium">Lead Volume</label>
              <span className="text-3xl font-semibold">{selectedLeads.toLocaleString()}</span>
            </div>
            <input
              type="number"
              min={WALLET_DEFAULTS.minLeads}
              max={WALLET_DEFAULTS.maxLeads}
              value={selectedLeads}
              onChange={(e) => {
                setSelectedLeads(validateLeadSelection(Number(e.target.value)));
              }}
              className="text-foreground bg-muted border-border w-20 rounded-md border px-3 py-2 text-center text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[selectedLeads]}
              min={WALLET_DEFAULTS.minLeads}
              max={WALLET_DEFAULTS.maxLeads}
              step={500}
              onValueChange={([val]: number[]) => {
                setSelectedLeads(validateLeadSelection(val));
              }}
              className="h-2 flex-1 cursor-pointer"
            />
          </div>
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.leads} className="flex flex-col items-center gap-1">
                <span className="text-foreground font-medium">
                  {(tier.leads / 1000).toFixed(1)}k
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border space-y-5 border-t pt-8">
          {/* BASE PRICE Row */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-0.5">
              <span className="text-muted-foreground text-sm">Base Price</span>
              <span className="text-foreground text-sm font-medium">
                {selectedLeads.toLocaleString()} leads&nbsp;
                <span className="text-muted-foreground font-medium">
                  × $
                  {tier.leads > 0
                    ? (base / selectedLeads).toFixed(2)
                    : (base / selectedLeads).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>
              </span>
            </div>
            <span className="text-foreground font-mono text-sm">
              $
              {base.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Discount Row */}
          {tier.discount > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-0.5">
                <span className="text-muted-foreground text-sm">Discount</span>
                <span className="text-foreground text-sm font-medium">
                  {tier.discount}% off volume tier
                </span>
              </div>
              <span className="font-mono text-sm">
                -$
                {discountValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          {/* TOTAL DUE */}
          <div className="border-border flex flex-col gap-1 border-t border-dashed pt-6">
            <div className="mb-0.5 flex items-center justify-between">
              <span className="text-foreground flex items-center gap-2 text-sm font-medium">
                Total Due
                {tier.discount > 0 && (
                  <Badge variant="secondary" className="p-3">
                    SAVE {tier.discount}%
                  </Badge>
                )}
              </span>
              <span className="font-mono text-xl font-semibold">
                {total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <span className="text-muted-foreground text-sm font-medium">
              (inc. all volume discounts)
            </span>
          </div>
        </div>

        <Button
          onClick={handlePurchase}
          disabled={isPurchasing || isOverMaxLeads}
          className="w-full"
          size={'lg'}
        >
          {isOverMaxLeads
            ? `Max balance reached`
            : isPurchasing
              ? 'Processing...'
              : `Purchase ${selectedLeads.toLocaleString()} Leads`}
        </Button>
      </CardContent>
    </Card>
  );
}
