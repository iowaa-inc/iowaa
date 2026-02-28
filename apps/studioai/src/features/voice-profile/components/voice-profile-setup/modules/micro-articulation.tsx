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

type MicroArticulationOption = {
    value: string;
    label: string;
    description?: string;
};

const microArticulationOptions: MicroArticulationOption[] = [
    {
        value: "crisp-enunciation",
        label: "Crisp enunciation",
        description: "Consonants and vowels are articulated clearly with minimal slurring.",
    },
    {
        value: "softened-stops",
        label: "Softened stops",
        description: "Plosives (p, t, k, b, d, g) are less forceful or aspirated than in standard American/British English.",
    },
    {
        value: "gentle-t-approach",
        label: "Gentle 't' articulation",
        description: "The /t/ sound is softer and sometimes realized as a tap/flap or persistent [t], not a glottal stop.",
    },
    {
        value: "unstressed-final-syllables",
        label: "Unstressed final syllables",
        description: "Reduced clarity or dropped articulation in final weak syllables (e.g. '-en', '-ed').",
    },
    {
        value: "clear-liquid-consonants",
        label: "Clear 'l' and 'r' sounds",
        description: "Liquids (l/r) pronounced distinctly, not heavily vocalized or elided.",
    },
    {
        value: "nasal-quality",
        label: "Nasal quality in articulation",
        description: "A subtle resonance in nasal sounds (m, n, ng) or overall speech.",
    },
    {
        value: "glide-initials",
        label: "Glide-like vowels at word onset",
        description: "Initial vowels sound like they start with a slight 'y' or 'w' glide.",
    },
    {
        value: "other",
        label: "Other",
    },
];

function Component() {
    const anchor = useComboboxAnchor();
    const [selected, setSelected] = React.useState<MicroArticulationOption[]>([]);

    return (
        <Combobox
            multiple
            items={microArticulationOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={selected}
            onValueChange={setSelected}
            autoHighlight
        >
            <ComboboxChips ref={anchor} className="w-full">
                <ComboboxValue>
                    {(values: MicroArticulationOption[]) => (
                        <>
                            {(values ?? []).map(value => (
                                <ComboboxChip key={value.value}>
                                    {value.label}
                                </ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Select micro-articulation" />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No micro-articulation patterns found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: MicroArticulationOption) => (
                        <ComboboxItem key={option.value} value={option}>
                            <div className="flex flex-col">
                                <span className="font-medium">{option.label}</span>
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

export const MicroArticulation: VoiceProfileModule = {
    key: "micro-articulation",
    label: "Micro-articulation",
    description: "Micro-articulation details.",
    render: () => <Component />,
};
