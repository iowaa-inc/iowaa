import React from "react";

import { SpeechContextType } from './context'

export type SpeechAttributeType = "emotion" | "dynamic";

// The shape of a selected item
export interface SelectedExpression {
    id: string;      // Unique ID for the tag (e.g., "uuid-123")
    moduleId: string; // Who created this? (e.g., "speed")
    prefix: string;  // "Convey", "Pick up the pace"
    value: string;   // "Excitement", "140wpm"
}

// The Contract that every module must follow
export interface ExpressionModule {
    id: string;
    label: string;
    prefix: string;
    icon: React.ReactNode;
    color: string; // Tailwind classes for the badge
    configurable?: boolean;
    options?: string[];

    /**
     * Renders the item in the main popover list.
     * @param isSelected - Is this module currently active?
     * @param onToggle - Callback to toggle it directly (if it has no sub-menu)
     * @param onOpenSubMenu - Callback to open the sub-menu (if it has options)
     */
    renderMenuItem: (props: {
        isSelected: boolean;
        onToggle: () => void;
        onOpenSubMenu: () => void;
    }) => React.ReactNode;

    /**
     * (Optional) Renders the sub-menu content (e.g., list of speeds).
     * @param currentValues - What is currently selected for this module?
     * @param onSelect - Callback to add/remove a specific value
     * @param onBack - Callback to go back to main menu
     * @param speechContext - The Speech context (optional, for advanced modules)
     */
    renderSubMenu?: (props: SpeechContextType & {
        currentValues: SelectedExpression[];
        onSelect: (value: string) => void;
        onBack: () => void;
    }) => React.ReactNode;
}
