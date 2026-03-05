import { useInventoryStore } from '../inventory-provider';
import type { ProductAttribute } from '../types';

export function useProductAttribute() {
  const { data } = useInventoryStore();

  return {
    get(
      key?: keyof ProductAttribute,
      value?: string,
    ): ProductAttribute[] | ProductAttribute | undefined {
      const attributes = data.get().attributes;
      if (key && value !== undefined) {
        return attributes.filter((attr: ProductAttribute) => attr[key] === value);
      }
      return attributes;
    },

    set(attributesOrAttribute: ProductAttribute[] | ProductAttribute, patId?: string) {
      if (patId && !Array.isArray(attributesOrAttribute)) {
        const prev = data.get().attributes;
        data.set({
          ...data.get(),
          attributes: prev.map((attr) => (attr.id === patId ? attributesOrAttribute : attr)),
        });
      } else if (Array.isArray(attributesOrAttribute)) {
        data.set({ ...data.get(), attributes: attributesOrAttribute });
      }
    },

    add(attribute: ProductAttribute) {
      const prev = data.get().attributes;
      data.set({ ...data.get(), attributes: [...prev, attribute] });
    },

    update(updates: Partial<ProductAttribute>, patId?: string) {
      if (!patId) return;
      const prev = data.get().attributes;
      data.set({
        ...data.get(),
        attributes: prev.map((attr) => (attr.id === patId ? { ...attr, ...updates } : attr)),
      });
    },

    remove(patId: string) {
      const prev = data.get().attributes;
      data.set({
        ...data.get(),
        attributes: prev.filter((attr) => attr.id !== patId),
      });
    },

    reset() {
      data.reset();
    },
  };
}
