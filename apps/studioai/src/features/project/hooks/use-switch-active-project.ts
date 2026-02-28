import { useCallback } from 'react';

import { useUserId } from '@/features/auth/hooks/use-user-id';
import { useUserSettings } from '@/features/auth/hooks/use-user-setting';
import { mutate } from 'swr';

import { createClient } from '@/lib/supabase/client';

export function useSwitchActiveProject() {
  const uid = useUserId();
  const { data: settings, mutate: mutateSettings } = useUserSettings();
  const supabase = createClient();

  const switchActiveProject = useCallback(
    async (projectId: string) => {
      if (!settings) throw new Error('User settings not found');
      if (!uid.data) throw new Error('User not authenticated');

      // Check membership
      const { data: member, error: memberError } = await supabase
        .from('project_members')
        .select('project_id')
        .eq('project_id', projectId)
        .eq('user_id', uid.data)
        .single();

      if (memberError || !member) {
        throw new Error('You are not a member of this project');
      }

      // Optimistically update settings
      await mutateSettings(
        { ...settings, active_project_id: projectId },
        false,
      );

      // Update active project on the server
      const { error } = await supabase
        .from('user_settings')
        .update({ active_project_id: projectId })
        .eq('user_id', settings.user_id);

      // Rollback on error
      if (error) {
        await mutateSettings();
        throw error;
      }

      // Revalidate final value and notify related keys
      await mutateSettings();
      await mutate(['active_project', uid.data]);
    },
    [settings, mutateSettings, uid.data],
  );

  return { switchActiveProject };
}
