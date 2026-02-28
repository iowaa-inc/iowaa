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

type BreathHandlingOption = {
    value: string;
    label: string;
    description?: string;
};

const breathHandlingOptions: BreathHandlingOption[] = [
    {
        value: "controlled",
        label: "Controlled breath (smooth, even airflow)",
        description: "Breath is managed for steady, even volume and phrase lengths. No abrupt gasps or running out of air.",
    },
    {
        value: "audible-inhale",
        label: "Audible inhalation",
        description: "Breaths in are sometimes heard before or during speech.",
    },
    {
        value: "visible-pauses",
        label: "Noticeable breath pauses",
        description: "Speech is punctuated by audible or visible pauses for breathing.",
    },
    {
        value: "fast-breath",
        label: "Rapid breath between phrases",
        description: "Quick inhalations between phrases, possibly affecting rhythm.",
    },
    {
        value: "minimal-breath-sound",
        label: "Minimal breath sound",
        description: "Little or no breath sound is perceived between or during speech.",
    },
    {
        value: "other",
        label: "Other",
    },
];

function Component() {
    const [breath, setBreath] = React.useState<BreathHandlingOption | null>(null);

    return (
        <Combobox
            items={breathHandlingOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={breath}
            onValueChange={setBreath}
        >
            <ComboboxInput placeholder="Select breath handling style" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No breath handling styles found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: BreathHandlingOption) => (
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

export const BreathHandling: VoiceProfileModule = {
    key: "breath-handling",
    label: "Breath Handling",
    description: "Control of breath during speaking.",
    render: () => <Component />,
};
