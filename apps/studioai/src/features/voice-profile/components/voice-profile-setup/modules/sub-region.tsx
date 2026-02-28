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

type SubRegionOption = {
    label: string;
    value: string;
};

// Example list of sub-regions/origins -- expand or localize as needed
const subRegionOptions: SubRegionOption[] = [
    { label: "Lagos", value: "lagos" },
    { label: "Abuja", value: "abuja" },
    { label: "Ibadan", value: "ibadan" },
    { label: "Port Harcourt", value: "portharcourt" },
    { label: "Onitsha", value: "onitsha" },
    { label: "Jos", value: "jos" },
    { label: "Kano", value: "kano" },
    { label: "Enugu", value: "enugu" },
    { label: "Makurdi", value: "makurdi" },
    { label: "Benin City", value: "benincity" },
];

function Component() {
    const [subRegion, setSubRegion] = React.useState<SubRegionOption | null>(null);

    return (
        <Combobox
            items={subRegionOptions}
            value={subRegion}
            onValueChange={setSubRegion}
            itemToStringValue={(item) => (item ? item.label : "")}
        >
            <ComboboxInput placeholder="Select sub-region/origin" className="w-full"/>
            <ComboboxContent>
                <ComboboxEmpty>No sub-regions found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: SubRegionOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            {option.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const SubRegion: VoiceProfileModule = {
    key: "sub-region",
    label: "Sub-region / Origin",
    description: "Sub-region or place of origin (Lagos, Abuja, etc.).",
    render: () => <Component />,
};
