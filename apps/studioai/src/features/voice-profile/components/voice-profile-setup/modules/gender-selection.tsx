import { useState } from "react";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldTitle,
} from "@repo/ui-core/components/field";
import { RadioGroup, RadioGroupItem } from "@repo/ui-core/components/radio-group";
import { RiCheckLine, RiMenLine, RiWomenLine } from "@remixicon/react";
import { cn } from "@repo/ui-core/lib/utils";

const GENDERS = [
    { value: "female", label: "Female", Icon: RiWomenLine },
    { value: "male", label: "Male", Icon: RiMenLine },
];

function Component() {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
        <RadioGroup
            value={value}
            onValueChange={setValue}
            className="max-w-sm flex"
            aria-label="Gender Selection "
        >
            {GENDERS.map((gender) => (
                <FieldLabel key={gender.value} htmlFor={`gender-${gender.value}`} className="has-data-checked:bg-accent! has-data-checked:border-transparent!">
                    <Field orientation="horizontal" className="">
                        <FieldContent className="flex flex-row items-center gap-2 ">
                            <gender.Icon size={20} className="text-muted-foreground" aria-hidden="true" />
                            <FieldTitle>{gender.label}</FieldTitle>
                        </FieldContent>
                        <RiCheckLine size={17} className={cn(value === gender.value ? "block ml-auto my-auto" : "hidden")} />
                        <RadioGroupItem className="sr-only hidden" value={gender.value} id={`gender-${gender.value}`} />
                    </Field>
                </FieldLabel>
            ))}
        </RadioGroup>
    );
}

export const GenderSelection = {
    key: "gender-selection",
    label: "Gender Selection",
    description: "Choose gender identity for the voice.",
    render: () => <Component />,
};
