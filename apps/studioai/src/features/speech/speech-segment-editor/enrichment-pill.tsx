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
    // Pause utterances
    "Pause": {
        bg: "bg-yellow-800",
        border: "ring-yellow-600 ring-2",
        text: "text-yellow-800",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Long Pause": {
        bg: "bg-yellow-900",
        border: "ring-yellow-700 ring-2",
        text: "text-yellow-900",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },

    // Vocal utterances
    "Laughter": {
        bg: "bg-green-800",
        border: "ring-green-600 ring-2",
        text: "text-green-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Chuckle": {
        bg: "bg-green-700",
        border: "ring-green-500 ring-2",
        text: "text-green-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Giggle": {
        bg: "bg-green-600",
        border: "ring-green-400 ring-2",
        text: "text-green-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Sigh": {
        bg: "bg-indigo-700",
        border: "ring-indigo-500 ring-2",
        text: "text-indigo-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Gasp": {
        bg: "bg-red-700",
        border: "ring-red-500 ring-2",
        text: "text-red-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Groan": {
        bg: "bg-orange-700",
        border: "ring-orange-500 ring-2",
        text: "text-orange-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Hmm": {
        bg: "bg-violet-700",
        border: "ring-violet-500 ring-2",
        text: "text-violet-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Uh-huh": {
        bg: "bg-pink-700",
        border: "ring-pink-500 ring-2",
        text: "text-pink-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Mm-hmm": {
        bg: "bg-fuchsia-700",
        border: "ring-fuchsia-500 ring-2",
        text: "text-fuchsia-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Uh": {
        bg: "bg-slate-700",
        border: "ring-slate-500 ring-2",
        text: "text-slate-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Um": {
        bg: "bg-slate-600",
        border: "ring-slate-400 ring-2",
        text: "text-slate-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Er": {
        bg: "bg-slate-500",
        border: "ring-slate-300 ring-2",
        text: "text-slate-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Ah": {
        bg: "bg-amber-700",
        border: "ring-amber-500 ring-2",
        text: "text-amber-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Oh": {
        bg: "bg-amber-600",
        border: "ring-amber-400 ring-2",
        text: "text-amber-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Whimper": {
        bg: "bg-rose-700",
        border: "ring-rose-500 ring-2",
        text: "text-rose-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Whistle": {
        bg: "bg-cyan-700",
        border: "ring-cyan-500 ring-2",
        text: "text-cyan-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Tsk": {
        bg: "bg-stone-700",
        border: "ring-stone-500 ring-2",
        text: "text-stone-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },
    "Shush": {
        bg: "bg-teal-700",
        border: "ring-teal-500 ring-2",
        text: "text-teal-50",
        icon: <span><RiDragMoveLine size={14} /></span>
    },

    // Respiratory utterances
    "Cough": {
        bg: "bg-purple-800",
        border: "ring-purple-600 ring-2",
        text: "text-purple-800",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Breath": {
        bg: "bg-blue-800",
        border: "ring-blue-600 ring-2",
        text: "text-blue-800",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Inhale": {
        bg: "bg-blue-700",
        border: "ring-blue-500 ring-2",
        text: "text-blue-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Exhale": {
        bg: "bg-blue-600",
        border: "ring-blue-400 ring-2",
        text: "text-blue-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Sniff": {
        bg: "bg-purple-700",
        border: "ring-purple-500 ring-2",
        text: "text-purple-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Sneeze": {
        bg: "bg-purple-600",
        border: "ring-purple-400 ring-2",
        text: "text-purple-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Clear Throat": {
        bg: "bg-purple-500",
        border: "ring-purple-300 ring-2",
        text: "text-purple-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },
    "Yawn": {
        bg: "bg-indigo-800",
        border: "ring-indigo-600 ring-2",
        text: "text-indigo-50",
        icon: <span><RiDragMoveLine size={14} /></span>,
    },

    // Default
    "Enrichment": {
        bg: "bg-gray-800",
        border: "ring-gray-600 ring-2",
        text: "text-gray-700",
        icon: <span><RiDragMoveLine size={14} /></span>,
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
    const intensity = element.enrichment?.intensity;
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
            {/* Display intensity if present */}
            {intensity !== undefined && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-semibold normal-case tracking-normal">
                    {label === "Pause" || label === "Long Pause" ? `${intensity}s` : intensity}
                </span>
            )}
            {/* Hidden children required by Slate for void nodes */}
            <span style={{ display: "none" }}>{children}</span>
        </span>
    );
};
