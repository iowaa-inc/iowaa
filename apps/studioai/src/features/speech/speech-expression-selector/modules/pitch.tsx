import { useMemo } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { ExpressionModule } from "../types";
import { PROSODY_OPTIONS } from "../data/prosody";
import { FieldLabel, FieldDescription } from "@repo/ui-core/components/field";
import { Button } from "@repo/ui-core/components/button";
import type { SpeechContextType } from "../context";
import { RadioGroup, RadioGroupItem } from "@repo/ui-core/components/radio-group";

const pitchOptions = PROSODY_OPTIONS.pitch;

type PitchSubMenuProps = SpeechContextType & {
    currentValues: { value: string }[];
    onBack: () => void;
};

/**
 * Stateful SubMenu UI/logic for selecting pitch.
 */
function PitchSubMenu({
    getItemsForModule,
    addItem,
    removeItem,
    onBack,
}: PitchSubMenuProps) {
    // Find the current value, default to 'normal' (index 1)
    const selectedItems = getItemsForModule("pitch");
    const selectedValue = selectedItems.length > 0 ? selectedItems[0].value : "";
    const initialIndex = pitchOptions.findIndex(opt => opt.value === selectedValue);
    const defaultIndex = initialIndex >= 0 ? initialIndex : 1; // 1 is 'Normal' for pitch

    // Handles changing pitch option
    const handleSelect = (value: string) => {
        const option = pitchOptions.find((opt) => opt.value === value);
        if (!option) return;
        // Remove previous selection if exists
        if (selectedItems.length > 0) {
            removeItem(selectedItems[0].id);
        }
        addItem(PitchModule, value);
    };

    // Memoize the active option for display
    const activeOption = useMemo(() => {
        const v = selectedItems.length > 0 ? selectedItems[0].value : "";
        return pitchOptions.find(opt => opt.value === v) || pitchOptions[defaultIndex];
    }, [selectedItems, defaultIndex]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1.5 pb-3 border-b">
                <Button type="button" variant="ghost" size="icon-sm" onClick={onBack}>
                    <RiArrowLeftSLine size={18} />
                </Button>
                <span className="text-sm font-medium">Adjust Voice Pitch</span>
            </div>

            <RadioGroup
                value={activeOption.value}
                onValueChange={handleSelect}
                className="w-full max-w-md gap-1"
                aria-label="Voice Pitch"
            >
                {pitchOptions.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-accent transition-colors cursor-pointer"
                    >
                        <RadioGroupItem value={option.value} />
                        <div className="flex flex-col min-w-0">
                            <FieldLabel>{option.label}</FieldLabel>
                            <FieldDescription>{option.description}</FieldDescription>
                        </div>
                    </label>
                ))}
            </RadioGroup>
        </div>
    );
}

export const PitchModule: ExpressionModule = {
    id: "pitch",
    label: "Pitch",
    prefix: "Use",
    icon: null,
    color: "bg-purple-100 text-purple-700",

    renderMenuItem: ({ onOpenSubMenu }) => (
        <Button
            type="button"
            variant="ghost"
            className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm group justify-start"
            onClick={onOpenSubMenu}
        >
            <span>Pitch</span>
            <RiArrowRightSLine className="ml-auto h-4 w-4 opacity-50" size={16} />
        </Button>
    ),

    renderSubMenu: (props) => <PitchSubMenu {...props} />,
};