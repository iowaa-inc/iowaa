import { useUserId } from '@/features/auth/hooks/use-user-id';
import type { PostgrestError } from '@supabase/supabase-js';
import useSWR, { SWRConfiguration } from 'swr';
import { createClient } from '@/lib/supabase/client';
import { SpeechSegment } from '../types';

export function useSpeechSegments(scriptId: string | null, config?: SWRConfiguration) {
  const uid = useUserId();
  const supabase = createClient();

  // Re-fetch when uid or scriptId changes
  const key = uid.data && scriptId ? ['speech_segments', uid.data, scriptId] : null;

  const response = useSWR<SpeechSegment[], PostgrestError | Error, typeof key>(
    key,
    async ([, , sId]) => {
      const { data, error } = await supabase
        .from('speech_segments')
        .select('*')
        .eq('script_id', sId as string)
        .order('order', { ascending: true }); // Important: Ordered chronologically

      if (error) throw error;
      return (data || []) as unknown as SpeechSegment[];
    },
    {
      revalidateOnFocus: false,
      ...config,
    },
  );

  return {
    ...response,
    segments: response.data || [],
    isLoading: response.isLoading || uid.isLoading,
    error: response.error || uid.error,
  };
}