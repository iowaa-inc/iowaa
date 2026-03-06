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

const pacingStrategies = [
    { value: "consistent", label: "Consistent" },
    { value: "variable", label: "Variable" },
    { value: "rushed", label: "Rushed" },
    { value: "deliberate", label: "Deliberate" },
    { value: "natural", label: "Natural" },
];

function Component() {
    const [value, setValue] = useState("natural");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={pacingStrategies.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select pacing strategy" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = pacingStrategies.find(p => p.value === opt);
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

export const PacingStrategy: VoiceProfileModule = {
    key: "pacing-strategy",
    label: "Pacing Strategy",
    description: "Control how the voice varies speed throughout speech. Consistent for steady delivery, variable for dynamic expression, or natural for human-like variation.",
    render: () => <Component />,
};
