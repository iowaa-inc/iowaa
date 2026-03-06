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

const emphasisStyles = [
    { value: "subtle", label: "Subtle" },
    { value: "moderate", label: "Moderate" },
    { value: "strong", label: "Strong" },
    { value: "dynamic", label: "Dynamic" },
    { value: "monotone", label: "Monotone" },
];

function Component() {
    const [value, setValue] = useState("moderate");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={emphasisStyles.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select emphasis style" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = emphasisStyles.find(e => e.value === opt);
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

export const EmphasisStyle: VoiceProfileModule = {
    key: "emphasis-style",
    label: "Emphasis Style",
    description: "Control how strongly the voice emphasizes important words and phrases. From subtle variations to dramatic emphasis or completely flat delivery.",
    render: () => <Component />,
};
