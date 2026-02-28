'use client';

import { useMemo, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui-core/components/dialog';
import { SidebarProvider } from '@repo/ui-core/components/sidebar';

import { SETTINGS_GROUPS, SettingsTabId } from './settings-config';
import { SettingsPane } from './settings-pane';
import { SettingsSidebar } from './settings-sidebar';

interface SettingsModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: SettingsTabId;
}

export function SettingsModal({
  children,
  isOpen,
  onOpenChange,
  defaultTab = 'profile',
}: SettingsModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState<SettingsTabId>(defaultTab);

  const open = typeof isOpen === 'boolean' ? isOpen : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (typeof isOpen !== 'boolean') setInternalOpen(nextOpen);
    // Reset to default tab when closing
    if (!nextOpen) setTimeout(() => setActiveTabId(defaultTab), 200);
  };

  // Helper to find the current active item config
  const activeItem = useMemo(() => {
    for (const group of SETTINGS_GROUPS) {
      const item = group.items.find((i) => i.id === activeTabId);
      if (item) return item;
    }
    return SETTINGS_GROUPS[0].items[0];
  }, [activeTabId]);

  const ActiveComponent = activeItem.component;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-full w-full max-w-full overflow-hidden p-0 sm:max-h-[700px] sm:max-w-[90vw] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your account and projects settings.
        </DialogDescription>

        <SidebarProvider className="flex h-full flex-col items-start sm:flex-row">
          <SettingsSidebar activeTabId={activeTabId} onSelect={setActiveTabId} />

          <SettingsPane label={activeItem.label}>
            <ActiveComponent />
          </SettingsPane>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
