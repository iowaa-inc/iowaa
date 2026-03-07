import { useState, useMemo } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";
import { ExpressionModule } from "../types";
import { EMOTION_OPTIONS } from "../data/emotions";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@repo/ui-core/components/field";
import { RadioGroup, RadioGroupItem } from "@repo/ui-core/components/radio-group";
import { Input } from "@repo/ui-core/components/input";
import { ScrollArea } from "@repo/ui-core/components/scroll-area";
import { Button } from "@repo/ui-core/components/button";
import type { SpeechContextType } from "../context";

type EmotionsSubMenuProps = SpeechContextType & {
    currentValues: { value: string }[];
    onBack: () => void;
};

function EmotionsSubMenu({
    getItemsForModule,
    addItem,
    removeItem,
    onBack,
}: EmotionsSubMenuProps) {
    const [search, setSearch] = useState("");
    const selectedItems = getItemsForModule("emotion");
    const selectedValue = selectedItems.length > 0 ? selectedItems[0]?.value : "";

    const handleSelect = (value: string) => {
        if (selectedItems.length > 0 && selectedItems[0]) {
            removeItem(selectedItems[0].id);
        }
        if (selectedValue !== value) {
            addItem(EmotionsModule, value);
        }
    };

    const filteredEmotions = useMemo(() => {
        if (!search.trim()) return EMOTION_OPTIONS;
        const lc = search.toLowerCase();
        return EMOTION_OPTIONS.filter(
            (emotion) =>
                emotion.label.toLowerCase().includes(lc) ||
                (emotion.description && emotion.description.toLowerCase().includes(lc))
        );
    }, [search]);

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1.5 pb-2 border-b">
                <Button type="button" variant="ghost" size="icon-sm" onClick={onBack}>
                    <RiArrowLeftSLine size={18} />
                </Button>
                <span className="text-sm font-medium">Select Emotion</span>
            </div>
            <Input
                type="text"
                placeholder="Search emotions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <ScrollArea className="h-72">
                <RadioGroup
                    value={selectedValue}
                    onValueChange={handleSelect}
                    className="w-full space-y-1 px-1 py-2"
                >
                    {filteredEmotions.length === 0 && (
                        <div className="text-sm px-2 py-4 text-muted-foreground text-center">
                            No matches found.
                        </div>
                    )}
                    {filteredEmotions.map((emotion) => (
                        <Field orientation="horizontal" key={emotion.id}>
                            <RadioGroupItem value={emotion.id} id={`emotion-radio-${emotion.id}`} />
                            <FieldContent>
                                <FieldLabel htmlFor={`emotion-radio-${emotion.id}`}>
                                    {emotion.label}
                                </FieldLabel>
                                <FieldDescription>{emotion.description}</FieldDescription>
                            </FieldContent>
                        </Field>
                    ))}
                </RadioGroup>
            </ScrollArea>
        </div>
    );
}

export const EmotionsModule: ExpressionModule = {
    id: "emotion",
    label: "Emotions",
    prefix: "Convey",
    icon: null,
    color: "bg-red-100 text-red-700",

    renderMenuItem: ({ onOpenSubMenu }) => (
        <Button
            type="button"
            variant="ghost"
            className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm group justify-start"
            onClick={onOpenSubMenu}
        >
            <span>Emotions</span>
            <RiArrowRightSLine className="ml-auto h-4 w-4 opacity-50" />
        </Button>
    ),

    renderSubMenu: (props: EmotionsSubMenuProps) => <EmotionsSubMenu {...props} />,
};
