export const WALLET_DEFAULTS = {
  selectedLeads: 1000 /** Default number of leads selected when page loads */,
  maxCapacity: 5000 /** Maximum lead capacity for storage */,
  minLeads: 500 /** Minimum leads that can be purchased */,
  maxLeads: 5000 /** Maximum leads that can be purchased in one transaction */,
} as const;

export const BASE_PRICE_PER_LEAD = 4;

export interface PricingTier {
  leads: number;
  discount: number;
}

export const PRICING_TIERS: PricingTier[] = [
  { leads: 500, discount: 0 },
  { leads: 1000, discount: 10 },
  { leads: 2000, discount: 15 },
  { leads: 3500, discount: 20 },
  { leads: 5000, discount: 25 },
];
