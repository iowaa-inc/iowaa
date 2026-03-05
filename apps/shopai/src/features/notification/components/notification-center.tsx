'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { filterNotificationsByTab, getUnreadCount, getUnreadCountByType } from '../helper';
import { useNotification } from '../hooks/use-notification';
import type { NotificationType } from '../type';
import { EmptyView } from './empty-view';
import { NotificationItem } from './notification-item';

export type NotificationTab = {
  label: string;
  value: NotificationType | 'all';
  unreadCount: number;
};

export function NotificationCenter({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<NotificationTab['value']>('all');
  const [open, setOpen] = useState(false);

  const allNotifications = useNotification().get();

  const unreadCount = getUnreadCount(allNotifications);

  const notificationTabs: NotificationTab[] = [
    {
      label: 'All',
      value: 'all',
      unreadCount: unreadCount,
    },
    {
      label: 'Inventory',
      value: 'inventory',
      unreadCount: getUnreadCountByType(allNotifications, 'inventory'),
    },
    {
      label: 'Leads',
      value: 'lead',
      unreadCount: getUnreadCountByType(allNotifications, 'lead'),
    },
    {
      label: 'Governance',
      value: 'governance',
      unreadCount: getUnreadCountByType(allNotifications, 'governance'),
    },
    {
      label: 'Platform',
      value: 'announcement',
      unreadCount: 0,
    },
  ];

  const renderNotifications = (
    tab: NotificationType | 'all',
    onNotificationClick: () => void = () => {},
  ) => {
    const notifications = filterNotificationsByTab(allNotifications, tab);

    return (
      <div className="flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onNotificationClick={onNotificationClick}
            />
          ))
        ) : (
          <EmptyView />
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="flex w-full! max-w-lg! flex-col p-0">
        <SheetHeader className="border-b-0 px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">Notifications</SheetTitle>
          </div>
        </SheetHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as NotificationType | 'all')}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* 
                        Wrap TabsList with ScrollArea for mobile to make navbar horizontally scrollable.
                        Hide vertical scrollbar in desktop, and show horizontal scroll on mobile.
                    */}
          <div className="border-border border-b px-6">
            <ScrollArea className="w-full" scrollHideDelay={0}>
              <TabsList
                variant="line"
                size="md"
                className="min-w-0 flex-nowrap gap-5 overflow-x-auto"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {notificationTabs.map(({ label, value, unreadCount }) => (
                  <TabsTrigger value={value} key={value}>
                    <span className="flex items-center gap-1.5">
                      {label}
                      {typeof unreadCount === 'number' && unreadCount > 0 && (
                        <Badge className="flex h-5 w-5 items-center justify-center rounded-full p-0">
                          {unreadCount}
                        </Badge>
                      )}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Show horizontal scrollbar only on mobile */}
              <ScrollBar orientation="horizontal" className="md:hidden" style={{ height: '6px' }} />
            </ScrollArea>
          </div>

          {notificationTabs.map(({ value }) => (
            <TabsContent key={value} value={value} className="mt-0 min-h-0 flex-1">
              {renderNotifications(value, () => setOpen(false))}
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
