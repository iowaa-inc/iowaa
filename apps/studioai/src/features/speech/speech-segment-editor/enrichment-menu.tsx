import React, { useEffect, useRef } from "react";
import { ReactEditor } from "slate-react";
import { Editor, Range, Path, Node } from "slate";
import ReactDOM from "react-dom";
import { cn } from "@repo/ui-core/lib/utils";

// --- Portal Helper ---
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (typeof document !== "undefined") {
        return ReactDOM.createPortal(children, document.body);
    }
    return null;
};

// --- Menu Types ---
export type MenuMode =
    | { type: "insert"; at: Range }
    | { type: "edit"; path: Path };

interface EnrichmentMenuProps {
    editor: Editor;
    menuMode: MenuMode;
    options: { label: string }[];
    selectedIndex: number;
    onSelect: (option: { label: string }) => void;
}

export const EnrichmentMenu = ({
    editor,
    menuMode,
    options,
    selectedIndex,
    onSelect,
}: EnrichmentMenuProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Handle Positioning
    useEffect(() => {
        if (ref.current) {
            const el = ref.current;
            let domRect: DOMRect | null = null;

            if (menuMode.type === "insert") {
                const domRange = ReactEditor.toDOMRange(editor, menuMode.at);
                domRect = domRange.getBoundingClientRect();
            } else if (menuMode.type === "edit") {
                try {
                    const node = Editor.node(editor, menuMode.path)[0];
                    const domNode = ReactEditor.toDOMNode(editor, node as Node);
                    domRect = domNode.getBoundingClientRect();
                } catch (e) {
                    // Node might have been deleted
                }
            }

            if (domRect) {
                el.style.top = `${domRect.bottom + window.scrollY}px`;
                el.style.left = `${domRect.left + window.scrollX}px`;
            }
        }
    }, [menuMode, editor]);

    if (options.length === 0) return null;

    return (
        <Portal>
            <div
                ref={ref}
                className="absolute z-50 bg-white rounded shadow-lg border border-gray-200 p-1 min-w-[150px]"
            >
                {options.map((option, i) => (
                    <div
                        key={option.label}
                        className={cn(
                            "px-3 py-1.5 rounded cursor-pointer text-sm",
                            i === selectedIndex ? "bg-blue-100 text-blue-800" : "hover:bg-gray-50"
                        )}
                        onClick={() => onSelect(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </Portal>
    );
};
