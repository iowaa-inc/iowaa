'use client';

import { createStore } from '@/lib/create-store';

import {
  productAttributeProposals,
  productAttributes,
  productAttributesProperties,
  productEntity,
  productOffer,
} from './data';
import type {
  ProductAttribute,
  ProductAttributeProperty,
  ProductAttributeProposal,
  ProductEntity,
  ProductOffer,
} from './types';

export type MockData = {
  entity: ProductEntity[];
  offers: ProductOffer[];
  attributeProperties: ProductAttributeProperty[];
  attributes: ProductAttribute[];
  attributeProposals: ProductAttributeProposal[];
};

const INITIAL_DATA: MockData = {
  entity: productEntity,
  offers: productOffer,
  attributeProperties: productAttributesProperties,
  attributes: productAttributes,
  attributeProposals: productAttributeProposals,
};

const { Provider, useStore } = createStore<MockData, 'data'>({
  storeName: 'data',
  initialData: INITIAL_DATA,
  supportPartialUpdates: true,
  errorMessage: 'useInventoryStore must be used within an InventoryProvider',
});

export const InventoryProvider = Provider;
export const useInventoryStore = useStore;
