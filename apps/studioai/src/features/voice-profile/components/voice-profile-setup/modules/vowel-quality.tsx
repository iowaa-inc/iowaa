import { VoiceProfileModule } from "../registry";
import * as React from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@repo/ui-core/components/combobox";

type VowelQualityOption = {
    value: string;
    label: string;
    description?: string;
};

const vowelQualityOptions: VowelQualityOption[] = [
    { value: "close", label: "Close", description: "Tongue is close to the roof of the mouth." },
    { value: "near-close", label: "Near-close", description: "Tongue is slightly below close position." },
    { value: "close-mid", label: "Close-mid", description: "Midway between close and mid." },
    { value: "mid", label: "Mid", description: "Midway between close and open." },
    { value: "open-mid", label: "Open-mid", description: "Midway between mid and open." },
    { value: "near-open", label: "Near-open", description: "Slightly above open position." },
    { value: "open", label: "Open", description: "Tongue is low and jaw open." },
    {
        value: "slightly-rounded",
        label: "Slightly rounded vowels",
        description: "Slightly rounded vowels (typical of the Lagos corporate accent)",
    },
    {
        value: "crisp-neutral",
        label: "Crisp and neutral",
        description: "Crisp and neutral",
    },
];

function Component() {
    const [quality, setQuality] = React.useState<VowelQualityOption | null>(null);

    return (
        <Combobox
            items={vowelQualityOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={quality}
            onValueChange={setQuality}
        >
            <ComboboxInput placeholder="Select vowel quality" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No vowel qualities found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: VowelQualityOption) => (
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

export const VowelQuality: VoiceProfileModule = {
    key: "vowel-quality",
    label: "Vowel Quality",
    description:
        "Vowel quality specification. Examples: Slightly rounded vowels (typical of the Lagos corporate accent), Crisp and neutral.",
    render: () => <Component />,
};
