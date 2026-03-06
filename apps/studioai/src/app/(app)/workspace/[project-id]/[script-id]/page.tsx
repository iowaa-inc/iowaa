'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useScript } from '@/features/script/hooks/use-script';

import { ScriptWorkspaceHeader } from '@/components/layout/script-workspace-header';
import { SpeechExpressionSelector } from '@/features/speech/speech-expression-selector';
import { SpeechProvider } from '@/features/speech/speech-expression-selector/context';
import { SelectedExpression } from '@/features/speech/speech-expression-selector/types';
import { SpeechSegment } from '@/features/speech/speech-segment';
import { Descendant } from 'slate';

const initialSampleTextRaw = `Well, I wasn't sure if you wanted coffee or tea, so I brought both, just in case. 

Oh, thank you! That's so thoughtful of you. Honestly, either is fine—it's been a long morning already!

I get it. Want to sit by the window? The light's really nice right now.`;

// Default properties for all options from the referenced data/emotions.ts and data/prosody.ts

const MOCK_SELECTED_EXPRESSIONS: SelectedExpression[] = [
  // Speed: Normal
  {
    id: 'speed-normal-1',
    moduleId: 'speed',
    prefix: 'Speak',
    value: 'rate_1.0',
  },
  // Emotion: Neutral
  {
    id: 'emotion-neutral-1',
    moduleId: 'emotion',
    prefix: 'Convey',
    value: 'neutral',
  },
  // Pitch: Normal
  {
    id: 'pitch-normal-1',
    moduleId: 'pitch',
    prefix: 'With',
    value: 'pitch_default',
  },
  // Intonation: Statement (Falling)
  {
    id: 'intonation-falling-1',
    moduleId: 'intonation',
    prefix: 'Speak',
    value: 'contour_falling',
  },
  // Timbre: Breathy
  {
    id: 'timbre-breathy-1',
    moduleId: 'timbre',
    prefix: 'With',
    value: 'timbre_breathy',
  },
  // Volume: Normal
  {
    id: 'volume-normal-1',
    moduleId: 'volume',
    prefix: 'Speak',
    value: 'vol_default',
  },
];

const initialSampleDescendant: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: initialSampleTextRaw }],
  },
];

export default function WorkspacePage() {
  const params = useParams();
  const scriptId = params?.['script-id'] as string;
  const { script } = useScript(scriptId || null);

  const [segment, setSegment] = useState<Descendant[]>(initialSampleDescendant);

  return (
    <>
      <ScriptWorkspaceHeader />

      <div className="mx-auto w-full max-w-3xl px-4 md:px-6 py-6 md:py-10 pb-32">
        <section className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold wrap-break-word">
            {script ? script.name : 'Loading...'}
          </h1>
        </section>

        <div className="space-y-12">
          <SpeechSegment.Root>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <SpeechSegment.Timestamp seconds={88} />
                <SpeechProvider initialItems={MOCK_SELECTED_EXPRESSIONS}>
                  <SpeechExpressionSelector
                    onChange={(expression) => {
                      // Add to the speech segment dataset and update the database / persistent storage
                      console.log(expression);
                    }}
                  />
                </SpeechProvider>
              </div>
              <div className="shrink-0">
                <SpeechSegment.PlayButton
                  onClick={() => {
                    /* play functionality */
                  }}
                />
              </div>
            </div>

            <div className="flex items-start w-full">
              <SpeechSegment.Indent />
              <div className="min-w-0 flex-1">
                <SpeechSegment.Text segment={segment} onChange={setSegment} readOnly={false} />
              </div>
            </div>
          </SpeechSegment.Root>
        </div>
      </div>
    </>
  );
}
