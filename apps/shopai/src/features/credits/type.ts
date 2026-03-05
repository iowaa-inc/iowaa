export interface Wallet {
  balance: number; // Number of available lead credits
  createdAt: string; // ISO date string when the wallet was created
  updatedAt: string; // ISO date string when this wallet was last updated
  ownerId: string; // User or account ID owning this wallet
  maxCapacity: number; // Maximum lead credits allowed in the wallet
  isActive: boolean; // Whether the wallet is currently active
}
