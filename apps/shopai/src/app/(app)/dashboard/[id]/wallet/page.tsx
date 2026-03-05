import { BillingHistoryPreview } from '@/features/billing/components/billing-history-preview';
import { BalanceCard } from '@/features/credits/components/balance-card';
import { PurchaseCard } from '@/features/credits/components/purchase-card';
import { WalletProvider } from '@/features/credits/provider';

import { PageHeader } from '../_components/layout/page-header';

export default function WalletPage() {
  return (
    <WalletProvider>
      <div className="mx-auto w-full max-w-4xl min-w-0">
        <PageHeader title="Wallet & Credits" subtitle="Manage lead credits and purchase history" />

        <div className="flex flex-col gap-y-2">
          <BalanceCard />
          <PurchaseCard />
          <BillingHistoryPreview />
        </div>
      </div>
    </WalletProvider>
  );
}
