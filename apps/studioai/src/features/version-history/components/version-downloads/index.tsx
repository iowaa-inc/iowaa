import { useState } from "react"
import { Button } from "@repo/ui-core/components/button"
import { ScrollArea, ScrollBar } from "@repo/ui-core/components/scroll-area"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@repo/ui-core/components/dropdown-menu"
import { RiMore2Line, RiPlayFill, RiPauseLine } from "@remixicon/react"
import { cn } from "@repo/ui-core/lib/utils"
import { LoadNoticeDialog } from "./load-notice-dialog"

// Sample version data
const versionDownloads = [
  {
    id: 1,
    version: 1,
    date: "2024-05-08T09:21:00Z"
  },
  {
    id: 2,
    version: 2,
    date: "2024-05-09T15:10:00Z"
  },
  {
    id: 3,
    version: 3,
    date: "2024-05-10T13:45:00Z"
  },
  {
    id: 4,
    version: 4,
    date: "2024-05-12T17:00:00Z"
  },
  {
    id: 5,
    version: 5,
    date: "2024-05-13T11:34:00Z"
  },
  {
    id: 6,
    version: 6,
    date: "2024-05-14T09:12:00Z"
  },
];

// Util function for pretty timestamps
function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function VersionPlayButton({
  playing,
  onClick,
}: {
  playing: boolean
  onClick: () => void
}) {
  return (
    <Button
      onClick={onClick}
      aria-label={playing ? "Pause" : "Play"}
      size="icon-sm"
      className={cn("rounded-full size-7 flex items-center justify-center p-0")}
      variant="secondary"
    >
      {playing ? <RiPauseLine className="size-4" /> : <RiPlayFill className="size-4" />}
    </Button>
  )
}

function VersionActionsDropdown({ onRequestLoad }: { onLoadClick: () => void, onRequestLoad: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="rounded-full p-0">
          <RiMore2Line className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={2} className="min-w-28">
        <DropdownMenuItem onSelect={e => {
          e.preventDefault(); // prevents menu from closing automatically
          onRequestLoad();
        }}>
          Load
        </DropdownMenuItem>
        <DropdownMenuItem>Download</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function VersionDownloads() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [dialogOpenForId, setDialogOpenForId] = useState<number | null>(null)

  // Render versions from last to first
  const reversedVersions = [...versionDownloads].reverse();

  function handleLoad(versionId: number) {
    // Placeholder: add logic to load version
    console.log(`Load version with ID: ${versionId}`);
    // Close dialog after confirm
    setDialogOpenForId(null);
  }

  function handleRequestLoad(versionId: number) {
    setDialogOpenForId(versionId);
  }

  return (
    <>
      <ScrollArea className="h-56 w-full pr-1">
        <div className="flex flex-col gap-1 px-0.5 py-1.5">
          {reversedVersions.map((version) => (
            <div
              key={version.id}
              className="flex items-center gap-2 rounded-md hover:bg-accent px-2 py-1 transition-colors min-h-9"
            >
              <VersionPlayButton
                playing={playingId === version.id}
                onClick={() => setPlayingId(prev => prev === version.id ? null : version.id)}
              />
              <div className="flex flex-col min-w-0 flex-1 leading-tight">
                <span className="font-medium text-sm truncate">Ver. #{version.version}</span>
                <span className="text-[11px] text-muted-foreground font-mono">{formatDate(version.date)}</span>
              </div>
              <VersionActionsDropdown
                onLoadClick={() => handleLoad(version.id)}
                onRequestLoad={() => handleRequestLoad(version.id)}
              />
              <LoadNoticeDialog
                open={dialogOpenForId === version.id}
                onOpenChange={(open) => {
                  if (!open) setDialogOpenForId(null);
                }}
                onConfirm={() => handleLoad(version.id)}
              />
            </div>
          ))}
        </div>
        <ScrollBar />
      </ScrollArea>
    </>
  )
}