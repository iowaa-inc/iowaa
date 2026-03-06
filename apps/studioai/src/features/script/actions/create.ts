'use server';

import { createClient } from '@/lib/supabase/server';
import type { Script } from '../types';

export type CreateScriptInput = {
  name: string;
  projectId: string;
};

export type CreateScriptResult =
  | { success: true; script: Script }
  | { success: false; error: string };

export async function createScript(
  input: CreateScriptInput,
): Promise<CreateScriptResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return {
      success: false,
      error: 'You must be signed in to create a script',
    };
  }

  const { data: script, error } = await supabase
    .from('scripts')
    .insert({
      name: input.name.trim(),
      project_id: input.projectId,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  if (!script) {
    return { success: false, error: 'Failed to create script' };
  }

  return { success: true, script: script as Script };
}
