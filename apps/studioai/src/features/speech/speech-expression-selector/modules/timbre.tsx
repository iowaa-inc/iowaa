import { useMemo } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { ExpressionModule } from "../types";
import { PROSODY_OPTIONS } from "../data/prosody";
import { FieldLabel, FieldDescription } from "@repo/ui-core/components/field";
import { Button } from "@repo/ui-core/components/button";
import type { SpeechContextType } from "../context";
import { RadioGroup, RadioGroupItem } from "@repo/ui-core/components/radio-group";

const timbreOptions = PROSODY_OPTIONS.timbre;

// Updated component for stateful logic of Timbre sub menu
function TimbreSubMenu({
    getItemsForModule,
    addItem,
    removeItem,
    onBack,
}: SpeechContextType & {
    currentValues: { value: string }[];
    onBack: () => void;
}) {
    // Find the current value, default to 'Breathy' (index 0)
    const selectedItems = getItemsForModule("timbre");
    const selectedValue = selectedItems.length > 0 ? selectedItems[0]?.value : "";
    const initialIndex = timbreOptions.findIndex(opt => opt.value === selectedValue);
    const defaultIndex = initialIndex >= 0 ? initialIndex : 0; // 0 is 'Breathy' for timbre

    // Handles changing timbre option
    const handleSelect = (value: string) => {
        const option = timbreOptions.find((opt) => opt.value === value);
        if (!option) return;
        // Remove previous selection if exists
        if (selectedItems.length > 0 && selectedItems[0]) {
            removeItem(selectedItems[0].id);
        }
        addItem(TimbreModule, value);
    };

    // Memoize the active option for display
    const activeOption = useMemo(() => {
        const v = selectedItems.length > 0 ? selectedItems[0]?.value : "";
        return timbreOptions.find(opt => opt.value === v) || timbreOptions[defaultIndex];
    }, [selectedItems, defaultIndex]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1.5 pb-3 border-b">
                <Button type="button" variant="ghost" size="icon-sm" onClick={onBack}>
                    <RiArrowLeftSLine size={18} />
                </Button>
                <span className="text-sm font-medium">Adjust Timbre</span>
            </div>

            <div className="space-y-3">
                <RadioGroup
                    value={activeOption?.value}
                    onValueChange={handleSelect}
                    className="w-full max-w-md gap-1"
                    aria-label="Timbre"
                >
                    {timbreOptions.map((option) => (
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
        </div>
    );
}

export const TimbreModule: ExpressionModule = {
    id: "timbre",
    label: "Timbre",
    prefix: "With",
    icon: null,
    color: "bg-amber-100 text-amber-700",

    renderMenuItem: ({ onOpenSubMenu }) => (
        <Button
            type="button"
            variant="ghost"
            className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm group justify-start"
            onClick={onOpenSubMenu}
        >
            <span>Timbre</span>
            <RiArrowRightSLine className="ml-auto h-4 w-4 opacity-50" size={16} />
        </Button>
    ),

    renderSubMenu: (props) => <TimbreSubMenu {...props} />,
};
