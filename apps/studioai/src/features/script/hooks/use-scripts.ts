import { useUserId } from '@/features/auth/hooks/use-user-id';
import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';
import { createClient } from '@/lib/supabase/client';
import type { Script } from '../types';

export function useScripts(projectId: string | null, search: string = '', limit: number = 10, config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  // Re-fetch when uid, projectId, search or limit changes
  const key = uid.data && projectId ? ['scripts', uid.data, projectId, search, limit] : null;

  const response = useSWR<Script[], PostgrestError | Error, typeof key>(
    key,
    async ([, , pId, s, lmt]) => {
      let query = supabase
        .from('scripts')
        .select('*')
        .eq('project_id', pId as string);

      if (s) {
        query = query.ilike('name', `%${s as string}%`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(lmt as number);

      if (error) throw error;
      return data || [];
    },
    {
      revalidateOnFocus: false,
      ...config,
    },
  );

  return {
    ...response,
    scripts: response.data || [],
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
