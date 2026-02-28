import { VoiceProfileModule } from "../registry";
import * as React from "react";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
} from "@repo/ui-core/components/combobox";

type CodeSwitchingOption = {
    value: string;
    label: string;
    description?: string;
};

const codeSwitchingOptions: CodeSwitchingOption[] = [
    { value: "none", label: "None", description: "No code-switching occurs in speech." },
    { value: "rare", label: "Rare/Occasional", description: "Code-switching happens infrequently or only in specific contexts." },
    { value: "moderate", label: "Moderate (switches in casual speech)", description: "Speaker switches codes moderately, usually in informal settings." },
    { value: "frequent", label: "Frequent", description: "Code-switching is a regular and expected part of communication." },
    { value: "continuous", label: "Continuous/Integrated", description: "Code-switching is continuous and seamlessly integrated into speech." },
];

function Component() {
    const [codeSwitching, setCodeSwitching] = React.useState<CodeSwitchingOption | null>(null);

    return (
        <Combobox
            items={codeSwitchingOptions}
            itemToStringValue={opt => (opt ? opt.label : "")}
            value={codeSwitching}
            onValueChange={setCodeSwitching}
        >
            <ComboboxInput placeholder="Select code-switching level" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No code-switching options found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: CodeSwitchingOption) => (
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

export const CodeSwitching: VoiceProfileModule = {
    key: "code-switching",
    label: "Code-Switching Level",
    description: "Select the typical level of code-switching—how frequently languages are alternated—in your spoken language.",
    render: () => <Component />,
};
