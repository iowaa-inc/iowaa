import { useUserId } from '@/features/auth/hooks/use-user-id';
import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';

import { createClient } from '@/lib/supabase/client';

import type { Project } from '../types';

export function useProjects(config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  const key = uid.data ? ['projects', uid.data] : null;

  const response = useSWR<Project[], PostgrestError | Error, typeof key>(
    key,
    async ([, userId]) => {
      const { data, error } = await supabase
        .from('project_members')
        .select(
          `
          projects:project_id (
            *
          )
        `,
        )
        .eq('user_id', userId as string);

      if (error) throw error;

      // Return sorted valid projects (order: created_at DESC)
      return (data || [])
        .map((row) => row.projects)
        .filter((project): project is Project => project !== null)
        .sort((a, b) => {
          const dateA = new Date(a.created_at ?? 0).getTime();
          const dateB = new Date(b.created_at ?? 0).getTime();
          return dateB - dateA;
        });
    },
    {
      revalidateOnFocus: false,
      ...config,
    },
  );

  return {
    ...response,
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
