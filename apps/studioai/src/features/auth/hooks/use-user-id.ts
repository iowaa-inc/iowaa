import { AuthError } from '@supabase/supabase-js';
import useSWR from 'swr';

import { createClient } from '@/lib/supabase/client';

export function useUserId() {
  return useSWR<string, AuthError>(
    'user-id',
    async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        throw error;
      }

      return data.user.id;
    },
    {
      revalidateOnFocus: true,
      refreshInterval: 0,
      shouldRetryOnError: false,
    },
  );
}
