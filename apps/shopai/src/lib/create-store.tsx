'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

/**
 * Configuration for creating a store
 */
export interface CreateStoreConfig<T, StoreName extends string> {
  /** Name of the store property (e.g., "wallet", "notifications", "data") */
  storeName: StoreName;
  /** Initial data value */
  initialData: T;
  /** Optional: whether to support partial updates for object types */
  supportPartialUpdates?: boolean;
  /** Optional: custom error message for hook usage outside provider */
  errorMessage?: string;
}

/**
 * Updater type that can be either a function or new data
 */
export type StoreUpdater<T, Partial extends boolean = false> = Partial extends true
  ? ((prev: T) => T) | T | Partial<T>
  : ((prev: T) => T) | T;

/**
 * Store methods for managing data
 */
export interface StoreMethods<T, Partial extends boolean = false> {
  get: () => T;
  set: (newData: T) => void;
  update: (updates: StoreUpdater<T, Partial>) => void;
  reset: () => void;
}

/**
 * Context type returned by the factory
 */
export type StoreContextType<T, StoreName extends string, Partial extends boolean = false> = {
  [K in StoreName]: StoreMethods<T, Partial>;
} & {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

/**
 * Factory function that creates a complete store (context, provider, and hook)
 *
 * @example
 * ```tsx
 * const { Provider, useStore } = createStore({
 *   storeName: "wallet",
 *   initialData: { balance: 0 },
 * });
 *
 * // Usage
 * <Provider>{children}</Provider>
 * const { wallet, isLoading } = useStore();
 * ```
 */
export function createStore<T, StoreName extends string>(config: CreateStoreConfig<T, StoreName>) {
  const { storeName, initialData, supportPartialUpdates = false, errorMessage } = config;

  type Updater = StoreUpdater<T, typeof supportPartialUpdates>;
  type ContextType = StoreContextType<T, StoreName, typeof supportPartialUpdates>;

  const StoreContext = createContext<ContextType | undefined>(undefined);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setLoading] = useState(false);

    const get = () => data;

    const set = (newData: T) => {
      setData(newData);
    };

    const update = (updates: Updater) => {
      setData((prev) => {
        if (typeof updates === 'function') {
          return updates(prev);
        }
        if (
          supportPartialUpdates &&
          typeof prev === 'object' &&
          prev !== null &&
          typeof updates === 'object' &&
          updates !== null
        ) {
          return { ...prev, ...updates } as T;
        }
        return updates as T;
      });
    };

    const reset = () => {
      if (Array.isArray(initialData)) {
        setData([...initialData] as T);
      } else if (typeof initialData === 'object' && initialData !== null) {
        setData({ ...initialData });
      } else {
        setData(initialData);
      }
    };

    const storeMethods: StoreMethods<T, typeof supportPartialUpdates> = {
      get,
      set,
      update,
      reset,
    };

    const contextValue = {
      [storeName]: storeMethods,
      isLoading,
      setLoading,
    } as ContextType;

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
  };

  const useStore = () => {
    const ctx = useContext(StoreContext);
    if (!ctx) {
      throw new Error(errorMessage || `useStore must be used within a ${storeName} Provider`);
    }
    return ctx;
  };

  return {
    Provider,
    useStore,
    Context: StoreContext,
  };
}
