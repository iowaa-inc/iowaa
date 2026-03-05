import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Indicator } from '@/components/ui/indicator';

import { cn } from '@/lib/utils';

import type { Notification, NotificationType } from '../type';

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick?: () => void;
}

const notificationBadgeConfig: Record<
  NotificationType,
  {
    label: string;
    className: string;
  }
> = {
  lead: {
    label: 'Lead',
    className: 'bg-green-500/10 text-green-600 border-green-500/20',
  },
  governance: {
    label: 'Governance',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  inventory: {
    label: 'Inventory',
    className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  },
  wallet: {
    label: 'Wallet',
    className: 'bg-red-500/10 text-red-600 border-red-500/20',
  },
  announcement: {
    label: 'Platform',
    className: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  },
};

export function NotificationItem({ notification, onNotificationClick }: NotificationItemProps) {
  if (!notification) {
    return null;
  }

  const badgeConfig = notificationBadgeConfig[notification.type];
  const isClickable = Boolean(notification.actionUrl);

  const notificationContent = (
    <div
      className={cn(
        'hover:bg-muted/50 border-border/50 flex gap-3 border-b px-6 py-4 transition-colors last:border-b-0',
        isClickable && 'cursor-pointer',
      )}
    >
      <div className="shrink-0 pt-2">
        {!notification.isRead ? (
          <Indicator variant="brand" aria-label="Unread notification" />
        ) : (
          <span className="me-3 size-2" aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1">
          <p className="text-foreground text-sm font-semibold">{notification.title}</p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">{notification.description}</p>

        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline" className={cn('border p-3 text-xs', badgeConfig.className)}>
            {badgeConfig.label}
          </Badge>
          <span className="text-muted-foreground text-xs">{notification.createdOn}</span>
        </div>
      </div>

      {isClickable && (
        <div className="shrink-0 pt-1">
          <ArrowRight className="text-muted-foreground h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </div>
  );

  if (notification.actionUrl) {
    return (
      <Link href={notification.actionUrl} onClick={onNotificationClick} className="block">
        {notificationContent}
      </Link>
    );
  }

  return <div className="block">{notificationContent}</div>;
}
