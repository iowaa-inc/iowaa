import { useState } from "react";
import { RiArrowDropDownLine, RiArrowRightSLine } from "@remixicon/react";
import { ExpressionModule } from "../types";
import { PROSODY_OPTIONS } from "../data/prosody";
import { FieldLabel, FieldDescription } from "@repo/ui-core/components/field";
import { Button } from "@repo/ui-core/components/button";
import { Slider } from "@repo/ui-core/components/slider";
import type { SpeechContextType } from "../context";

const speedOptions = PROSODY_OPTIONS.speed;

// Separate component for stateful speed logic
type SpeedSubMenuProps = SpeechContextType & {
    currentValues: { value: string }[];
    onBack: () => void;
};

function SpeedSubMenu({
    getItemsForModule,
    addItem,
    removeItem,
    onBack,
}: SpeedSubMenuProps) {
    // Find the current index, default to 2 ('Normal')
    const selectedItems = getItemsForModule("speed");
    const selectedValue = selectedItems.length > 0 ? selectedItems[0].value : "";
    const initialIndex = speedOptions.findIndex(opt => opt.value === selectedValue);
    const defaultIndex = initialIndex >= 0 ? initialIndex : 2; // 2 is 'Normal'

    // Internal state for slider index so we get on-the-fly feedback as user slides
    const [sliderIndex, setSliderIndex] = useState<number>(defaultIndex);

    // We'll keep the slider snapped to the number of options (0 - 4)
    const handleSliderChange = (valArr: number[]) => {
        setSliderIndex(valArr[0]);
    };

    // This saves (selects) the value for the module (if as-you-go: you could trigger here, or on mouseUp)
    const handleSliderCommit = (valArr: number[]) => {
        const newIdx = valArr[0];
        const selectedOption = speedOptions[newIdx];
        if (!selectedOption) return;
        // Remove previous selection
        if (selectedItems.length > 0) {
            removeItem(selectedItems[0].id);
        }
        addItem(SpeedModule, selectedOption.value);
    };

    const activeOption = speedOptions[sliderIndex];

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-1.5 pb-3 border-b">
                <Button type="button" variant="ghost" size="icon-sm" onClick={onBack}>
                    {/* <ChevronLeft /> */}
                    <RiArrowDropDownLine />
                </Button>
                <span className="text-sm font-medium">Adjust Speech Speed</span>
            </div>

            {/* Display the active label & description above the slider */}
            <div className="space-y-3">
                <div className="px-1 pb-4">
                    <FieldLabel>{activeOption.label}</FieldLabel>
                    <FieldDescription>{activeOption.description}</FieldDescription>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Slider
                        min={0}
                        max={speedOptions.length - 1}
                        step={1}
                        value={[sliderIndex]}
                        onValueChange={handleSliderChange}
                        onValueCommit={handleSliderCommit}
                        className="w-full max-w-md"
                        aria-label="Speech Speed"
                    />
                    {/* Marks below the slider */}
                    <div className="flex w-full max-w-md justify-between mt-3 px-1 text-xs text-muted-foreground select-none">
                        {speedOptions.map((option, i) => (
                            <span
                                key={option.value}
                                className={`text-center whitespace-nowrap w-[48px] truncate${sliderIndex === i ? " text-primary font-medium" : ""}`}
                                style={{
                                    transition: "color 0.2s",
                                }}
                            >
                                {option.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const SpeedModule: ExpressionModule = {
    id: "speed",
    label: "Speed",
    prefix: "Speak",
    icon: null,
    color: "bg-blue-100 text-blue-700",
    renderMenuItem: ({ onOpenSubMenu }) => (
        <Button
            type="button"
            variant="ghost"
            className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm group justify-start"
            onClick={onOpenSubMenu}
        >
            <span>Speed</span>
            <RiArrowRightSLine className="ml-auto h-4 w-4 opacity-50" size={16} />
        </Button>
    ),
    renderSubMenu: (props) => <SpeedSubMenu {...props} />,
};
