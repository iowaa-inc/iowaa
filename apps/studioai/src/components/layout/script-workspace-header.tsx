'use client';

import { VoiceProfileSelector } from '@/features/voice-profile/components/voice-profile-selector';
import { RiMore2Line, RiPlayFill } from '@remixicon/react';

import { ScriptActionDropdownMenu } from '@/components/layout/script-action-context';
import { Button } from '@repo/ui-core/components/button';
import { Separator } from '@repo/ui-core/components/separator';

interface ScriptWorkspaceHeaderProps {
  duration?: string;
  onDownload?: () => void;
  onPlay?: () => void;
}

export function ScriptWorkspaceHeader({
  duration = '03:22',
  onDownload,
  onPlay,
}: ScriptWorkspaceHeaderProps) {
  return (
    <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b border-none px-8">
      <div className="flex flex-1 items-center gap-2 px-3">
        <Separator orientation="vertical" className="my-auto data-[orientation=vertical]:h-4" />

        <ScriptActionDropdownMenu>
          <Button size="icon-sm" variant="secondary">
            <RiMore2Line />
          </Button>
        </ScriptActionDropdownMenu>

        <Separator orientation="vertical" className="my-auto data-[orientation=vertical]:h-4" />

        <div className="w-full max-w-[200px]">
          <VoiceProfileSelector />
        </div>

        <Separator orientation="vertical" className="my-auto data-[orientation=vertical]:h-4" />

        <p className="text-muted-foreground ml-2 line-clamp-1 text-sm">
          Duration: <span className="text-foreground font-mono font-medium">{duration}</span>
        </p>
      </div>

      <Button size="lg" variant="secondary" aria-label="Download" onClick={onDownload}>
        Download
      </Button>
      <Button variant="default" aria-label="Play" onClick={onPlay}>
        <RiPlayFill />
        Play script
      </Button>
    </header>
  );
}
