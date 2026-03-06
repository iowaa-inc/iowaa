import { VoiceProfileModule } from "../registry";
import { useState } from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
} from "@repo/ui-core/components/combobox";

const temperaments = [
    { value: "reserved", label: "Reserved" },
    { value: "balanced", label: "Balanced" },
    { value: "energetic", label: "Energetic" },
    { value: "melancholic", label: "Melancholic" },
    { value: "sanguine", label: "Sanguine" },
    { value: "phlegmatic", label: "Phlegmatic" },
    { value: "choleric", label: "Choleric" },
];

function Component() {
    const [value, setValue] = useState("balanced");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={temperaments.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select temperament" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = temperaments.find(t => t.value === opt);
                            if (!entry) return null;
                            return (
                                <ComboboxItem key={entry.value} value={entry.value}>
                                    {entry.label}
                                </ComboboxItem>
                            );
                        }}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    );
}

export const DefaultTemperament: VoiceProfileModule = {
    key: "default-temperament",
    label: "Default Temperament",
    description: "Define the voice's baseline personality type. This influences the natural energy level and emotional disposition of the voice.",
    render: () => <Component />,
};
