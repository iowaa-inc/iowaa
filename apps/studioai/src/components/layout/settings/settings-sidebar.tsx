'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui-core/components/sidebar';

import { SETTINGS_GROUPS, SettingsTabId } from './settings-config';

interface SettingsSidebarProps {
  activeTabId: SettingsTabId;
  onSelect: (id: SettingsTabId) => void;
}

export function SettingsSidebar({ activeTabId, onSelect }: SettingsSidebarProps) {
  return (
    <>
      {/* --- Mobile Nav (Horizontal) --- */}
      <Sidebar collapsible="none" className="flex w-full border-b sm:hidden">
        <SidebarContent>
          {SETTINGS_GROUPS.map((group) => (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-row gap-1 overflow-x-auto px-2 py-2">
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeTabId === item.id}
                        onClick={() => onSelect(item.id)}
                        className="flex h-auto flex-col px-3 py-2"
                      >
                        <item.icon className="mb-1 h-5 w-5" />
                        <span className="max-w-[9ch] truncate text-xs">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      {/* --- Desktop Nav (Vertical) --- */}
      <Sidebar collapsible="none" className="hidden h-full sm:flex">
        <SidebarContent>
          {SETTINGS_GROUPS.map((group) => (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeTabId === item.id}
                        onClick={() => onSelect(item.id)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
