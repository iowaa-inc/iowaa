import { BaseEditor } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { HistoryEditor } from "slate-history";

export type HighlightEnrichmentElement = {
    type: "highlight-enrichment";
    // highlightType: string; // e.g., "whisper", "shout", "emphasis"
    children: CustomText[];
};

// --- Node Types ---
export type EnrichmentElement = {
    type: "enrichment";
    enrichment: { id: string; label: string };
    children: CustomText[];
};

export type ParagraphElement = {
    type: "paragraph";
    children: CustomText[];
};

export type CustomElement =
    | EnrichmentElement
    | ParagraphElement
    | HighlightEnrichmentElement;
    
export type CustomText = { text: string; isDropTarget?: boolean };

// --- Slate Module Augmentation ---
declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

// --- Component Props ---
export interface EnrichmentPillProps extends RenderElementProps {
    element: EnrichmentElement;
    onClick: () => void;
    onDragStart: (e: React.DragEvent) => void;
}
