import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@repo/ui-core/components/dropdown-menu"
import { ReactNode } from "react"
import { VersionDownloads } from "@/features/version-history/components/version-downloads"
import {
    RiHistoryLine,
    RiDeleteBinLine,
} from "@remixicon/react"

type MenuItem = {
    label?: string
    icon?: ReactNode
    onClick?: () => void
    items?: MenuItem[]
    component?: ReactNode
    divider?: boolean
    variant?: "destructive" | undefined
}

const menuData: MenuItem[] = [
    {
        label: "Version",
        icon: <RiHistoryLine className="size-4 mr-2" />,
        items: [
            {
                component: (
                    <div className="p-2">
                        <VersionDownloads />
                    </div>
                ),
            },
        ]
    },
    {
        label: "Delete",
        icon: <RiDeleteBinLine className="size-4 mr-2" />,
        variant: "destructive",
    },
]

function RenderMenuItems({ items }: { items: MenuItem[] }) {
    return (
        <>
            {items.map((item, idx) => {
                if (item.items && item.items.length > 0) {
                    // Submenu with potential custom content or recursive children
                    return (
                        <DropdownMenuSub key={(item.label ?? "submenu") + idx}>
                            <DropdownMenuSubTrigger>
                                {item.icon}
                                {item.label}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="min-w-[350px] max-w-[420px] p-0">
                                    <RenderMenuItems items={item.items} />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    )
                }
                if (item.divider) {
                    return <DropdownMenuSeparator key={`sep-${idx}`} />
                }
                if (item.component) {
                    // Slot for custom element (e.g., VersionDownloads)
                    return <div key={item.label ? item.label + idx : `custom-${idx}`}>{item.component}</div>
                }
                // Regular Menu Item
                return (
                    <DropdownMenuItem
                        key={(item.label ?? "item") + idx}
                        onClick={item.onClick}
                        variant={item.variant}
                    >
                        {item.icon}
                        {item.label}
                    </DropdownMenuItem>
                )
            })}
        </>
    )
}

export function ScriptActionDropdownMenu({ children }: { children: ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px] max-w-[480px]">
                <DropdownMenuGroup>
                    <RenderMenuItems items={menuData} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
