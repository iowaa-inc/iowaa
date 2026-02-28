import { useSelected, useFocused } from "slate-react";
import { RiDragMoveLine } from "@remixicon/react";
import { cn } from "@repo/ui-core/lib/utils";
import { EnrichmentPillProps } from "./libs/editor-types";

const ENRICHMENT_COLORS: Record<string, {
    bg: string,
    border: string,
    text: string,
    icon: React.ReactNode,
}> = {
    "Pause": {
        bg: "bg-yellow-800",
        border: "ring-yellow-600 ring-2",
        text: "text-yellow-800",
        icon: <span>
            <RiDragMoveLine size={14} />
        </span>,
    },
    "Laughter": {
        bg: "bg-green-800",
        border: "ring-green-600 ring-2",
        text: "text-green-50",
        icon: <span>
            <RiDragMoveLine size={14} />
        </span>
    },
    "Cough": {
        bg: "bg-purple-800",
        border: "ring-purple-600 ring-2",
        text: "text-purple-800",
        icon: <span>
            <RiDragMoveLine size={14} />
        </span>,
    },
    "Breath": {
        bg: "bg-blue-800",
        border: "ring-blue-600 ring-2",
        text: "text-blue-800",
        icon: <span>
            <RiDragMoveLine size={14} />
        </span>,
    },
    "Enrichment": {
        bg: "bg-gray-800",
        border: "ring-gray-600 ring-2",
        text: "text-gray-700",
        icon: <span>
            <RiDragMoveLine size={14} />
        </span>,
    },
};

export const EnrichmentPill = ({
    attributes,
    children,
    element,
    onClick,
    onDragStart,
}: EnrichmentPillProps) => {
    const selected = useSelected();
    const focused = useFocused();
    const label = element.enrichment?.label || "Enrichment";
    const color = ENRICHMENT_COLORS[label] ?? ENRICHMENT_COLORS["Enrichment"];

    return (
        <span
            {...attributes}
            contentEditable={false}
            draggable={true}
            onClick={onClick}
            onDragStart={onDragStart}
            className={cn(
                "relative inline-flex items-center rounded font-mono tracking-widest space-x-0.5 px-2 pl-1 py-1 mx-1 text-xs uppercase align-middle select-none transition-colors text-white",
                color.bg,
                selected && focused
                    ? color.border
                    : "",
            )}
            style={{ userSelect: "none", verticalAlign: "middle" }}
        >
            {/* Icon representing enrichment type */}
            {color.icon}
            {label}
            {/* Hidden children required by Slate for void nodes */}
            <span style={{ display: "none" }}>{children}</span>
        </span>
    );
};
