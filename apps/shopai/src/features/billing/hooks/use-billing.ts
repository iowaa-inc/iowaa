import { useBillingStore } from '../provider';
import type { Transaction } from '../types';

export function useBilling() {
  const { transactions } = useBillingStore();

  return {
    get(transactionId?: string): Transaction[] | Transaction | undefined {
      const all = transactions.get();
      if (transactionId) {
        return all.find((tx) => tx.id === transactionId);
      }
      return all;
    },

    set(transactionsOrTransaction: Transaction[] | Transaction, transactionId?: string) {
      if (transactionId && !Array.isArray(transactionsOrTransaction)) {
        const prev = transactions.get();
        transactions.set(
          prev.map((tx) => (tx.id === transactionId ? transactionsOrTransaction : tx)),
        );
      } else if (Array.isArray(transactionsOrTransaction)) {
        transactions.set(transactionsOrTransaction);
      }
    },

    add(transaction: Transaction) {
      const prev = transactions.get();
      transactions.set([...prev, transaction]);
    },

    update(updates: Partial<Transaction>, transactionId?: string) {
      if (!transactionId) return;
      const prev = transactions.get();
      transactions.set(prev.map((tx) => (tx.id === transactionId ? { ...tx, ...updates } : tx)));
    },

    remove(transactionId: string) {
      const prev = transactions.get();
      transactions.set(prev.filter((tx) => tx.id !== transactionId));
    },

    reset() {
      transactions.reset();
    },
  };
}
