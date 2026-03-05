import { AnalyticsStoreData, useAnalyticsStore } from '../provider';
import type { LeadVolume } from '../types';

export function useLeadVolume() {
  const { analytics, setLoading, isLoading } = useAnalyticsStore();

  return {
    get(): LeadVolume[] {
      return analytics.get().leadVolume;
    },

    set(leadVolume: LeadVolume[]) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        leadVolume,
      }));
    },

    add(volume: LeadVolume) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        leadVolume: [...prev.leadVolume, volume],
      }));
    },

    update(updates: Partial<LeadVolume>, date?: string) {
      if (!date) return;
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        leadVolume: prev.leadVolume.map((l) => (l.date === date ? { ...l, ...updates } : l)),
      }));
    },

    remove(date: string) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        leadVolume: prev.leadVolume.filter((l) => l.date !== date),
      }));
    },

    reset() {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        leadVolume: [],
      }));
    },

    isLoading,
    setLoading,
  };
}
