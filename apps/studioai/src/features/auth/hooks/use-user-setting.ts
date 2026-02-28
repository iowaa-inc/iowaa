import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';

import { createClient } from '@/lib/supabase/client';

import type { UserSettings } from '../types';
import { useUserId } from './use-user-id';

export function useUserSettings(config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  const key = uid.data ? ['user_settings', uid.data] : null;

  const response = useSWR<UserSettings, PostgrestError | Error, typeof key>(
    key,
    async ([, userId]) => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('User settings not found');

      return data as UserSettings;
    },
    config,
  );

  return {
    ...response,
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
