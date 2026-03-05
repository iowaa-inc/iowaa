import { useWalletStore } from '../provider';
import type { Wallet } from '../type';

export function useCredits() {
  const { wallet } = useWalletStore();

  return {
    get<K extends keyof Wallet>(key?: K, value?: Wallet[K]): Wallet {
      const all = wallet.get();
      if (key !== undefined && value !== undefined) {
        return all[key] === value ? all : all;
      }
      return all;
    },

    set(newWallet: Wallet) {
      wallet.set(newWallet);
    },

    update(updates: Partial<Wallet>) {
      const prev = wallet.get();
      wallet.set({ ...prev, ...updates });
    },

    reset() {
      wallet.reset();
    },
  };
}
