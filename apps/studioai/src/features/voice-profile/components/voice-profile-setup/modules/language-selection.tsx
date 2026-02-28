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

type LanguageOption = {
    value: string;
    label: string;
};

const languageOptions: LanguageOption[] = [
    { value: "en", label: "English (General)" },
    { value: "en-us", label: "English (US)" },
    { value: "en-gb", label: "English (UK)" },
    { value: "en-au", label: "English (Australian)" },
    { value: "en-in", label: "English (Indian)" },
    { value: "en-ng", label: "English (Nigerian)" },
    { value: "en-za", label: "English (South African)" },
    { value: "en-ca", label: "English (Canadian)" },
    { value: "pga", label: "Nigerian Pidgin English" },
];

function Component() {
    const [language, setLanguage] = React.useState<LanguageOption | null>(null);

    return (
        <Combobox
            items={languageOptions}
            value={language}
            onValueChange={setLanguage}
            itemToStringValue={(lang) => (lang ? lang.label : "")}
        >
            <ComboboxInput placeholder="Select English variation" className="w-full" />
            <ComboboxContent>
                <ComboboxEmpty>No languages found.</ComboboxEmpty>
                <ComboboxList>
                    {(lang: LanguageOption) => (
                        <ComboboxItem key={lang.value} value={lang}>
                            {lang.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export const LanguageSelection: VoiceProfileModule = {
    key: "language-selection",
    label: "Language Selection",
    description: "Select the English variation the voice will use.",
    render: () => <Component />,
};
