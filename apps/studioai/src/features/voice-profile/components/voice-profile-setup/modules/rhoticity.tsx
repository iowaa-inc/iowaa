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

type RhoticityOption = {
    value: string;
    label: string;
    description?: string;
};

const rhoticityOptions: RhoticityOption[] = [
    { value: "fully-rhotic", label: "Rhotic (R pronounced at ends and before consonants)", description: "E.g., 'car' as /kɑr/, 'hard' as /hɑrd/" },
    { value: "partially-rhotic", label: "Partially rhotic (R sometimes pronounced)", description: "Only in some environments or for emphasis." },
    { value: "non-rhotic", label: "Non-rhotic (R not pronounced unless followed by a vowel)", description: "E.g., 'car' as /kɑː/, 'hard' as /hɑːd/" },
    { value: "variable", label: "Variable", description: "Rhoticity depends on context or code-switching." },
    { value: "other", label: "Other" },
];

function Component() {
    const [value, setValue] = React.useState<RhoticityOption | null>(null);

    return (
        <Combobox
            items={rhoticityOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={value}
            onValueChange={setValue}
        >
            <ComboboxInput placeholder="Select rhoticity" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No rhoticity options found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: RhoticityOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            <div className="flex flex-col">
                                <span className="font-medium">{option.label}</span>
                                {option.description && (
                                    <span className="text-sm text-muted-foreground">{option.description}</span>
                                )}
                            </div>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const Rhoticity: VoiceProfileModule = {
    key: "rhoticity",
    label: "Rhoticity",
    description: "Rhoticity (presence or absence of 'r' sounds).",
    render: () => <Component />,
};
