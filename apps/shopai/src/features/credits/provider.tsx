'use client';

import { createStore } from '@/lib/create-store';

import type { Wallet } from './type';

export type WalletStoreData = Wallet;

const INITIAL_WALLET: WalletStoreData = {
  balance: 456,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ownerId: '',
  maxCapacity: 5000,
  isActive: true,
};

const { Provider, useStore } = createStore<WalletStoreData, 'wallet'>({
  storeName: 'wallet',
  initialData: INITIAL_WALLET,
  errorMessage: 'useWalletStore must be used within a WalletProvider',
});

export const WalletProvider = Provider;
export const useWalletStore = useStore;
