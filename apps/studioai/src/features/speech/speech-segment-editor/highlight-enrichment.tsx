import React from "react";
import { RenderElementProps, useSelected, useFocused, useSlateStatic } from "slate-react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { cn } from "@repo/ui-core/lib/utils";

export const HighlightEnrichment = ({
    attributes,
    children,
    element,
}: RenderElementProps) => {
    const selected = useSelected();
    const focused = useFocused();
    const editor = useSlateStatic();

    const type = (element as any).highlightType || "default";
    const styles = "bg-yellow-100 border-yellow-300 text-yellow-900 dark:bg-yellow-900 dark:border-yellow-500 dark:text-yellow-100"

    // Handler to select the node when the label is clicked
    const handleLabelClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const path = ReactEditor.findPath(editor, element);
        Transforms.select(editor, path); // This triggers the Toolbar to appear in "Edit Mode"
    };

    return (
        <span
            {...attributes}
            className={cn(
                "rounded px-1 mx-0.5 border-b-2 transition-all relative group",
                styles,
                selected && focused ? "ring-2 ring-offset-1 ring-blue-400" : ""
            )}
        >
            {children}

            {/* Label Pill: Only visible when selected & focused */}
            {/* <span
                contentEditable={false}
                onMouseDown={handleLabelClick}
                className={cn(
                    "absolute -top-5 left-0 cursor-pointer text-[10px] font-bold uppercase tracking-wider transition-opacity select-none bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-200 hover:bg-gray-50 z-10 flex flex-row items-center whitespace-nowrap",
                    selected && focused ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <span className="whitespace-nowrap flex flex-row items-center">
                    <span className="text-gray-400 text-[8px] mr-1">▼</span>
                    {type}
                </span>
            </span> */}
        </span>
    );
};
