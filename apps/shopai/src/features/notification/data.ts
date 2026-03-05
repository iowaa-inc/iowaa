import { Notification } from './type';

export const notification: Notification[] = [
  {
    id: '1',
    type: 'lead',
    title: 'New Click-to-Chat Lead',
    description: 'Buyer interested in iPhone 14 Pro',
    createdOn: '2 min ago',
    isRead: false,
    actionUrl: '/dashboard/leads',
    metadata: {
      productName: 'iPhone 14 Pro',
    },
  },
  {
    id: '2',
    type: 'governance',
    title: 'Action Required: Verify product change',
    description: 'Screen Size changed for "iPhone 13" - Vote needed',
    createdOn: '15 min ago',
    isRead: false,
    actionUrl: '#vote-widget',
    metadata: {
      recordName: 'iPhone 13',
    },
  },
  {
    id: '3',
    type: 'lead',
    title: 'New Click-to-Chat Lead',
    description: 'Buyer interested in Samsung Galaxy Watch 6',
    createdOn: '1 hour ago',
    isRead: false,
    actionUrl: '/dashboard/leads',
    metadata: {
      productName: 'Samsung Galaxy Watch 6',
    },
  },
  {
    id: '4',
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'Wireless Headphones Pro is down to 2 units',
    createdOn: '3 hours ago',
    isRead: false,
    actionUrl: '/dashboard/inventory',
    metadata: {
      stockLevel: 2,
    },
  },
  {
    id: '5',
    type: 'inventory',
    title: 'Price Outlier Warning',
    description: 'Your price is 50% higher than market average (Suppressed)',
    createdOn: '5 hours ago',
    isRead: false,
    actionUrl: '/dashboard/inventory',
    metadata: {
      priceVariance: 50,
    },
  },
  {
    id: '6',
    type: 'wallet',
    title: 'System Alert: Low Credits',
    description: 'You have 5 leads remaining. Top up to prevent service pause',
    createdOn: 'Yesterday',
    isRead: false,
    actionUrl: '/dashboard/wallet',
    metadata: {
      creditsRemaining: 5,
    },
  },
  {
    id: '7',
    type: 'inventory',
    title: 'Incomplete Listing Data',
    description: 'Add 1 more photo to unlock the Verified Badge',
    createdOn: 'Yesterday',
    isRead: true,
    actionUrl: '/dashboard/inventory',
  },
  {
    id: '8',
    type: 'announcement',
    title: 'New Feature: WooCommerce Integration',
    description: 'WooCommerce Integration is now live',
    createdOn: '2 days ago',
    isRead: true,
  },
];
