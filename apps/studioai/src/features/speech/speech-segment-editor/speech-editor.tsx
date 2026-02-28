import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Range, Path, Node, Descendant, Element as SlateElement } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";

import { EnrichmentPill } from "./enrichment-pill";
import { Leaf } from "./leaf";
import { EnrichmentMenu, MenuMode } from "./enrichment-menu";

import { withEnrichments } from "./libs/editor-plugins";
import { ENRICHMENT_TYPE, ENRICHMENT_OPTIONS } from "./libs/constants";
import { CustomElement, EnrichmentElement } from "./libs/editor-types";

export function SpeechEditor() {
    const editor = useMemo(() => withEnrichments(withHistory(withReact(createEditor()))), []);
    const [value, setValue] = useState<Descendant[]>([]);

    // Interaction State
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

    const onChange = (newValue: Descendant[]) => {
        setValue(newValue);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, { unit: "word" });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText = beforeRange && Editor.string(editor, beforeRange);

            const match = beforeText && beforeText.match(/\/(\w*)$/);
            const isSlash = beforeText?.endsWith("/") && !match;

            if (match || isSlash) {
                setMenuMode({ type: "insert", at: beforeRange || selection });
                setSearch(match ? match[1] : "");
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
        if ((props.element as SlateElement).type === ENRICHMENT_TYPE) {
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
        return <p {...props.attributes}>{props.children}</p>;
    }, [editor, onDragStart]);

    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h3 className="mb-4 text-xl font-bold">Speech Segment Editor</h3>
            <div className="border border-gray-300 p-4 rounded min-h-[150px] relative">
                <Slate
                    editor={editor}
                    initialValue={[]}
                    onChange={onChange}
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

                    <Editable
                        decorate={decorate}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onDragOver={onDragOver}
                        onDragLeave={() => setDropTarget(null)}
                        onDrop={onDrop}
                        onKeyDown={onKeyDown}
                        placeholder="Type '/' to insert an enrichment..."
                        className="outline-none"
                    />
                </Slate>
            </div>
            <div className="mt-8">
                <h4 className="font-semibold text-sm text-gray-500 mb-2">Data Output:</h4>
                <pre className="bg-slate-50 p-4 rounded text-xs border overflow-auto">
                    {JSON.stringify(value, null, 2)}
                </pre>
            </div>
        </div>
    );
}
