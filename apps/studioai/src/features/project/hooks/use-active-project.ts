import { useUserId } from '@/features/auth/hooks/use-user-id';
import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';

import { createClient } from '@/lib/supabase/client';

import type { Project } from '../types';

type ActiveProjectRow = {
  active_project_id: string;
  projects: Project | null;
};

export function useActiveProject(config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  const key = uid.data ? ['active_project', uid.data] : null;

  const response = useSWR<ActiveProjectRow, PostgrestError | Error, typeof key>(
    key,
    async ([, userId]) => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('active_project_id, projects:active_project_id (*)')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('User settings not found');

      return data as ActiveProjectRow;
    },
    { revalidateOnFocus: false, ...config },
  );

  return {
    ...response,
    activeProject: response.data?.projects ?? null,
    activeProjectId: response.data?.active_project_id ?? null,
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}
