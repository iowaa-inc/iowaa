'use client';

import { createStore } from '@/lib/create-store';

import { leadVolume, topProducts } from './data';
import type { LeadVolume, TopProduct } from './types';

export interface AnalyticsStoreData {
  leadVolume: LeadVolume[];
  topProducts: TopProduct[];
}

const INITIAL_ANALYTICS: AnalyticsStoreData = {
  leadVolume: [...leadVolume],
  topProducts: [...topProducts],
};

const { Provider, useStore } = createStore<AnalyticsStoreData, 'analytics'>({
  storeName: 'analytics',
  initialData: INITIAL_ANALYTICS,
  errorMessage: 'useAnalyticsStore must be used within an AnalyticsProvider',
});

export const AnalyticsProvider = Provider;
export const useAnalyticsStore = useStore;
