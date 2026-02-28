"use client"

import React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui-core/components/sidebar"
import {
  RiCalendarLine,
  RiSettingsLine,
  RiBox3Line,
  RiDeleteBinLine,
  RiQuestionLine,
} from "@remixicon/react"

const navItems = [
  {
    title: "Calendar",
    url: "#",
    icon: <RiCalendarLine />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <RiSettingsLine />,
  },
  {
    title: "Templates",
    url: "#",
    icon: <RiBox3Line />,
  },
  {
    title: "Trash",
    url: "#",
    icon: <RiDeleteBinLine />,
  },
  {
    title: "Help",
    url: "#",
    icon: <RiQuestionLine />,
  },
]

export function NavSecondary(props: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
