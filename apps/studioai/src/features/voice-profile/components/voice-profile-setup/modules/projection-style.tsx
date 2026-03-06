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

const projectionStyles = [
    { value: "intimate", label: "Intimate" },
    { value: "conversational", label: "Conversational" },
    { value: "presentational", label: "Presentational" },
    { value: "theatrical", label: "Theatrical" },
    { value: "broadcast", label: "Broadcast" },
];

function Component() {
    const [value, setValue] = useState("conversational");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={projectionStyles.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select projection style" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = projectionStyles.find(p => p.value === opt);
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

export const ProjectionStyle: VoiceProfileModule = {
    key: "projection-style",
    label: "Projection Style",
    description: "Set the voice's delivery style and distance. Intimate for close whispers, conversational for normal speech, broadcast for announcements, theatrical for performances.",
    render: () => <Component />,
};
