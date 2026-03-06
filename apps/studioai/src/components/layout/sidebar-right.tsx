'use client';

import * as React from 'react';

import { VoiceProfileSave } from '@/features/voice-profile/components/voice-profile-save';
import { VoiceProfilePanel } from '@/features/voice-profile/components/voice-profile-setup';
import { RiAddLine, RiRobot2Line, RiSettings3Line } from '@remixicon/react';

import { Button } from '@repo/ui-core/components/button';
import { ScrollArea } from '@repo/ui-core/components/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@repo/ui-core/components/sidebar';
import { Sheet, SheetContent } from '@repo/ui-core/components/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui-core/components/tabs';

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
  onClose?: () => void;
}

function SidebarRightContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col h-full w-full overflow-hidden">
      <Tabs defaultValue="advanced" className="flex min-h-0 w-full flex-1 flex-col h-full">
        {/* Header with Tabs */}
        <div className="p-4 pb-0 shrink-0">
          <div className="relative flex w-full items-center justify-between gap-2 mb-4">
            <TabsList className="h-10 flex-1">
              <TabsTrigger value="assistant" className="h-8 flex-1">
                <RiRobot2Line className="mr-1 size-4" />
                <span>Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="h-8 flex-1">
                <RiSettings3Line className="mr-1 size-4" />
                <span>Advanced</span>
              </TabsTrigger>
            </TabsList>
            {onClose && (
              <Button size="icon-sm" variant="ghost" onClick={onClose} className="shrink-0">
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <TabsContent value="assistant" className="h-full m-0 data-[state=active]:flex data-[state=inactive]:hidden">
            <ScrollArea className="h-full w-full px-4">
              <div className="pb-4">
                {/* AI Assistant Chat Interface */}
                <p className="text-sm text-muted-foreground">Assistant chat will go here...</p>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="advanced" className="h-full m-0 data-[state=active]:flex data-[state=inactive]:hidden">
            <ScrollArea className="h-full w-full px-4">
              <div className="pb-4">
                <VoiceProfilePanel />
              </div>
            </ScrollArea>
          </TabsContent>
        </div>

        {/* Footer with Save Button */}
        <div className="border-t p-4 shrink-0">
          <VoiceProfileSave>
            <Button size="lg" variant="secondary" className="w-full">
              <RiAddLine className="size-5" />
              <span className="ml-2">Save Profile</span>
            </Button>
          </VoiceProfileSave>
        </div>
      </Tabs>
    </div>
  );
}

export function SidebarRight({ onClose, ...props }: SidebarRightProps) {
  // If onClose is provided, render as mobile sheet
  if (onClose) {
    return (
      <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full max-w-md p-0 overflow-hidden">
          <SidebarRightContent onClose={onClose} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: render directly without Sidebar wrapper (since it's in a ResizablePanel)
  return <SidebarRightContent />;
}
