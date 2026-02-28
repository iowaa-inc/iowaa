import { Tables } from '@/types/supabase';

export type UserProfile = Tables<'user_profiles'>;
export type UserSettings = Omit<Tables<'user_settings'>, 'preferences'> & {
  preferences: Record<string, any>;
};
