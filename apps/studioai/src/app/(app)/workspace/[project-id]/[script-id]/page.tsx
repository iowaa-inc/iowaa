'use client';

import { useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDebounceCallback } from 'usehooks-ts';

import { useScript } from '@/features/script/hooks/use-script';

import { ScriptWorkspaceHeader } from '@/components/layout/script-workspace-header';
import {
  SpeechDialogList,
  SpeechSegment,
} from '@/features/speech/speech-dialog';
import { useSpeechSegments } from '@/features/speech/speech-dialog/hooks/use-speech-segments';
import { 
  createSpeechSegment, 
  updateSpeechSegment, 
  deleteSpeechSegment 
} from '@/features/speech/speech-dialog/actions';
import { toast } from 'sonner';

export default function WorkspacePage() {
  const params = useParams();
  const scriptId = params?.['script-id'] as string;
  const { script } = useScript(scriptId || null);

  const { segments: rawSegments, mutate, isLoading } = useSpeechSegments(scriptId || null);
  const segments = rawSegments || [];

  // Offline / Pending update queue
  const pendingUpdates = useRef<Record<string, Partial<SpeechSegment>>>({});

  // Sync offline updates locally on changes
  const saveToLocal = (data: Record<string, Partial<SpeechSegment>>) => {
    try {
      if (!scriptId) return;
      localStorage.setItem(`segments-sync-${scriptId}`, JSON.stringify(data));
    } catch(e) {}
  };

  const syncUpdates = useDebounceCallback(async () => {
    const updates = { ...pendingUpdates.current };
    pendingUpdates.current = {};
    saveToLocal({}); // clear local storage cache

    for (const [id, updateData] of Object.entries(updates)) {
      const res = await updateSpeechSegment({ id, ...updateData });
      if (!res.success) {
        toast.error(`Failed to sync segment: ${res.error}`);
      } else {
        // Clear _isSyncing status without a full revalidate
        mutate((prev) => prev?.map((s) => s.id === id ? { ...s, _isSyncing: false } : s), false);
      }
    }
  }, 3000);

  // Safety net: Warn user and attempt to flush if they close the tab with pending updates
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(pendingUpdates.current).length > 0) {
        // Attempt to fire off the request immediately
        syncUpdates.flush();
        // Standard beforeunload pattern to prompt the user
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [syncUpdates]);

  // Handler for when a segment is updated
  const handleSegmentChange = (segmentId: string, updates: Partial<SpeechSegment>) => {
    if (!scriptId) return;

    // Queue update
    pendingUpdates.current[segmentId] = {
      ...(pendingUpdates.current[segmentId] || {}),
      ...updates
    };
    saveToLocal(pendingUpdates.current);
    
    // Optimistic update
    mutate(
      (prev) => prev?.map((segment) =>
        segment.id === segmentId
          ? { ...segment, ...updates, updated_at: new Date().toISOString(), _isSyncing: true }
          : segment
      ),
      false
    );

    syncUpdates();
  };

  // Handler for when a segment is deleted
  const handleSegmentDelete = async (segmentId: string) => {
    if (!scriptId) return;

    // Optimistic update
    mutate(
      (prev) => prev?.filter((s) => s.id !== segmentId),
      false
    );

    const res = await deleteSpeechSegment({ id: segmentId });
    if (!res.success) {
      toast.error(res.error || 'Failed to delete segment');
      mutate(); // Revert on error
    } else {
      toast.success('Segment deleted');
      mutate(); // Revalidate
    }
  };

  // Handler for creating a new segment
  const handleSegmentCreate = async () => {
    if (!scriptId) return;

    const newOrder = segments.length;
    const lastSegment = segments.length > 0 ? segments[segments.length - 1] : undefined;
    const lastTimestamp = lastSegment?.timestamp ?? 0;
    const newTimestamp = lastTimestamp + 5;

    const newId = crypto.randomUUID();
    const newSegment = {
      id: newId,
      script_id: scriptId,
      order: newOrder,
      timestamp: newTimestamp,
      content: [{ type: 'paragraph', children: [{ text: '' }] }],
      expressions: [],
      config: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      _isSyncing: true, // UI state
    } as any;

    // Immediate Optimistic Update
    mutate((prev) => [...(prev || []), newSegment], false);

    const res = await createSpeechSegment({ id: newId, script_id: scriptId, order: newOrder, timestamp: newTimestamp });
    if (!res.success) {
      toast.error(res.error || 'Failed to create segment');
      mutate((prev) => prev?.filter((s) => s.id !== newId), false); // Revert
    } else {
      mutate((prev) => prev?.map((s) => s.id === newId ? { ...s, _isSyncing: false } : s), false);
    }
  };

  return (
    <>
      <ScriptWorkspaceHeader />

      <div className="mx-auto w-full max-w-3xl px-4 md:px-6 py-6 md:py-10 pb-32">
        <section className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold wrap-break-word">
            {script ? script.name : 'Loading...'}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isLoading ? 'Loading segments...' : `${segments.length} segment${segments.length !== 1 ? 's' : ''}`}
          </p>
        </section>

        <SpeechDialogList
          segments={segments}
          onSegmentChange={handleSegmentChange}
          onSegmentDelete={handleSegmentDelete}
          onSegmentCreate={handleSegmentCreate}
        />
      </div>
    </>
  );
}
