/**
 * @file hooks/useAvailabilityCheck.ts
 * @description Hook and utility to check if a value exists in a Supabase table column.
 */
import type { Database } from '@/types/supabase';
import useSWR, { SWRConfiguration } from 'swr';

import { createClient } from '@/lib/supabase/client';

// ----------------------------------------------------------------------
// Types & Interfaces
// ----------------------------------------------------------------------

export type TableName = keyof Database['public']['Tables'];

// Get valid columns for a specific table T
// We use 'Row' to access the column names. (& string ensures it works with Supabase .eq)
export type TableColumn<T extends TableName> = keyof Database['public']['Tables'][T]['Row'] &
  string;

// We infer the exact type from the Row definition (e.g., string | null, number, boolean)
export type TableValue<
  T extends TableName,
  C extends TableColumn<T>,
> = Database['public']['Tables'][T]['Row'][C];

interface CheckAvailabilityParams<T extends TableName, C extends TableColumn<T>> {
  scope: T;
  property: C;
  value: TableValue<T, C> | undefined | null;
}

interface UseAvailabilityCheckParams<T extends TableName, C extends TableColumn<T>> {
  option: CheckAvailabilityParams<T, C>;
  config?: SWRConfiguration;
}

interface UseAvailabilityCheckResult {
  isAvailable: boolean;
  isTaken: boolean;
  isValidating: boolean;
  isLoading: boolean;
  error: Error | undefined;
  check: () => Promise<boolean | undefined>;
}

// ----------------------------------------------------------------------
// Core Fetcher (Shared Logic)
// ----------------------------------------------------------------------

/**
 * Checks the database count for a specific value.
 * Returns `true` if the count is 0 (Available), `false` if > 0 (Taken).
 */
const fetchAvailability = async <T extends TableName, C extends TableColumn<T>>({
  scope,
  property,
  value,
}: CheckAvailabilityParams<T, C>): Promise<boolean> => {
  // Empty values are technically "available" or just invalid, handling this saves a DB call.
  if (!value) return true;

  const supabase = createClient();

  // Typescript limitation: passing generic `scope` to .from() sometimes
  // breaks strictly typed chains because the mapped type is too complex.
  // We cast `property` to string/any for the internal query builder strictly
  // while keeping the public API type-safe.
  const { count, error } = await supabase
    .from(scope)
    .select('*', { count: 'exact', head: true }) // head: true means we only fetch the count, not the rows
    .eq(property as never, value);

  if (error) {
    throw new Error(error.message);
  }

  // If count is 0, the value does not exist, so it is AVAILABLE.
  return count === 0;
};

// ----------------------------------------------------------------------
// React Hook
// ----------------------------------------------------------------------

/**
 * useAvailabilityCheck
 *
 * Reactive hook to check availability of a database field (e.g., username, slug).
 */
export const useAvailabilityCheck = <T extends TableName, C extends TableColumn<T>>({
  option,
  config = {},
}: UseAvailabilityCheckParams<T, C>): UseAvailabilityCheckResult => {
  const { scope, property, value } = option;

  const shouldFetch = scope && property && value;

  // Use a stable key for SWR
  const key = shouldFetch ? [scope, property, value] : null;

  const { data, error, isValidating, mutate } = useSWR<boolean, Error>(
    key,
    // SWR passes the key array as arguments to the fetcher
    ([s, p, v]) => fetchAvailability({ scope: s, property: p, value: v }),
    {
      revalidateOnFocus: false, // Don't recheck when window gains focus
      keepPreviousData: true, // UI stays stable while typing new characters
      dedupingInterval: 60000, // Cache for 1 minute (renamed from cacheTime in newer SWR versions)
      ...config,
    },
  );

  return {
    isAvailable: data === true,
    isTaken: data === false,
    isValidating,
    // It is loading if we are supposed to fetch, but have no data and no error yet
    isLoading: !!shouldFetch && data === undefined && !error,
    error,
    check: mutate,
  };
};

// ----------------------------------------------------------------------
// Imperative Utility
// ----------------------------------------------------------------------

/**
 * checkSpecificProperty
 *
 * Imperative async function for server-actions or form submission handlers.
 */
export const checkSpecificProperty = async <T extends TableName, C extends TableColumn<T>>(
  scope: T,
  property: C,
  value: TableValue<T, C>,
): Promise<boolean> => {
  try {
    return await fetchAvailability({ scope, property, value });
  } catch (error) {
    console.error(`Availability check failed for ${scope}.${property}:`, error);
    return false;
  }
};
