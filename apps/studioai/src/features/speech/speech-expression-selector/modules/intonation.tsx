import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { ExpressionModule } from "../types";
import { PROSODY_OPTIONS } from "../data/prosody";
import { FieldLabel, FieldDescription } from "@repo/ui-core/components/field";
import { Button } from "@repo/ui-core/components/button";
import type { SpeechContextType } from "../context";
import { RadioGroup, RadioGroupItem } from "@repo/ui-core/components/radio-group";
import { useMemo } from "react";

const intonationOptions = PROSODY_OPTIONS.intonation;

type IntonationSubMenuProps = SpeechContextType & {
    currentValues: { value: string }[];
    onBack: () => void;
};

/**
 * Stateful SubMenu UI/logic for selecting intonation.
 */
function IntonationSubMenu({
    getItemsForModule,
    addItem,
    removeItem,
    onBack,
}: IntonationSubMenuProps) {
    // Get current selected item for intonation, or default to first option
    const selectedItems = getItemsForModule("intonation");
    const selectedValue = selectedItems.length > 0 ? selectedItems[0]?.value : "";
    const initialIndex = intonationOptions.findIndex(opt => opt.value === selectedValue);
    const defaultIndex = initialIndex >= 0 ? initialIndex : 0; // 0 is the default for intonation

    const handleSelect = (value: string) => {
        const option = intonationOptions.find((opt) => opt.value === value);
        if (!option) return;
        // Remove previous selection if exists
        if (selectedItems.length > 0 && selectedItems[0]) {
            removeItem(selectedItems[0].id);
        }
        addItem(IntonationModule, value);
    };

    // Memoize the active option for display
    const activeOption = useMemo(() => {
        const v = selectedItems.length > 0 ? selectedItems[0]?.value : "";
        return intonationOptions.find(opt => opt.value === v) || intonationOptions[defaultIndex];
    }, [selectedItems, defaultIndex]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1.5 pb-3 border-b">
                <Button type="button" variant="ghost" size="icon-sm" onClick={onBack}>
                    <RiArrowLeftSLine size={18} />
                </Button>
                <span className="text-sm font-medium">Adjust Intonation</span>
            </div>

            <RadioGroup
                value={activeOption?.value}
                onValueChange={handleSelect}
                className="w-full max-w-md gap-1"
                aria-label="Intonation"
            >
                {intonationOptions.map((option) => (
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

export const IntonationModule: ExpressionModule = {
    id: "intonation",
    label: "Intonation",
    prefix: "Say",
    icon: null,
    color: "bg-green-100 text-green-700",

    renderMenuItem: ({ onOpenSubMenu }) => (
        <Button
            type="button"
            variant="ghost"
            className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm group justify-start"
            onClick={onOpenSubMenu}
        >
            <span>Intonation</span>
            <RiArrowRightSLine className="ml-auto" size={16} />
        </Button>
    ),

    renderSubMenu: (props) => <IntonationSubMenu {...props} />,
};
