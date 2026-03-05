import { useInventoryStore } from '../inventory-provider';
import type { ProductAttributeProperty } from '../types';

export function useProductAttributeProperty() {
  const { data } = useInventoryStore();

  return {
    get(
      key?: keyof ProductAttributeProperty,
      value?: string,
    ): ProductAttributeProperty[] | ProductAttributeProperty | undefined {
      const properties = data.get().attributeProperties;
      if (key && value !== undefined) {
        return properties.filter((prop: ProductAttributeProperty) => prop[key] === value);
      }
      return properties;
    },

    set(
      propertiesOrProperty: ProductAttributeProperty[] | ProductAttributeProperty,
      propId?: string,
    ) {
      if (propId && !Array.isArray(propertiesOrProperty)) {
        const prev = data.get().attributeProperties;
        data.set({
          ...data.get(),
          attributeProperties: prev.map((prop) =>
            prop.id === propId ? propertiesOrProperty : prop,
          ),
        });
      } else if (Array.isArray(propertiesOrProperty)) {
        data.set({
          ...data.get(),
          attributeProperties: propertiesOrProperty,
        });
      }
    },

    add(property: ProductAttributeProperty) {
      const prev = data.get().attributeProperties;
      data.set({ ...data.get(), attributeProperties: [...prev, property] });
    },

    update(updates: Partial<ProductAttributeProperty>, propId?: string) {
      if (!propId) return;
      const prev = data.get().attributeProperties;
      data.set({
        ...data.get(),
        attributeProperties: prev.map((prop) =>
          prop.id === propId ? { ...prop, ...updates } : prop,
        ),
      });
    },

    remove(propId: string) {
      const prev = data.get().attributeProperties;
      data.set({
        ...data.get(),
        attributeProperties: prev.filter((prop) => prop.id !== propId),
      });
    },

    reset() {
      data.reset();
    },
  };
}
