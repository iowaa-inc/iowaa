import { useInventoryStore } from '../inventory-provider';
import type { ProductEntity } from '../types';

export function useProductEntity() {
  const { data } = useInventoryStore();

  return {
    get(peId?: string): ProductEntity[] | ProductEntity | undefined {
      const entities = data.get().entity;
      if (peId) {
        return entities.find((pe) => pe.id === peId);
      }
      return entities;
    },

    set(entitiesOrEntity: ProductEntity[] | ProductEntity, peId?: string) {
      if (peId && !Array.isArray(entitiesOrEntity)) {
        const prev = data.get().entity;
        data.set({
          ...data.get(),
          entity: prev.map((pe) => (pe.id === peId ? entitiesOrEntity : pe)),
        });
      } else if (Array.isArray(entitiesOrEntity)) {
        data.set({ ...data.get(), entity: entitiesOrEntity });
      }
    },

    add(entity: ProductEntity) {
      const prev = data.get().entity;
      data.set({ ...data.get(), entity: [...prev, entity] });
    },

    update(updates: Partial<ProductEntity>, peId?: string) {
      if (!peId) return;
      const prev = data.get().entity;
      data.set({
        ...data.get(),
        entity: prev.map((pe) => (pe.id === peId ? { ...pe, ...updates } : pe)),
      });
    },

    remove(peId: string) {
      const prev = data.get().entity;
      data.set({
        ...data.get(),
        entity: prev.filter((pe) => pe.id !== peId),
      });
    },

    reset() {
      data.reset();
    },
  };
}
