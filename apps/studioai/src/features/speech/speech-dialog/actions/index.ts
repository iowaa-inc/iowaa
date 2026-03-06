'use server';

import { createClient } from '@/lib/supabase/server';
import { 
  CreateSpeechSegmentRequest, 
  UpdateSpeechSegmentRequest, 
  DeleteSpeechSegmentRequest, 
  ReorderSpeechSegmentsRequest,
  SpeechSegment 
} from '../types';
import { Json } from '@/types/supabase';

export type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createSpeechSegment(
  input: CreateSpeechSegmentRequest
): Promise<ActionResponse<SpeechSegment>> {
  const supabase = await createClient();

  // Basic auth check
  const { data: { user }, error: sessionError } = await supabase.auth.getUser();
  if (sessionError || !user) {
    return { success: false, error: 'You must be signed in to create a segment' };
  }

  // Calculate order if not provided
  let order = input.order;
  if (order === undefined) {
    const { data: maxOrderSegment, error: maxError } = await supabase
      .from('speech_segments')
      .select('order')
      .eq('script_id', input.script_id)
      .order('order', { ascending: false })
      .limit(1)
      .single();
    
    order = (maxOrderSegment?.order ?? -1) + 1;
  }

  // Calculate timestamp if not provided
  let timestamp = input.timestamp;
  if (timestamp === undefined) {
    const { data: maxTimestampSegment } = await supabase
      .from('speech_segments')
      .select('timestamp')
      .eq('script_id', input.script_id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();
    
    timestamp = parseFloat(((maxTimestampSegment?.timestamp ?? 0) + 5).toFixed(2));
  }

  const defaultContent = [{ type: 'paragraph', children: [{ text: '' }] }];

  const { data: segment, error } = await supabase
    .from('speech_segments')
    .insert({
      ...(input.id ? { id: input.id } : {}),
      script_id: input.script_id,
      order: order,
      timestamp: timestamp,
      content: ((input.content && input.content.length > 0) ? input.content : defaultContent) as unknown as Json,
      expressions: (input.expressions ?? []) as unknown as Json,
      config: (input.config ?? {}) as unknown as Json,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: segment as unknown as SpeechSegment };
}

export async function updateSpeechSegment(
  input: UpdateSpeechSegmentRequest
): Promise<ActionResponse<SpeechSegment>> {
  const supabase = await createClient();

  const { data: { user }, error: sessionError } = await supabase.auth.getUser();
  if (sessionError || !user) {
    return { success: false, error: 'You must be signed in to update a segment' };
  }

  const updates: any = {};
  if (input.content !== undefined) updates.content = input.content as unknown as Json;
  if (input.expressions !== undefined) updates.expressions = input.expressions as unknown as Json;
  if (input.config !== undefined) updates.config = input.config as unknown as Json;
  if (input.timestamp !== undefined) updates.timestamp = input.timestamp;
  if (input.order !== undefined) updates.order = input.order;

  const { data: segment, error } = await supabase
    .from('speech_segments')
    .update(updates)
    .eq('id', input.id)
    .select()
    .single();

  if (error) {
    console.error('Update Speech Segment error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data: segment as unknown as SpeechSegment };
}

export async function deleteSpeechSegment(
  input: DeleteSpeechSegmentRequest
): Promise<ActionResponse<void>> {
  const supabase = await createClient();

  const { data: { user }, error: sessionError } = await supabase.auth.getUser();
  if (sessionError || !user) {
    return { success: false, error: 'You must be signed in to delete a segment' };
  }

  const { error } = await supabase
    .from('speech_segments')
    .delete()
    .eq('id', input.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: undefined };
}

export async function reorderSpeechSegments(
  input: ReorderSpeechSegmentsRequest
): Promise<ActionResponse<void>> {
  const supabase = await createClient();

  const { data: { user }, error: sessionError } = await supabase.auth.getUser();
  if (sessionError || !user) {
    return { success: false, error: 'You must be signed in to reorder segments' };
  }

  // Update logic: using individual updates in sequence for simplicity,
  // could use an RPC for batched updates if performance is critical later.
  for (const item of input.segmentOrders) {
    const { error } = await supabase
      .from('speech_segments')
      .update({ order: item.order })
      .eq('id', item.id)
      .eq('script_id', input.script_id); // Security check
      
    if (error) {
       console.error(`Failed to update order for segment ${item.id}:`, error);
       return { success: false, error: error.message };
    }
  }

  return { success: true, data: undefined };
}
