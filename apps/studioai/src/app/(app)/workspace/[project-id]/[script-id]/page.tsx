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

      <div className="mx-auto max-w-xl space-y-16 py-10">
        <section className="mb-8">
          <h1 className="text-start text-3xl font-semibold">
            {script ? script.name : 'Loading...'}
          </h1>
        </section>
        <div className="">
          <SpeechSegment.Root>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
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
              <SpeechSegment.PlayButton
                onClick={() => {
                  /* play functionality */
                }}
              />
            </div>
            <div className="flex">
              <SpeechSegment.Indent />
              <SpeechSegment.Text segment={segment} onChange={setSegment} readOnly={false} />
            </div>
          </SpeechSegment.Root>
        </div>
      </div>
    </>
  );
}
