import { useNotificationStore } from '../provider';
import type { Notification } from '../type';

export function useNotification() {
  const { notifications } = useNotificationStore();

  return {
    get<K extends keyof Notification>(key?: K, value?: Notification[K]): Notification[] {
      const all = notifications.get();
      if (key !== undefined && value !== undefined) {
        return all.filter((notification: Notification) => notification[key] === value);
      }
      return all;
    },

    set(notificationsOrNotification: Notification[] | Notification, notificationId?: string) {
      if (notificationId && !Array.isArray(notificationsOrNotification)) {
        const prev = notifications.get();
        notifications.set(
          prev.map((n) => (n.id === notificationId ? notificationsOrNotification : n)),
        );
      } else if (Array.isArray(notificationsOrNotification)) {
        notifications.set(notificationsOrNotification);
      }
    },

    add(notification: Notification) {
      const prev = notifications.get();
      notifications.set([...prev, notification]);
    },

    update(updates: Partial<Notification>, notificationId?: string) {
      if (!notificationId) return;
      const prev = notifications.get();
      notifications.set(prev.map((n) => (n.id === notificationId ? { ...n, ...updates } : n)));
    },

    remove(notificationId: string) {
      const prev = notifications.get();
      notifications.set(prev.filter((n) => n.id !== notificationId));
    },

    reset() {
      notifications.reset();
    },
  };
}
