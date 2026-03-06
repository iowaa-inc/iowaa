import type { Position } from "../tyoes";
import React, {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
} from "react";
import {
    Editor,
    Range,
    Element as SlateElement,
} from "slate";
import {
    ReactEditor,
    useSlate,
} from "slate-react";

export type HighlightInfo = {
    text: string;
    pos: Position;
    range: Range;
    nodeId?: string;
};

interface UseHighlightOpts<T> {
    type?: string;
    getInfo?: (args: {
        editor: Editor;
        selection: Range;
        rect: DOMRect;
        text: string;
        nodeId?: string;
    }) => T;
}

// --- Helper: Node enrichment info ---
function getHighlightData(
    editor: Editor,
    type: string = "highlight"
) {
    const { selection } = editor;
    if (!selection)
        return { value: undefined };

    const [match] = Editor.nodes(editor, {
        at: selection,
        mode: "lowest",
        match: (n) =>
            SlateElement.isElement(n) && n.type === type,
    });

    if (match) {
        const [node] = match;
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: Array.isArray((node as any).data)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? (node as any).data
                : undefined,
        };
    }

    return { value: undefined };
}

// --- Helper: Extract DOM & Node info ---
const getHighlightMeta = (
    editor: Editor,
    selection: Range,
    type: string
) => {
    const [enriched] = Editor.nodes(editor, {
        at: selection,
        mode: "lowest",
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === type,
    });

    if (Range.isCollapsed(selection) && !enriched) {
        return null;
    }

    try {
        const domRange = ReactEditor.toDOMRange(editor, selection);
        const rect = domRange.getBoundingClientRect();

        if (rect.width === 0 && !enriched) return null;

        let text = "";
        let nodeId: string | undefined;

        if (enriched) {
            const [node] = enriched;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodeId = (node as any).id;
            text = Editor.string(
                editor,
                Editor.range(editor, ReactEditor.findPath(editor, node))
            );
            if (!text) text = "Enriched Content";
        } else {
            text = Editor.string(editor, selection);
            const [foundNode] = Editor.nodes(editor, {
                at: selection,
                mode: "lowest",
                match: (n) => SlateElement.isElement(n) && "id" in n,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (foundNode) nodeId = (foundNode[0] as any).id;
        }

        return { rect, text, nodeId };
    } catch (e) {
        console.warn("Error calculating Slate range:", e);
        return null;
    }
};

function useHighlight<
    T extends HighlightInfo = HighlightInfo
>({
    type = "highlight",
    getInfo,
}: UseHighlightOpts<T> = {}): [
        T | null,
        React.Dispatch<React.SetStateAction<T | null>>,
        Editor
    ] {
    const editor = useSlate();
    const [info, setInfo] = useState<T | null>(null);
    const prevSelRef = useRef<Range | null>(null);

    const getInfoRef = useRef(getInfo);
    useLayoutEffect(() => {
        getInfoRef.current = getInfo;
    });

    useEffect(() => {
        const { selection } = editor;

        if (!selection) {
            setInfo(null);
            prevSelRef.current = null;
            return;
        }

        if (
            prevSelRef.current &&
            Range.equals(prevSelRef.current, selection)
        ) {
            return;
        }

        setInfo(null);

        const timerId = setTimeout(() => {
            const currentSelection = editor.selection;
            
            if (!currentSelection || !Range.equals(currentSelection, selection)) {
                return;
            }

            const meta = getHighlightMeta(
                editor,
                selection,
                type
            );

            if (!meta) {
                setInfo(null);
                prevSelRef.current = null;
                return;
            }

            const { rect, text, nodeId } = meta;

            if (!text || text.trim() === "") {
                setInfo(null);
                prevSelRef.current = null;
                return;
            }

            const pos = {
                x: rect.left + window.scrollX + rect.width / 2,
                y: rect.bottom + window.scrollY + 8,
            };

            const fullInfo = getInfoRef.current
                ? getInfoRef.current({ editor, selection, rect, text, nodeId })
                : ({
                    text: text || "Selected Text",
                    pos,
                    range: selection,
                    nodeId,
                } as unknown as T);

            prevSelRef.current = selection;
            setInfo(fullInfo);
        }, 150);

        return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor, editor.selection, type]);

    return [info, setInfo, editor];
}

export {
    useHighlight,
    getHighlightData,
};
