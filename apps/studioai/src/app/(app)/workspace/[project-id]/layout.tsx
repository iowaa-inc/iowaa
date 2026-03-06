'use client';

import * as React from 'react';

import { RiPlayFill, RiSettings3Line, RiSideBarLine } from '@remixicon/react';

import { SidebarLeft } from '@/components/layout/sidebar-left';
import { SidebarRight } from '@/components/layout/sidebar-right';
import { Button } from '@repo/ui-core/components/button';
import { ScrollArea } from '@repo/ui-core/components/scroll-area';
import {
  ScrubBarContainer,
  ScrubBarProgress,
  ScrubBarThumb,
  ScrubBarTimeLabel,
  ScrubBarTrack,
} from '@repo/ui-core/components/scrub-bar';
import { SidebarInset, SidebarProvider, useSidebar } from '@repo/ui-core/components/sidebar';

function WorkspaceContent({ children }: { children: React.ReactNode }) {
  const [scrubValue, setScrubValue] = React.useState(30);
  const scrubDuration = 100;
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState(true); // Open by default
  const [rightSidebarOpenMobile, setRightSidebarOpenMobile] = React.useState(false);
  const { open: leftSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <SidebarLeft />

      {/* Floating Left Sidebar Trigger (visible when sidebar is collapsed on desktop) */}
      {!leftSidebarOpen && (
        <Button
          size="icon-sm"
          variant="secondary"
          className="fixed top-4 left-4 z-50 hidden md:flex rounded-md shadow-lg"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <RiSideBarLine className="size-4" />
        </Button>
      )}

      {/* Main Content Area */}
      <SidebarInset className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full w-full">
            {children}
          </ScrollArea>
        </div>

        {/* Playback Panel - Fixed at bottom */}
        <div className="bg-sidebar border-sidebar-border w-full border-t h-auto shrink-0">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-3 py-2 md:py-3 gap-2 md:gap-4">
            <div className="flex w-full items-center gap-2 md:gap-4 min-w-0">
              <Button size="icon-lg" variant="default" className="rounded-full shrink-0" aria-label="Play">
                <RiPlayFill />
              </Button>
              <div className="flex-1 min-w-0">
                <ScrubBarContainer
                  duration={scrubDuration}
                  value={scrubValue}
                  onScrub={setScrubValue}
                >
                  <ScrubBarTimeLabel time={scrubValue} className="font-mono text-xs md:text-sm" />
                  <ScrubBarTrack className="mx-1 md:mx-2 h-1">
                    <ScrubBarProgress className="h-1" />
                    <ScrubBarThumb className="size-3" />
                  </ScrubBarTrack>
                  <ScrubBarTimeLabel time={scrubDuration} className="font-mono text-xs md:text-sm" />
                </ScrubBarContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Floating Right Sidebar Trigger */}
        <Button
          size="icon-sm"
          variant="secondary"
          className="fixed bottom-24 right-4 z-50 md:hidden rounded-full shadow-lg"
          onClick={() => setRightSidebarOpenMobile(true)}
          aria-label="Open settings"
        >
          <RiSettings3Line className="size-4" />
        </Button>

        {/* Mobile: Right Sidebar Sheet */}
        {rightSidebarOpenMobile && (
          <div className="md:hidden">
            <SidebarRight onClose={() => setRightSidebarOpenMobile(false)} />
          </div>
        )}
      </SidebarInset>

      {/* Desktop: Fixed Width Right Sidebar (sibling to SidebarInset) */}
      <div
        className={`hidden md:flex flex-col h-full bg-sidebar border-l transition-all duration-300 ease-in-out relative ${
          rightSidebarOpen ? 'w-[420px]' : 'w-0'
        }`}
      >
        {/* Always visible trigger button */}
        <Button
          size="icon-sm"
          variant="secondary"
          className="absolute -left-9 top-4 z-50 rounded-md shadow-md"
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          aria-label={rightSidebarOpen ? 'Close settings' : 'Open settings'}
        >
          <RiSettings3Line className="size-4" />
        </Button>

        {rightSidebarOpen && (
          <div className="flex-1 overflow-hidden w-full">
            <SidebarRight />
          </div>
        )}
      </div>
    </>
  );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={{ '--sidebar-width': '20rem' } as React.CSSProperties}
      className="h-screen overflow-hidden"
    >
      <WorkspaceContent>{children}</WorkspaceContent>
    </SidebarProvider>
  );
}
