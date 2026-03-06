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

const enunciationStyles = [
    { value: "precise", label: "Precise" },
    { value: "natural", label: "Natural" },
    { value: "relaxed", label: "Relaxed" },
    { value: "crisp", label: "Crisp" },
    { value: "mumbled", label: "Mumbled" },
];

function Component() {
    const [value, setValue] = useState("natural");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={enunciationStyles.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select enunciation style" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = enunciationStyles.find(e => e.value === opt);
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

export const EnunciationStyle: VoiceProfileModule = {
    key: "enunciation-style",
    label: "Enunciation Style",
    description: "Control the clarity and articulation of speech. Precise for professional broadcasts, natural for everyday conversation, or relaxed for casual delivery.",
    render: () => <Component />,
};
