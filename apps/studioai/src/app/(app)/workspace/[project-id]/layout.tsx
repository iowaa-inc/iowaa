'use client';

import * as React from 'react';

import { RiPlayFill } from '@remixicon/react';

import { SidebarLeft } from '@/components/layout/sidebar-left';
import { SidebarRight } from '@/components/layout/sidebar-right';
import { Button } from '@repo/ui-core/components/button';
import {
  ScrubBarContainer,
  ScrubBarProgress,
  ScrubBarThumb,
  ScrubBarTimeLabel,
  ScrubBarTrack,
} from '@repo/ui-core/components/scrub-bar';
import { SidebarInset, SidebarProvider } from '@repo/ui-core/components/sidebar';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [scrubValue, setScrubValue] = React.useState(30);
  const scrubDuration = 100;

  return (
    <SidebarProvider style={{ '--sidebar-width': '20rem' } as React.CSSProperties}>
      <SidebarLeft />
      <SidebarProvider style={{ '--sidebar-width': '20rem' } as React.CSSProperties}>
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 px-4">{children}</div>
          <div className="bg-sidebar border-sidebar-border fixed bottom-0 left-0 w-full border-t">
            <div className="mx-auto flex max-w-3xl items-center justify-between py-3">
              <div className="flex w-full items-center gap-4">
                <Button size="icon-lg" variant="default" className="rounded-full" aria-label="Play">
                  <RiPlayFill />
                </Button>
                <div className="flex-1">
                  <ScrubBarContainer
                    duration={scrubDuration}
                    value={scrubValue}
                    onScrub={setScrubValue}
                  >
                    <ScrubBarTimeLabel time={scrubValue} className="font-mono text-sm" />
                    <ScrubBarTrack className="mx-2 h-1">
                      <ScrubBarProgress className="h-1" />
                      <ScrubBarThumb className="size-3" />
                    </ScrubBarTrack>
                    <ScrubBarTimeLabel time={scrubDuration} className="font-mono text-sm" />
                  </ScrubBarContainer>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </SidebarProvider>
  );
}
