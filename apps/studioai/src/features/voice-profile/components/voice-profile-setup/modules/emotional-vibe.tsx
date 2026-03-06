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

const emotionalVibes = [
    { value: "neutral", label: "Neutral" },
    { value: "happy", label: "Happy" },
    { value: "sad", label: "Sad" },
    { value: "angry", label: "Angry" },
    { value: "excited", label: "Excited" },
    { value: "calm", label: "Calm" },
    { value: "anxious", label: "Anxious" },
    { value: "confident", label: "Confident" },
];

function Component() {
    const [value, setValue] = useState("neutral");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={emotionalVibes.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select emotional vibe" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = emotionalVibes.find(e => e.value === opt);
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

export const EmotionalVibe: VoiceProfileModule = {
    key: "emotional-vibe",
    label: "Emotional Vibe",
    description: "Set the overall emotional tone of the voice. This affects how the voice conveys feelings and mood throughout speech.",
    render: () => <Component />,
};
