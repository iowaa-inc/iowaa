'use client';

import IowaaLogo from '@/assets/brand/iowaa-logo.svg';
import { CreditBalancePreview } from '@/features/credits/components/credit-balance-preview';
import { WalletProvider } from '@/features/credits/provider';
import { NotificationCenter } from '@/features/notification/components/notification-center';
import { NotificationIndicator } from '@/features/notification/components/notification-indicator';
import { NotificationProvider } from '@/features/notification/provider';

import { SidebarTrigger } from '@/components/ui/sidebar';

// Import SidebarTrigger

export function NavHeader() {
  return (
    <NotificationProvider>
      <header className="max-md:bg-background sticky top-0 z-40 flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Logo: only visible on mobile (hidden on md and up) */}
        <IowaaLogo className="text-foreground md:hidden" style={{ height: 20, width: 'auto' }} />
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1"></div>
        <div className="flex items-center justify-center gap-3">
          <WalletProvider>
            <CreditBalancePreview />
          </WalletProvider>
          <NotificationCenter>
            <NotificationIndicator />
          </NotificationCenter>
        </div>
      </header>
    </NotificationProvider>
  );
}
