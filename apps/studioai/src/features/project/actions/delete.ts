'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

/**
 * Deletes a project by its ID.
 *
 * Throws an error if the user is not authenticated or if trying to delete the "Personal" project.
 */
export async function deleteProject(projectId: string) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  // Find the project to check for "Personal"
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('name')
    .eq('id', projectId)
    .single();

  if (projectError) {
    throw new Error('Failed to fetch project');
  }

  if (project?.name === 'Personal') {
    throw new Error('Cannot delete Personal project');
  }

  const { error: deleteError } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // Revalidate the projects list cache (customize the path as needed)
  revalidatePath('/projects');
}
