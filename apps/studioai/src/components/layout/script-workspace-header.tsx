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
    <header className="bg-background sticky top-0 flex min-h-14 shrink-0 items-center justify-between gap-2 border-b px-3 md:px-4 py-2 md:py-0 w-full z-10 max-w-full">
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
        <ScriptActionDropdownMenu>
          <Button size="icon-sm" variant="secondary" className="shrink-0">
            <RiMore2Line className="size-4" />
          </Button>
        </ScriptActionDropdownMenu>

        <Separator orientation="vertical" className="my-auto h-4 shrink-0" />

        <div className="min-w-0 max-w-[180px] shrink-0">
          <VoiceProfileSelector />
        </div>

        {/* Duration only shows when there's enough space */}
        <Separator orientation="vertical" className="my-auto h-4 shrink-0 hidden xl:block" />

        <p className="text-muted-foreground text-xs md:text-sm hidden xl:block whitespace-nowrap">
          Duration: <span className="text-foreground font-mono font-medium">{duration}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        {/* Download button - icon only on small screens */}
        <Button
          size="icon-sm"
          variant="secondary"
          aria-label="Download"
          onClick={onDownload}
          className="lg:hidden shrink-0"
        >
          <span className="sr-only">Download</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.02 19.412 19.412C19.02 19.804 18.55 20 18 20H6Z"></path>
          </svg>
        </Button>

        {/* Download button with text on larger screens */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onDownload}
          className="hidden lg:flex shrink-0"
        >
          Download
        </Button>

        {/* Play button - always visible */}
        <Button size="sm" variant="default" onClick={onPlay} className="shrink-0">
          <RiPlayFill className="size-4" />
          <span className="hidden lg:inline ml-1">Play script</span>
        </Button>
      </div>
    </header>
  );
}
