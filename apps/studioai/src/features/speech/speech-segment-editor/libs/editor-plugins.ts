import { Editor, Element as SlateElement } from "slate";
import { ENRICHMENT_TYPE, HIGHLIGHT_ENRICHMENT_TYPE } from "./constants";

// --- Plugins ---
export const withEnrichments = <T extends Editor>(editor: T) => {
    const e = editor as T & Editor;
    const { isInline, isVoid } = editor;

    e.isInline = (element) =>
        (element as SlateElement).type === ENRICHMENT_TYPE ||
            (element as SlateElement).type === HIGHLIGHT_ENRICHMENT_TYPE // Treat wrapper as inline
            ? true
            : isInline(element);

    // Keep isVoid ONLY for the pill (EnrichmentElement)
    e.isVoid = (element) =>
        (element as SlateElement).type === ENRICHMENT_TYPE ? true : isVoid(element);

    return e;
};
