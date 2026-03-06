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

const undesiredTones = [
    { value: "nasal", label: "Nasal" },
    { value: "breathy", label: "Breathy" },
    { value: "hoarse", label: "Hoarse" },
    { value: "shrill", label: "Shrill" },
    { value: "muffled", label: "Muffled" },
    { value: "harsh", label: "Harsh" },
    { value: "robotic", label: "Robotic" },
    { value: "stiff", label: "Stiff" },
    { value: "monotone", label: "Monotone" },
];

function Component() {
    const [value, setValue] = useState("robotic");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={undesiredTones.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select tone to avoid" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = undesiredTones.find(t => t.value === opt);
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

export const UndesiredToneMarkers: VoiceProfileModule = {
    key: "undesired-tone-markers",
    label: "Undesired Tone Markers",
    description: "Specify voice qualities to avoid. Select attributes that should be minimized or eliminated from the voice output.",
    render: () => <Component />,
};
