'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { getUnreadCount } from '../helper';
import { useNotification } from '../hooks/use-notification';

function RiNotification3Fill() {
  return (
    <svg
      className="size-6 transition-colors duration-150"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM9 21H15V23H9V21Z"></path>
    </svg>
  );
}

export function NotificationIndicator(props: React.ComponentProps<typeof Button>) {
  const notifications = useNotification().get();
  const unreadCount = getUnreadCount(notifications);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open notifications"
      {...props}
      className={cn('group relative transition-colors duration-150', props.className)}
    >
      <span className="relative inline-block">
        <RiNotification3Fill />
        {unreadCount > 0 ? (
          <span className="absolute -top-[7px] -right-[7px] z-10 flex items-center justify-center">
            <span className="relative flex size-5.5">
              <span
                className={cn(
                  'bg-destructive absolute inline-flex h-full w-full animate-ping rounded-full opacity-40',
                )}
              ></span>
              <span
                className={cn(
                  'bg-destructive border-background relative inline-flex size-5.5 items-center justify-center rounded-full border-3 text-xs font-medium text-white shadow',
                )}
                style={{ minWidth: '1.25rem' }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            </span>
          </span>
        ) : (
          <span className="absolute top-0 right-0 z-10">
            <span
              className={cn('bg-muted-foreground inline-block h-2 w-2 rounded-full opacity-60')}
            />
          </span>
        )}
      </span>
    </Button>
  );
}
