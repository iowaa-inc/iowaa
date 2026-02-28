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

type ProsodyIntonationOption = {
    value: string;
    label: string;
    description?: string;
};

const prosodyIntonationOptions: ProsodyIntonationOption[] = [
    { value: "neutral", label: "Neutral (even, not marked)", description: "No pronounced intonation pattern." },
    { value: "expressive", label: "Expressive", description: "Marked by dynamic or emotionally expressive intonation." },
    { value: "falling", label: "Falling intonation", description: "Statements end lower, often heard in Nigerian English." },
    { value: "rising", label: "Rising intonation", description: "Questions or statements with upward inflection." },
    { value: "level", label: "Level", description: "Intonation has little rise or fall." },
    { value: "melodic", label: "Melodic", description: "Distinctive pitch movement, often rhythmic or song-like." },
    { value: "staccato", label: "Staccato", description: "Short, clipped pitch movements, less melodic." },
    { value: "regional-pattern", label: "Regional/cultural pattern", description: "Intonation pattern typical of a specific region or ethnic group." },
    { value: "other", label: "Other" },
];

function Component() {
    const [prosody, setProsody] = React.useState<ProsodyIntonationOption | null>(null);

    return (
        <Combobox
            items={prosodyIntonationOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={prosody}
            onValueChange={setProsody}
        >
            <ComboboxInput placeholder="Select prosody/intonation style" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No prosody/intonation styles found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: ProsodyIntonationOption) => (
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

export const ProsodyIntonation: VoiceProfileModule = {
    key: "prosody-intonation",
    label: "Prosody / Intonation",
    description: "Prosody and intonation style.",
    render: () => <Component />,
};
