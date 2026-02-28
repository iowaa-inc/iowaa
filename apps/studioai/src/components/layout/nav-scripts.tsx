"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui-core/components/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui-core/components/sidebar"
import { RiMoreLine, RiStarOffLine, RiLinksLine, RiArrowRightUpLine, RiDeleteBinLine, RiSearchLine } from "@remixicon/react"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@repo/ui-core/components/input-group"

const scripts = [
  {
    title: "The Cafe Encounter",
    url: "#",
  },
  {
    title: "Detective's Interrogation",
    url: "#",
  },
  {
    title: "A Door Between Worlds",
    url: "#",
  },
  {
    title: "Lost in Translation",
    url: "#",
  },
  {
    title: "Reunion at the Old Station",
    url: "#",
  },
  {
    title: "Final Rehearsal",
    url: "#",
  },
  {
    title: "The Unexpected Guest",
    url: "#",
  },
  {
    title: "Three Friends and a Secret",
    url: "#",
  },
  {
    title: "Starship Departure",
    url: "#",
  },
  {
    title: "Last Train Home",
    url: "#",
  },
]

export function NavScripts() {
  const { isMobile } = useSidebar()

  return (
    <>
      <SidebarGroup>
        <InputGroup className="bg-input">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <RiSearchLine />
          </InputGroupAddon>
          {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
        </InputGroup>
      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Scripts</SidebarGroupLabel>
        <SidebarMenu>
          {scripts.map((script) => (
            <SidebarMenuItem key={script.title}>
              <SidebarMenuButton asChild>
                <a href={script.url} title={script.title}>
                  <span>{script.title}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  >
                    <RiMoreLine />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <RiStarOffLine className="text-muted-foreground" />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <RiLinksLine className="text-muted-foreground" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiArrowRightUpLine className="text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <RiDeleteBinLine />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <RiMoreLine />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
