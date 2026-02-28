import { Editor, Range, Transforms, Element as SlateElement } from "slate";
import ReactDOM from "react-dom";
import { HIGHLIGHT_ENRICHMENT_TYPE } from "./libs/constants";
import { PronunciationModal } from "../pronounciation-builder";
import { useHighlight, HighlightInfo, getHighlightData } from "./use-slate-highlight";

const Portal = ({ children }: { children: React.ReactNode }) =>
    typeof document !== "undefined"
        ? ReactDOM.createPortal(children, document.body)
        : null;

export const SelectionToolbar = () => {
    const [
        selection,
        setSelection,
        editor,
    ] = useHighlight<HighlightInfo>({
        type: HIGHLIGHT_ENRICHMENT_TYPE,
    });
    const { value: highlightValue } = getHighlightData(editor, HIGHLIGHT_ENRICHMENT_TYPE);

    // --- Handle Apply (Bridge between Modal and Slate) ---
    const handleApply = (effectsData: any[]) => {
        const [match] = Editor.nodes(editor, {
            match: (n) =>
                SlateElement.isElement(n) && n.type === HIGHLIGHT_ENRICHMENT_TYPE,
        });

        if (match) {
            // --- EDITING EXISTING ---
            const [, path] = match;
            Transforms.select(editor, path);

            // Update the node properties directly with new data
            Transforms.setNodes(
                editor,
                {
                    data: effectsData,
                } as any,
                { at: path }
            );
        } else {
            // --- CREATING NEW ---
            if (editor.selection && !Range.isCollapsed(editor.selection)) {
                Transforms.wrapNodes(
                    editor,
                    {
                        type: HIGHLIGHT_ENRICHMENT_TYPE,
                        data: effectsData,
                        children: [],
                    } as any,
                    { split: true }
                );
            }
        }

        // Collapse selection to close toolbar/modal
        Transforms.collapse(editor, { edge: "end" });
        setSelection(null);
    };

    if (selection) {
        console.log("Selection node data:", JSON.stringify(selection));
    }

    return (
        <Portal>
            <PronunciationModal
                selection={
                    selection
                        ? {
                            text: selection.text,
                            position: selection.pos,
                        }
                        : null
                }
                value={highlightValue}
                onClose={() => setSelection(null)}
                onApply={handleApply}
            />
        </Portal>
    );
};
