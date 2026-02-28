'use client';

import { useState } from 'react';

import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import { RiCheckboxCircleLine, RiLogoutBoxLine } from '@remixicon/react';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui-core/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui-core/components/dropdown-menu';
import { SidebarMenu, SidebarMenuItem, useSidebar } from '@repo/ui-core/components/sidebar';
import { Skeleton } from '@repo/ui-core/components/skeleton';

import { getInitials } from '@/lib/utils';

import { SettingsModal } from './settings/settings-root';

export function UserMenu() {
  const { isMobile } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { data: profile, isLoading } = useUserProfile();
  const avatarFallback = getInitials(profile?.display_name);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          {isLoading || !profile ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer" size="lg">
                  <AvatarImage
                    src={profile.avatar_url ?? undefined}
                    alt={profile.display_name ?? ''}
                  />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar>
                      <AvatarImage
                        src={profile.avatar_url ?? undefined}
                        alt={profile.display_name ?? ''}
                      />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{profile?.display_name ?? ''}</span>
                      <span className="truncate text-xs">{profile?.email ?? ''}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                    <RiCheckboxCircleLine />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RiLogoutBoxLine />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
      <SettingsModal isOpen={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
