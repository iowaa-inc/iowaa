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

const roomTones = [
    { value: "studio-dead", label: "Studio (Dead)" },
    { value: "small-room", label: "Small Room" },
    { value: "large-room", label: "Large Room" },
    { value: "hall", label: "Hall" },
    { value: "outdoor", label: "Outdoor" },
    { value: "cathedral", label: "Cathedral" },
    { value: "booth", label: "Booth" },
];

function Component() {
    const [value, setValue] = useState("studio-dead");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={roomTones.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select room tone" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = roomTones.find(r => r.value === opt);
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

export const RoomTone: VoiceProfileModule = {
    key: "room-tone",
    label: "Room Tone",
    description: "Define the acoustic environment and reverb characteristics. Studio for dry/professional, Hall for spacious, Outdoor for ambient.",
    render: () => <Component />,
};
