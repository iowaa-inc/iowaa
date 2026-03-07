import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';

import { createClient } from '@/lib/supabase/client';

import type { UserProfile } from '../types';
import { useUserId } from './use-user-id';

export function useUserProfile(config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  const key = uid.data ? ['user_profile', uid.data] : null;

  const response = useSWR<UserProfile, PostgrestError | Error, typeof key>(
    key,
    async ([, uid]) => {
      if (!uid) throw new Error('User ID not available');
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (error) throw error;
      if (!data) throw new Error('User profile not found');

      return data;
    },
    config,
  );

  return {
    ...response,
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
