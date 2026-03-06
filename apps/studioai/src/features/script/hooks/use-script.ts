import { useUserId } from '@/features/auth/hooks/use-user-id';
import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';
import { createClient } from '@/lib/supabase/client';
import type { Script } from '../types';

export function useScript(scriptId: string | null, config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  const key = uid.data && scriptId ? ['script', uid.data, scriptId] : null;

  const response = useSWR<Script, PostgrestError | Error, typeof key>(
    key,
    async ([, , sId]) => {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('id', sId as string)
        .single();

      if (error) throw error;
      return data;
    },
    {
      revalidateOnFocus: false,
      ...config,
    },
  );

  return {
    ...response,
    script: response.data || null,
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
