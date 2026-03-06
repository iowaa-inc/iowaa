import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Range, Path, Node, Descendant, Element as SlateElement } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";

import { HIGHLIGHT_ENRICHMENT_TYPE, ENRICHMENT_TYPE, ENRICHMENT_OPTIONS } from "./libs/constants";
import { withEnrichments } from "./libs/editor-plugins";
import { CustomElement, EnrichmentElement } from "./libs/editor-types";

import { EnrichmentPill } from "./enrichment-pill";
import { Leaf } from "./leaf";
import { EnrichmentMenu, MenuMode } from "./enrichment-menu";
import { SelectionToolbar } from "./selection-toolbar";
import { HighlightEnrichment } from "./highlight-enrichment";

// --- Props for reusability across multiple speech segments ---
type SpeechSegmentEditorProps = {
    value?: Descendant[];
    onChange: (value: Descendant[]) => void;
    readOnly?: boolean;
    className?: string;
};
//  = DEFAULT_INITIAL_VALUE
export function SpeechSegmentEditor({
    value = [],
    onChange,
    readOnly = false,
    className = "",
}: SpeechSegmentEditorProps) {
    const editor = useMemo(() => withEnrichments(withHistory(withReact(createEditor()))), []);

    // --- Local interaction state not related to data value props ---
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState("");
    const [menuMode, setMenuMode] = useState<MenuMode | null>(null);
    const [dropTarget, setDropTarget] = useState<Range | null>(null);

    const filteredOptions = ENRICHMENT_OPTIONS.filter((opt) =>
        opt.label.toLowerCase().startsWith(search.toLowerCase())
    );

    // --- Logic Implementations ---

    const insertEnrichment = useCallback((ed: Editor, enrichment: { label: string }) => {
        const node: EnrichmentElement = {
            type: ENRICHMENT_TYPE,
            enrichment: { ...enrichment, id: Date.now().toString() },
            children: [{ text: "" }],
        };
        Transforms.insertNodes(ed, node);
        Transforms.move(ed);
    }, []);

    const updateEnrichmentAt = useCallback((path: Path, enrichment: { label: string }) => {
        Transforms.setNodes<EnrichmentElement>(
            editor,
            { enrichment: { ...enrichment, id: Date.now().toString() } } as Partial<EnrichmentElement>,
            { at: path }
        );
    }, [editor]);

    const handleMenuSelect = useCallback((option: { label: string }) => {
        if (!menuMode) return;

        if (menuMode.type === "insert") {
            Transforms.select(editor, menuMode.at);
            insertEnrichment(editor, option);
        } else if (menuMode.type === "edit") {
            updateEnrichmentAt(menuMode.path, option);
            const after = Editor.after(editor, menuMode.path);
            if (after) Transforms.select(editor, after);
        }
        setMenuMode(null);
    }, [menuMode, editor, insertEnrichment, updateEnrichmentAt]);

    // --- Event Handlers ---

    // Track the last value to prevent identical saves (e.g., from Slate normalizations)
    const contentRef = React.useRef(value);

    // The controlled value comes from props, so call parent's onChange.
    const handleChange = (newValue: Descendant[]) => {
        const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
            // Prevent false-positive updates due to initial normalization
            const currentStringified = JSON.stringify(newValue);
            const prevStringified = JSON.stringify(contentRef.current);
            if (currentStringified !== prevStringified) {
                contentRef.current = newValue;
                onChange(newValue);
            }
        }
        
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);

            // 1. Get the surrounding block context up to the cursor
            const blockStart = Editor.before(editor, start, { unit: "block" });
            const beforeRange = blockStart && Editor.range(editor, blockStart, start);
            const beforeText = beforeRange && Editor.string(editor, beforeRange);

            // 2. Check for trigger (match slash at start of block or after space)
            const match = beforeText && beforeText.match(/(?:^|\s)\/(\w*)$/);

            if (match && beforeRange) {
                // Calculate the absolute position where the slash starts
                const startOfMatchOffset =
                    Range.start(beforeRange).offset + beforeText.lastIndexOf("/");

                // Create a precise range for JUST the trigger text (e.g. "/pause")
                // This ensures we don't delete the word preceding the slash.
                const triggerRange: Range = {
                    anchor: {
                        path: beforeRange.anchor.path,
                        offset: startOfMatchOffset,
                    },
                    focus: start, // Current cursor position
                };

                setMenuMode({
                    type: "insert",
                    at: triggerRange, // Use the precise range
                });

                setSearch(match[1] || "");
                setIndex(0);
                return;
            }
        }
        setMenuMode(null);
    };


    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (menuMode) {
            if (["ArrowDown", "ArrowUp", "Tab", "Enter", "Escape"].includes(event.key)) {
                event.preventDefault();
            }
            if (event.key === "ArrowDown") {
                setIndex((i) => (i + 1) % filteredOptions.length);
            } else if (event.key === "ArrowUp") {
                setIndex((i) => (i - 1 + filteredOptions.length) % filteredOptions.length);
            } else if (event.key === "Tab" || event.key === "Enter") {
                const choice = filteredOptions[index] || filteredOptions[0];
                if (choice) handleMenuSelect(choice);
            } else if (event.key === "Escape") {
                setMenuMode(null);
            }
        }
    }, [filteredOptions, index, menuMode, handleMenuSelect]);

    // --- Drag & Drop ---

    const onDragStart = useCallback((event: React.DragEvent, element: CustomElement, path: Path) => {
        event.dataTransfer.setData("application/x-enrichment", JSON.stringify({ path, element }));
        event.dataTransfer.effectAllowed = "move";
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        if (event.dataTransfer.types.includes("application/x-enrichment")) {
            event.preventDefault();
            const range = ReactEditor.findEventRange(editor, event);
            setDropTarget(range);
        }
    }, [editor]);

    const onDrop = useCallback((event: React.DragEvent) => {
        const data = event.dataTransfer.getData("application/x-enrichment");
        if (!data) return;
        event.preventDefault();
        const { path: oldPath, element } = JSON.parse(data);
        const range = ReactEditor.findEventRange(editor, event);

        if (range) {
            Transforms.select(editor, range);
            Transforms.removeNodes(editor, { at: oldPath });
            Transforms.insertNodes(editor, element);
        }
        setDropTarget(null);
    }, [editor]);

    // --- Renderers ---

    const decorate = useCallback(([node, path]: [Node, Path]) => {
        if (dropTarget && Range.includes(dropTarget, path)) {
            if (SlateElement.isElement(node) && (node as SlateElement).type === ENRICHMENT_TYPE) {
                return [];
            }
            const intersection = Range.intersection(dropTarget, Editor.range(editor, path));
            if (intersection) {
                return [{ ...intersection, isDropTarget: true } as Range & { isDropTarget: true }];
            }
        }
        return [];
    }, [dropTarget, editor]);

    const renderElement = useCallback((props: RenderElementProps) => {
        const type = (props.element as SlateElement).type;

        if (type === ENRICHMENT_TYPE) {
            const path = ReactEditor.findPath(editor, props.element);
            return (
                <EnrichmentPill
                    {...props}
                    element={props.element as EnrichmentElement}
                    onClick={() => {
                        setSearch("");
                        setIndex(0);
                        setMenuMode({ type: "edit", path });
                    }}
                    onDragStart={(e) => onDragStart(e, props.element as CustomElement, path)}
                />
            );
        }

        if (type === HIGHLIGHT_ENRICHMENT_TYPE) {
            return <HighlightEnrichment {...props} />;
        }

        return <p {...props.attributes}>{props.children}</p>;
    }, [editor, onDragStart]);

    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    console.log("SpeechSegmentEditor current value:", value);

    return (
        <Slate
            editor={editor}
            initialValue={value}
            onChange={handleChange}
        >
            {menuMode && (
                <EnrichmentMenu
                    editor={editor}
                    menuMode={menuMode}
                    options={filteredOptions}
                    selectedIndex={index}
                    onSelect={handleMenuSelect}
                />
            )}

            <SelectionToolbar />

            <Editable
                decorate={decorate}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onDragOver={onDragOver}
                onDragLeave={() => setDropTarget(null)}
                onDrop={onDrop}
                onKeyDown={onKeyDown}
                readOnly={readOnly}
                placeholder="Type '/' to insert an enrichment..."
                className={`outline-none text-foreground ${className}`}
            />
        </Slate>
    );
}
