'use client';

import { createStore } from '@/lib/create-store';

import { notification as mockNotifications } from './data';
import type { Notification } from './type';

export type NotificationStoreData = Notification[];

const INITIAL_NOTIFICATIONS: NotificationStoreData = [...mockNotifications];

const { Provider, useStore } = createStore<NotificationStoreData, 'notifications'>({
  storeName: 'notifications',
  initialData: INITIAL_NOTIFICATIONS,
  errorMessage: 'useNotificationStore must be used within a NotificationProvider',
});

export const NotificationProvider = Provider;
export const useNotificationStore = useStore;
