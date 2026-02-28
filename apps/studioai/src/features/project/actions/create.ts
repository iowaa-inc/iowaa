'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

import type { Project } from '../types';

export type CreateProjectInput = {
  name: string;
  description?: string;
};

export type CreateProjectResult =
  | { success: true; project: Project }
  | { success: false; error: string };

export async function createProject(
  input: CreateProjectInput,
): Promise<CreateProjectResult> {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return {
      success: false,
      error: 'You must be signed in to create a project',
    };
  }

  const { data: project, error } = await supabase.rpc('create_project', {
    p_name: input.name.trim(),
    p_description: input.description?.trim() || undefined,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (!project) {
    return { success: false, error: 'Failed to create project' };
  }

  revalidatePath('/workspace');
  return { success: true, project: project as unknown as Project };
}
