import React from "react";
import { ExpressionModule } from "../types";
import { Checkbox } from "@repo/ui-core/components/checkbox";

interface SimpleToggleConfig {
    id: string;
    label: string;
    prefix: string;
    icon: React.ReactNode;
    color: string;
}

export const createSimpleToggleModule = (config: SimpleToggleConfig): ExpressionModule => {
    return {
        ...config,
        renderMenuItem: ({ isSelected, onToggle }) => (
            <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent rounded-sm">
                <Checkbox
                    id={`toggle-${config.id}`}
                    checked={isSelected}
                    onCheckedChange={onToggle}
                />
                <label
                    htmlFor={`toggle-${config.id}`}
                    className="flex items-center gap-2 text-sm cursor-pointer w-full"
                >
                    {config.icon}
                    {config.label}
                </label>
            </div>
        ),
        // No renderSubMenu because these are simple toggles
    };
};
