'use server';

import { createClient } from '@/lib/supabase/server';

import type { UserProfile, UserSettings } from '../types';

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select('*')
    .single();

  if (error) throw error;

  if (!data) {
    throw new Error('User profile not found or not updated');
  }

  return data as UserProfile;
}

export async function updateUserPreference(
  userId: string,
  newPrefs: Partial<UserSettings['preferences']>,
) {
  const supabase = await createClient();

  // Fetch current settings
  const { data: userSettings, error: fetchError } = await supabase
    .from('user_settings')
    .select('preferences')
    .eq('user_id', userId)
    .single();

  if (fetchError) throw fetchError;
  if (!userSettings) throw new Error('User settings not found');

  const updatedPreferences = {
    ...(userSettings.preferences ?? {}),
    ...newPrefs,
  };

  // Update preferences in db
  const { error: updateError, data: updated } = await supabase
    .from('user_settings')
    .update({ preferences: updatedPreferences })
    .eq('user_id', userId)
    .select('preferences')
    .single();

  if (updateError) throw updateError;
  if (!updated) throw new Error('Failed to update user preferences');

  return updated.preferences as UserSettings['preferences'];
}
