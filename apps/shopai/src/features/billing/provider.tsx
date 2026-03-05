'use client';

import { createStore } from '@/lib/create-store';

import { transactions as mockTransactions } from './data';
import type { Transaction } from './types';

export type BillingStoreData = Transaction[];

const INITIAL_TRANSACTIONS: BillingStoreData = [...mockTransactions];

const { Provider, useStore } = createStore<BillingStoreData, 'transactions'>({
  storeName: 'transactions',
  initialData: INITIAL_TRANSACTIONS,
  errorMessage: 'useBillingStore must be used within a BillingProvider',
});

export const BillingProvider = Provider;
export const useBillingStore = useStore;
