'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IowaaLogo from '@/assets/brand/iowaa-logo.svg';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { getNavItemsForPath } from '../../_constants/nav';

export function SidebarNav() {
  const pathname = usePathname();
  const navItems = getNavItemsForPath(pathname);

  return (
    <Sidebar variant="floating" className="p-2 pr-0">
      <SidebarContent>
        <SidebarHeader className="flex items-start justify-center gap-4 border-b px-6 py-5.5">
          <IowaaLogo className="text-foreground" style={{ height: 20, width: 'auto' }} />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(item.href)}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
