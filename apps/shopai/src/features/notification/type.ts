export type NotificationType = 'lead' | 'governance' | 'inventory' | 'wallet' | 'announcement';

export interface NotificationMetadata {
  productName?: string;
  recordName?: string;
  stockLevel?: number;
  priceVariance?: number;
  creditsRemaining?: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdOn: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: NotificationMetadata;
}
