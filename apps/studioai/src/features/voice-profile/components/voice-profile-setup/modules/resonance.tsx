import { VoiceProfileModule } from "../registry";
import * as React from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
} from "@repo/ui-core/components/combobox";

type ResonanceOption = {
    value: string;
    label: string;
};

const resonanceOptions: ResonanceOption[] = [
    { value: "chest", label: "Chest-dominant" },
    { value: "head", label: "Head-dominant" },
    { value: "mixed", label: "Mixed" },
    { value: "nasal", label: "Nasal" },
];

function Component() {
    const [resonance, setResonance] = React.useState<ResonanceOption | null>(null);

    return (
        <Combobox
            items={resonanceOptions}
            itemToStringValue={(option) => (option ? option.label : "")}
            value={resonance}
            onValueChange={setResonance}
        >
            <ComboboxInput placeholder="Select resonance" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No options found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: ResonanceOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            {option.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const Resonance: VoiceProfileModule = {
    key: "resonance",
    label: "Resonance",
    description: "Resonance type (chest-dominant, head-dominant, etc.).",
    render: () => <Component />,
};
