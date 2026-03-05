import { useInventoryStore } from '../inventory-provider';
import type { ProductOffer } from '../types';

export function useProductOffer() {
  const { data } = useInventoryStore();

  return {
    get(poId?: string): ProductOffer[] | ProductOffer | undefined {
      const offers = data.get().offers;
      if (poId) {
        return offers.find((po) => po.id === poId);
      }
      return offers;
    },

    set(offersOrOffer: ProductOffer[] | ProductOffer, poId?: string) {
      if (poId && !Array.isArray(offersOrOffer)) {
        const prev = data.get().offers;
        data.set({
          ...data.get(),
          offers: prev.map((po) => (po.id === poId ? offersOrOffer : po)),
        });
      } else if (Array.isArray(offersOrOffer)) {
        data.set({ ...data.get(), offers: offersOrOffer });
      }
    },

    add(offer: ProductOffer) {
      const prev = data.get().offers;
      data.set({ ...data.get(), offers: [...prev, offer] });
    },

    update(updates: Partial<ProductOffer>, poId?: string) {
      if (!poId) return;
      const prev = data.get().offers;
      data.set({
        ...data.get(),
        offers: prev.map((po) => (po.id === poId ? { ...po, ...updates } : po)),
      });
    },

    remove(poId: string) {
      const prev = data.get().offers;
      data.set({
        ...data.get(),
        offers: prev.filter((po) => po.id !== poId),
      });
    },

    reset() {
      data.reset();
    },
  };
}
