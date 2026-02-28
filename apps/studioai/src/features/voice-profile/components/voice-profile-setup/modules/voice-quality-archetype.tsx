import * as React from "react";
import { VoiceProfileModule } from "../registry";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
} from "@repo/ui-core/components/combobox";

type VoiceQualityOption = {
    value: string;
    label: string;
    description?: string;
};

const VOICE_QUALITIES: VoiceQualityOption[] = [
    { value: "warm", label: "Warm", description: "Rich, inviting and comforting" },
    { value: "bright", label: "Bright", description: "Lively, energetic and clear" },
    { value: "neutral", label: "Neutral", description: "Balanced and uncolored" },
    { value: "deep", label: "Deep", description: "Lower resonance, dramatic" },
    { value: "smooth", label: "Smooth", description: "Even, calm, easy to listen to" },
    { value: "raspy", label: "Raspy", description: "Textured, with slight grit" },
    { value: "airy", label: "Airy", description: "Soft, breathy, delicate" },
    { value: "powerful", label: "Powerful", description: "Strong and projecting" },
    { value: "character", label: "Character", description: "Unique or stylized character" },
];

function Component() {
    const [quality, setQuality] = React.useState<VoiceQualityOption | null>(null);

    return (
        <Combobox
            items={VOICE_QUALITIES}
            itemToStringValue={option => (option ? option.label : "")}
            value={quality}
            onValueChange={setQuality}
        >
            <ComboboxInput placeholder="Select an archetype/quality" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No qualities found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: VoiceQualityOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            <div className="flex flex-col px-2 py-0.5">
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

export const VoiceQuality: VoiceProfileModule = {
    key: "voice-quality-archetype",
    label: "Voice Quality / Archetype",
    description: "Select voice quality or archetype.",
    render: () => <Component />,
};
