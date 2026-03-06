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

const textures = [
    { value: "smooth", label: "Smooth" },
    { value: "rough", label: "Rough" },
    { value: "breathy", label: "Breathy" },
    { value: "clear", label: "Clear" },
    { value: "raspy", label: "Raspy" },
    { value: "husky", label: "Husky" },
    { value: "airy", label: "Airy" },
    { value: "textured", label: "Textured" },
];

function Component() {
    const [value, setValue] = useState("clear");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={textures.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select texture" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = textures.find(t => t.value === opt);
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

export const VocalTexture: VoiceProfileModule = {
    key: "vocal-texture",
    label: "Vocal Texture",
    description: "Define the surface quality of the voice. Smooth for polished sound, Raspy for grit, Breathy for air, Clear for precision.",
    render: () => <Component />,
};
