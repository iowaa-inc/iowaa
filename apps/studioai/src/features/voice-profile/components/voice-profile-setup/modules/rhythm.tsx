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

const rhythms = [
    { value: "staccato", label: "Staccato" },
    { value: "legato", label: "Legato" },
    { value: "rubato", label: "Rubato" },
    { value: "regular", label: "Regular" },
    { value: "irregular", label: "Irregular" },
    { value: "stress-timed", label: "Stress-timed" },
    { value: "syllable-timed", label: "Syllable-timed" },
];

function Component() {
    const [value, setValue] = useState("regular");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={rhythms.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select rhythm" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = rhythms.find(r => r.value === opt);
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

export const Rhythm: VoiceProfileModule = {
    key: "rhythm",
    label: "Rhythm",
    description: "Control the rhythmic pattern of speech. Staccato for short/clipped, Legato for smooth/connected, Stress-timed for English-like, Syllable-timed for Romance language-like.",
    render: () => <Component />,
};
