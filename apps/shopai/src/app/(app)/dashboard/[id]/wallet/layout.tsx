import { BillingProvider } from '@/features/billing/provider';

export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return <BillingProvider>{children}</BillingProvider>;
}
