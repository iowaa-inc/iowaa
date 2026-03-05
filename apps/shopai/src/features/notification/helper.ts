import type { Notification, NotificationType } from './type';

export function filterNotificationsByTab(
  notifications: Notification[],
  activeTab: NotificationType | 'all',
): Notification[] {
  if (activeTab === 'all') {
    return notifications;
  }
  return notifications.filter((notification) => notification.type === activeTab);
}

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((notification) => !notification.isRead).length;
}

export function getUnreadCountByType(
  notifications: Notification[],
  type: NotificationType,
): number {
  return notifications.filter((notification) => notification.type === type && !notification.isRead)
    .length;
}
