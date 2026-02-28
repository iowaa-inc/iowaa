'use client';

import type { ReactNode } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui-core/components/breadcrumb';

interface SettingsPaneProps {
  label: string;
  children: ReactNode;
}

export function SettingsPane({ label, children }: SettingsPaneProps) {
  return (
    <main className="flex h-[calc(100vh-70px)] flex-1 flex-col overflow-hidden sm:h-[680px]">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sm:border-b-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">{children}</div>
    </main>
  );
}
