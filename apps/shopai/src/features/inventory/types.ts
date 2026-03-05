export type ProductStatus = 'live' | 'draft';

export type ProductHealth = 'live' | 'review' | 'error';

export interface ProductEntity {
  id: string;
  name: string;
  brand: string;
  type: string;
  images: string[];
  createdOn: string;
  updatedOn: string;
  description: string;
  createdById: string;
}

export interface ProductOffer {
  id: string;
  entityId: string;
  price: number;
  description: string;
  availability: boolean;
  // status: ProductStatus
  // health: ProductHealth
}

export interface ProductAttributeProperty {
  id: string;
  name: string;
  type: string;
  entityId: string;
}

export interface ProductAttribute {
  id: string;
  propertyId: string;
  entityId: string;
  value: string;
}

export interface ProductAttributeDraft {
  id: string;
  type: string;
  property: string;
  value: string;
}

export interface ProductAttributeProposal {
  id: string;
  value: string;
  entityId: string;
  attributeId: string;
  propertyId: string;
  createdById: string;
  createdOn: string;
  votes: number;
  votesRequired: number;
}
