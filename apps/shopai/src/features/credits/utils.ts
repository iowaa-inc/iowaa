import { PRICING_TIERS, WALLET_DEFAULTS } from './config';

/**
 * Clamp the selected leads value to within the minimum and maximum allowed range.
 * @param value The number of leads a user is attempting to select/purchase
 * @returns A clamped integer between WALLET_DEFAULTS.minLeads and WALLET_DEFAULTS.maxLeads
 */
export const validateLeadSelection = (value: number): number => {
  const coercedValue = Number.isFinite(value) ? value : WALLET_DEFAULTS.minLeads;
  return Math.min(Math.max(coercedValue, WALLET_DEFAULTS.minLeads), WALLET_DEFAULTS.maxLeads);
};

/**
 * Find the applicable pricing tier for a given number of leads.
 * Selects the highest tier where selectedLeads >= tier.leads.
 * Returns the lowest tier if no tier matches.
 * @param selectedLeads Number of leads to purchase
 * @returns The pricing tier object from PRICING_TIERS
 */
export const getApplicablePricingTier = (selectedLeads: number) => {
  let bestTier = PRICING_TIERS[0];
  for (const tier of PRICING_TIERS) {
    if (selectedLeads >= tier.leads && tier.leads > bestTier.leads) {
      bestTier = tier;
    }
  }
  return bestTier;
};

/**
 * Calculates pricing details for a given purchase amount.
 * @param selectedLeads Number of leads to purchase
 * @param pricePerLead Cost per lead before discounts
 * @param discount Discount percentage (0-100)
 * @returns An object with base (pre-discount), discountValue, and total (after discount)
 */
export const calculatePrice = (selectedLeads: number, pricePerLead: number, discount: number) => {
  const base = selectedLeads * pricePerLead;
  const discountValue = (base * discount) / 100;
  const total = base - discountValue;
  return { base, discountValue, total };
};
