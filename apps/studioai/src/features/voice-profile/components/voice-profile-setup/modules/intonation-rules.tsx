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

const intonationRules = [
    { value: "flat", label: "Flat" },
    { value: "rising", label: "Rising" },
    { value: "falling", label: "Falling" },
    { value: "variable", label: "Variable" },
    { value: "question-like", label: "Question-like" },
    { value: "statement-like", label: "Statement-like" },
];

function Component() {
    const [value, setValue] = useState("variable");

    return (
        <div className="flex flex-col gap-2 w-full">
            <Combobox
                items={intonationRules.map(opt => opt.value)}
                value={value}
                onValueChange={(v) => {
                    if (v === null) return;
                    setValue(v);
                }}
            >
                <ComboboxInput placeholder="Select intonation rules" className="w-full" />
                <ComboboxContent>
                    <ComboboxEmpty>No options found.</ComboboxEmpty>
                    <ComboboxList>
                        {(opt) => {
                            const entry = intonationRules.find(i => i.value === opt);
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

export const IntonationRules: VoiceProfileModule = {
    key: "intonation-rules",
    label: "Intonation Rules",
    description: "Define how pitch changes throughout sentences. Flat for monotone, rising for questioning tone, falling for statements, or variable for natural speech patterns.",
    render: () => <Component />,
};
