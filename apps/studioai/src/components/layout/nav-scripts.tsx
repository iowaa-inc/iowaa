"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useDebounceValue } from "usehooks-ts"
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
import { Skeleton } from "@repo/ui-core/components/skeleton"

import { useActiveProject } from "@/features/project/hooks/use-active-project"
import { useScripts } from "@/features/script/hooks/use-scripts"

export function NavScripts() {
  const { isMobile } = useSidebar()
  const { activeProjectId } = useActiveProject()
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounceValue(search, 300)
  const pathname = usePathname()

  const { scripts, isLoading } = useScripts(activeProjectId, debouncedSearch, limit)

  return (
    <>
      <SidebarGroup>
        <InputGroup className="bg-input">
          <InputGroupInput 
            placeholder="Search scripts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <RiSearchLine />
          </InputGroupAddon>
        </InputGroup>
      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Scripts</SidebarGroupLabel>
        <SidebarMenu>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild>
                  <div className="flex items-center space-x-2 px-2 py-1.5 w-full">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : scripts.length === 0 ? (
            <SidebarMenuItem>
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No scripts found
              </div>
            </SidebarMenuItem>
          ) : (
            scripts.map((script) => (
              <SidebarMenuItem key={script.id}>
                <SidebarMenuButton asChild isActive={pathname.includes(script.id)}>
                  <Link href={`/workspace/${activeProjectId}/${script.id}`} title={script.name}>
                    <span>{script.name}</span>
                  </Link>
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
            ))
          )}
          {!isLoading && scripts.length >= limit && (
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="text-sidebar-foreground/70 cursor-pointer" 
                onClick={() => setLimit(l => l + 10)}
              >
                <RiMoreLine />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
