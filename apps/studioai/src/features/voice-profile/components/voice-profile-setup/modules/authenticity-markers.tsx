import { VoiceProfileModule } from "../registry";
import * as React from "react";
import {
    Combobox,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
    ComboboxValue,
    useComboboxAnchor,
} from "@repo/ui-core/components/combobox";

type AuthenticityMarkerOption = {
    value: string;
    title: string;
    description?: string;
};

const authenticityMarkersOptions: AuthenticityMarkerOption[] = [
    { value: "authentic", title: "Authentic", description: "Avoid caricature or imitation." },
    { value: "subtle", title: "Subtle", description: "Accent is a flavor, not the main focus." },
    { value: "blended", title: "Blended", description: "Markers are integrated, not overemphasized." },
    { value: "natural", title: "Natural", description: "Does not sound forced or artificial." },
    { value: "contextual", title: "Contextual", description: "Markers used appropriately for situation." },
    { value: "other", title: "Other" },
];

function Component() {
    const anchor = useComboboxAnchor();
    const [selected, setSelected] = React.useState<AuthenticityMarkerOption[]>([]);

    return (
        <Combobox
            multiple
            items={authenticityMarkersOptions}
            itemToStringValue={opt => opt ? opt.title : ""}
            value={selected}
            onValueChange={setSelected}
            autoHighlight
        >
            <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                    {(values: AuthenticityMarkerOption[]) => (
                        <>
                            {(values ?? []).map(value => (
                                <ComboboxChip key={value.value}>
                                    {value.title}
                                </ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Select authenticity markers" />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No authenticity markers found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: AuthenticityMarkerOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            <div className="flex flex-col">
                                <span className="font-medium">{option.title}</span>
                                {option.description && (
                                    <span className="text-sm text-muted-foreground">{option.description}</span>
                                )}
                            </div>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const AuthenticityMarkers: VoiceProfileModule = {
    key: "authenticity-markers",
    label: "Authenticity Markers",
    description: "Markers that make speech authentic.",
    render: () => <Component />,
};
