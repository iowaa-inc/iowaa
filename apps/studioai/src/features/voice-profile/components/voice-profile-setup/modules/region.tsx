import { VoiceProfileModule } from "../registry";
import * as React from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
} from "@repo/ui-core/components/combobox";

type RegionOption = {
    value: string;
    label: string;
};

const regionOptions: RegionOption[] = [
    { value: "ng", label: "Nigerian" },
    { value: "us", label: "American" },
    { value: "uk", label: "British" },
    { value: "gh", label: "Ghanaian" },
    { value: "wa", label: "West African" },
    { value: "ea", label: "East African" },
    { value: "sa", label: "South African" },
    { value: "ca", label: "Caribbean" },
    { value: "in", label: "Indian" },
    { value: "eu", label: "European (non-British)" },
];

function Component() {
    const [region, setRegion] = React.useState<RegionOption | null>(null);

    return (
        <Combobox
            items={regionOptions}
            itemToStringValue={(region) => region ? region.label : ""}
            value={region}
            onValueChange={setRegion}
        >
            <ComboboxInput placeholder="Select region" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No regions found.</ComboboxEmpty>
                <ComboboxList>
                    {(region: RegionOption) => (
                        <ComboboxItem key={region.value} value={region}>
                            {region.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const Region: VoiceProfileModule = {
    key: "region",
    label: "Region",
    description: "Region (Nigerian, American, West African, etc.).",
    render: () => <Component />,
};
