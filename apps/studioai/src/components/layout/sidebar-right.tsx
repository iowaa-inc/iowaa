'use client';

import * as React from 'react';

import { VoiceProfileSave } from '@/features/voice-profile/components/voice-profile-save';
import { VoiceProfilePanel } from '@/features/voice-profile/components/voice-profile-setup';
import { RiAddLine, RiRobot2Line, RiSettings3Line } from '@remixicon/react';

import { Button } from '@repo/ui-core/components/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui-core/components/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui-core/components/tabs';

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" className="relative flex h-full flex-col border-l" {...props}>
      <div className="flex min-h-0 flex-1 flex-col">
        <Tabs defaultValue="advanced" className="flex min-h-0 w-full flex-1 flex-col p-4">
          <SidebarHeader className="p-0">
            <div className="relative flex w-full items-center justify-between">
              <TabsList className="h-10! w-full">
                <TabsTrigger value="assistant" className="h-8">
                  <RiRobot2Line className="mr-1" />
                  Assistant
                </TabsTrigger>
                <TabsTrigger value="advanced" className="h-8">
                  <RiSettings3Line className="mr-1" />
                  Advanced
                </TabsTrigger>
              </TabsList>
              {/* <div className="-left-[48px] relative z-100">
                <SidebarTrigger />
              </div> */}
            </div>
          </SidebarHeader>
          <div className="flex min-h-0 flex-1 flex-col">
            <TabsContent value="assistant" className="flex-1">
              <SidebarContent className="h-full">{/* ... */}</SidebarContent>
            </TabsContent>
            <TabsContent value="advanced" className="flex-1">
              <SidebarContent className="h-full">
                <VoiceProfilePanel />
              </SidebarContent>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <SidebarFooter className="bg-sidebar sticky bottom-0 z-10 h-15 border-t border-l">
        <div className="my-auto flex w-full justify-between gap-2">
          <VoiceProfileSave>
            <Button size={'lg'} variant="secondary" className="flex-1">
              <RiAddLine />
              <span className="ml-2">Save Profile</span>
            </Button>
          </VoiceProfileSave>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
