import * as React from 'react';

import { ProjectSelector } from '@/features/project/components/project-selector';

import { NavMain } from '@/components/layout/nav-main';
import { NavScripts } from '@/components/layout/nav-scripts';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@repo/ui-core/components/sidebar';

import { UserMenu } from './user-menu';

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="left" className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="relative flex w-full items-center gap-2">
          <div className="w-fit">
            <UserMenu />
          </div>
          <div className="w-full">
            <ProjectSelector />
          </div>
          <div className="relative">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavScripts />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
