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

type RegisterOption = {
    value: string;
    label: string;
    description?: string;
};

const registerOptions: RegisterOption[] = [
    {
        value: "educated",
        label: "Educated/Standard",
        description: "Standard or formal variety often used in education, news, or official settings.",
    },
    {
        value: "formal",
        label: "Formal",
        description: "More precise, careful speech for formal occasions, ceremonies, or high-status situations.",
    },
    {
        value: "relaxed",
        label: "Relaxed",
        description: "Casual, natural, less careful speech for everyday or comfortable environments.",
    },
    {
        value: "colloquial",
        label: "Colloquial",
        description: "Familiar, informal language and expressions, often used with friends or peers.",
    },
    {
        value: "slang",
        label: "Slang/Popular",
        description: "Highly informal, popular, or trendy language, possibly including slang or in-group expressions.",
    },
    {
        value: "other",
        label: "Other",
        description: "A register not listed above.",
    },
];

function Component() {
    const [register, setRegister] = React.useState<RegisterOption | null>(null);

    return (
        <Combobox
            items={registerOptions}
            itemToStringValue={option => (option ? option.label : "")}
            value={register}
            onValueChange={setRegister}
        >
            <ComboboxInput placeholder="Select register" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No registers found.</ComboboxEmpty>
                <ComboboxList>
                    {(option: RegisterOption) => (
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

export const Register: VoiceProfileModule = {
    key: "register",
    label: "Register",
    description: "Register type (Educated/Standard, Formal, Relaxed, etc.)",
    render: () => <Component />,
};
