export interface HourlyLead {
  id: string;
  ownerId: string;
  date: string;
  hour: number;
  timestamp: string;
  leads: number;
}

export interface TopProduct {
  /**
   * Unique identifier for this top product analytics record.
   * Ideal use: used as a React key or for tracking this row in the analytics UI.
   */
  id: string;

  /**
   * Reference to the ProductEntity (core product catalog entry).
   * Ideal use: used to lookup product details, image, and name in inventory.
   */
  entityId: string;

  /**
   * Reference to the ProductOffer (specific sale offer, variant, or channel listing).
   * Ideal use: used to relate analytics to a particular offer or listing.
   */
  offerId: string;

  /**
   * Total number of leads generated for this offer during the period.
   * Ideal use: display, ranking, or quick summary of product/offer performance.
   */
  totalLeads: number;

  /**
   * Conversion rate (%) for this offer during the period (0-100).
   * Ideal use: shows how effective the offer is at converting interest to leads.
   */
  conversionRate: number;

  /**
   * When this analytics record was last updated or calculated (ISO string).
   * Ideal use: can be shown as a "last updated" hint, never for filtering or logic.
   */
  lastUpdated: string;

  /**
   * Human-readable summary of the analytic period (e.g., "last 30 days", "weekly").
   * Ideal use: only for display/context in the UI; not for logic or filtering.
   */
  period: string;
}

export interface LeadVolume {
  date: string;
  leads: number;
  day: string;
}

export interface DailyLead {
  date: string;
  leads: number;
}

export interface ProductLead {
  productId: string;
  productName: string;
  productImage: string;
  leads: number;
}

export interface LeadsData {
  hourlyData: Record<string, HourlyLead[]>;
  dailyData: DailyLead[];
  monthlyData: DailyLead[];
  yearlyData: DailyLead[];
  productLeadsData: Record<string, ProductLead[]>;
}
