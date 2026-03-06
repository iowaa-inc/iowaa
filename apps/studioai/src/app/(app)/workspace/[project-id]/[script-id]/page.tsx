'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useScript } from '@/features/script/hooks/use-script';

import { ScriptWorkspaceHeader } from '@/components/layout/script-workspace-header';
import {
  SpeechDialogList,
  SpeechSegment,
  MockDataUtils,
} from '@/features/speech/speech-dialog';

export default function WorkspacePage() {
  const params = useParams();
  const scriptId = params?.['script-id'] as string;
  const { script } = useScript(scriptId || null);

  // Initialize with mock conversation data
  const [segments, setSegments] = useState<SpeechSegment[]>(() =>
    MockDataUtils.createMockConversation(scriptId || 'mock-script')
  );

  // Handler for when a segment is updated
  const handleSegmentChange = (segmentId: string, updates: Partial<SpeechSegment>) => {
    setSegments((prev) =>
      prev.map((segment) =>
        segment.id === segmentId
          ? { ...segment, ...updates, updated_at: new Date().toISOString() }
          : segment
      )
    );
    console.log('Segment updated:', segmentId, updates);
  };

  // Handler for when a segment is deleted
  const handleSegmentDelete = (segmentId: string) => {
    setSegments((prev) => {
      const filtered = prev.filter((s) => s.id !== segmentId);
      // Reorder remaining segments
      return filtered.map((s, index) => ({ ...s, order: index }));
    });
    console.log('Segment deleted:', segmentId);
  };

  // Handler for creating a new segment
  const handleSegmentCreate = () => {
    const newOrder = segments.length;
    const lastTimestamp = segments.length > 0 ? segments[segments.length - 1].timestamp : 0;
    const newTimestamp = lastTimestamp + 5; // Add 5 seconds after the last segment

    const newSegment = MockDataUtils.createEmptySegment(
      scriptId || 'mock-script',
      newOrder,
      newTimestamp
    );

    setSegments((prev) => [...prev, newSegment]);
    console.log('Segment created:', newSegment.id);
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
            {segments.length} segment{segments.length !== 1 ? 's' : ''}
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
