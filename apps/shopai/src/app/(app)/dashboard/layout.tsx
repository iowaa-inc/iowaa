import type { ReactNode } from 'react';

import '@/styles/dashboard.css';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';

import { MobileNav } from './[id]/_components/layout/mobile-nav';
import { NavHeader } from './[id]/_components/layout/nav-header';
import { SidebarNav } from './[id]/_components/layout/sidebar-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted fixed inset-0 flex h-screen w-screen">
      <SidebarProvider>
        <SidebarNav />
        <div className="dark:bg-background flex w-full flex-1 flex-col overflow-hidden md:mx-2 md:my-2 md:rounded-lg">
          <NavHeader />
          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="min-h-0 min-w-0 flex-1">
              <main className="w-full px-4 pb-20 sm:px-6 md:px-8">{children}</main>
            </ScrollArea>
          </div>
        </div>
        <MobileNav />
      </SidebarProvider>
    </div>
  );
}
