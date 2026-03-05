import { AnalyticsStoreData, useAnalyticsStore } from '../provider';
import type { TopProduct } from '../types';

export function useTopProducts() {
  const { analytics, setLoading, isLoading } = useAnalyticsStore();

  return {
    get(): TopProduct[] {
      return analytics.get().topProducts;
    },

    set(topProducts: TopProduct[]) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        topProducts,
      }));
    },

    add(product: TopProduct) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        topProducts: [...prev.topProducts, product],
      }));
    },

    update(updates: Partial<TopProduct>, productId?: string) {
      if (!productId) return;
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        topProducts: prev.topProducts.map((p) =>
          p.productId === productId ? { ...p, ...updates } : p,
        ),
      }));
    },

    remove(productId: string) {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        topProducts: prev.topProducts.filter((p) => p.productId !== productId),
      }));
    },

    reset() {
      analytics.update((prev: AnalyticsStoreData) => ({
        ...prev,
        topProducts: [],
      }));
    },

    isLoading,
    setLoading,
  };
}
