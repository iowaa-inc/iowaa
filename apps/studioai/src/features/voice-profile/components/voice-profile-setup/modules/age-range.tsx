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

const ageRanges = Array.from({ length: 9 }, (_, i) => {
    const v = ((i + 1) * 10).toString();
    return { value: v, label: `${v}s` };
});

function Component() {
    const [start, setStart] = useState("20");
    const [end, setEnd] = useState("40");

    // Derive filtered options for each combobox
    const filteredStart = ageRanges.filter((r) => +r.value <= +end);
    const filteredEnd = ageRanges.filter((r) => +r.value >= +start);

    return (
        <div className="flex flex-row justify-between gap-4">
            {/* Start Combobox */}
            <div className="flex items-center w-full">
                <span className="min-w-10 text-xs">Start</span>
                <Combobox
                    items={filteredStart.map(opt => opt.value)}
                    value={start}
                    onValueChange={(v) => {
                        // Only update if v is not null
                        if (v === null) return;
                        setStart(v);
                        // Ensure start <= end
                        if (+v > +end) setEnd(v);
                    }}
                >
                    <ComboboxInput placeholder="Start age" className="w-full font-mono" />
                    <ComboboxContent>
                        <ComboboxEmpty>No options found.</ComboboxEmpty>
                        <ComboboxList>
                            {(opt) => {
                                const entry = ageRanges.find(a => a.value === opt);
                                if (!entry) return null;
                                return (
                                    <ComboboxItem key={entry.value} value={entry.value} className="font-mono">
                                        {entry.label}
                                    </ComboboxItem>
                                );
                            }}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
            {/* End Combobox */}
            <div className="flex items-center w-full">
                <span className="min-w-10 text-xs">End</span>
                <Combobox
                    items={filteredEnd.map(opt => opt.value)}
                    value={end}
                    onValueChange={(v) => {
                        // Only update if v is not null
                        if (v === null) return;
                        setEnd(v);
                        // Ensure start <= end
                        if (+v < +start) setStart(v);
                    }}
                >
                    <ComboboxInput placeholder="End age" className="w-full font-mono" />
                    <ComboboxContent>
                        <ComboboxEmpty>No options found.</ComboboxEmpty>
                        <ComboboxList>
                            {(opt) => {
                                const entry = ageRanges.find(a => a.value === opt);
                                if (!entry) return null;
                                return (
                                    <ComboboxItem key={entry.value} value={entry.value} className="font-mono">
                                        {entry.label}
                                    </ComboboxItem>
                                );
                            }}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
        </div>
    );
}

export const AgeRange: VoiceProfileModule = {
    key: "age-range",
    label: "Age Range",
    description: "Specify the age range of the voice.",
    render: () => <Component />,
};
