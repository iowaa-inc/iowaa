import React, { useEffect, useRef, useState } from "react";
import { ReactEditor } from "slate-react";
import { Editor, Range, Path, Node } from "slate";
import ReactDOM from "react-dom";
import { cn } from "@repo/ui-core/lib/utils";
import { UTTERANCE_OPTIONS, UtteranceOption } from "./libs/constants";
import { Slider } from "@repo/ui-core/components/slider";
import { Button } from "@repo/ui-core/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@repo/ui-core/components/card";
import { Badge } from "@repo/ui-core/components/badge";
import { Separator } from "@repo/ui-core/components/separator";
import { ScrollArea } from "@repo/ui-core/components/scroll-area";
import { Input } from "@repo/ui-core/components/input";
import { RiCloseLine, RiArrowRightSLine, RiSearchLine } from "@remixicon/react";

// --- Portal Helper ---
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (typeof document !== "undefined") {
        return ReactDOM.createPortal(children, document.body);
    }
    return null;
};

// --- Menu Types ---
export type MenuMode =
    | { type: "insert"; at: Range }
    | { type: "edit"; path: Path };

interface EnrichmentMenuProps {
    editor: Editor;
    menuMode: MenuMode;
    options: { label: string }[];
    selectedIndex: number;
    onSelect: (option: { label: string; intensity?: number }) => void;
}

export const EnrichmentMenu = ({
    editor,
    menuMode,
    options,
    selectedIndex,
    onSelect,
}: EnrichmentMenuProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [selectedOption, setSelectedOption] = useState<UtteranceOption | null>(null);
    const [intensity, setIntensity] = useState<number | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Handle Positioning
    useEffect(() => {
        if (ref.current) {
            const el = ref.current;
            let domRect: DOMRect | null = null;

            if (menuMode.type === "insert") {
                const domRange = ReactEditor.toDOMRange(editor, menuMode.at);
                domRect = domRange.getBoundingClientRect();
            } else if (menuMode.type === "edit") {
                try {
                    const node = Editor.node(editor, menuMode.path)[0];
                    const domNode = ReactEditor.toDOMNode(editor, node as Node);
                    domRect = domNode.getBoundingClientRect();
                } catch (e) {
                    // Node might have been deleted
                }
            }

            if (domRect) {
                el.style.top = `${domRect.bottom + window.scrollY + 8}px`;
                el.style.left = `${domRect.left + window.scrollX}px`;
            }
        }
    }, [menuMode, editor, selectedOption]);

    // Reset selected option and search when menu mode changes
    useEffect(() => {
        setSelectedOption(null);
        setIntensity(undefined);
        setSearchQuery("");
    }, [menuMode]);

    // Auto-focus search input when menu opens
    useEffect(() => {
        if (!selectedOption && searchInputRef.current) {
            // Small delay to ensure the menu is rendered
            const timer = setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [selectedOption]);

    if (options.length === 0) return null;

    // If an option with intensity is selected, show intensity controls
    if (selectedOption && selectedOption.hasIntensity && selectedOption.intensityRange) {
        const currentIntensity = intensity ?? selectedOption.intensityRange.default;
        const { min, max, step } = selectedOption.intensityRange;

        return (
            <Portal>
                <Card
                    ref={ref}
                    className="absolute z-50 w-[320px] shadow-lg"
                    size="sm"
                >
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <CardTitle className="flex items-center gap-2">
                                {selectedOption.label}
                                <Badge variant="outline" className="text-[10px]">
                                    {selectedOption.category}
                                </Badge>
                            </CardTitle>
                            <Button
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => {
                                    setSelectedOption(null);
                                    setIntensity(undefined);
                                }}
                            >
                                <RiCloseLine className="size-4" />
                            </Button>
                        </div>
                        {selectedOption.description && (
                            <CardDescription>{selectedOption.description}</CardDescription>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                    {selectedOption.intensityLabel}
                                </span>
                                <Badge variant="secondary" className="font-mono">
                                    {selectedOption.category === "pause"
                                        ? `${currentIntensity}s`
                                        : currentIntensity}
                                </Badge>
                            </div>
                            <Slider
                                value={[currentIntensity]}
                                onValueChange={(val) => setIntensity(val[0])}
                                min={min}
                                max={max}
                                step={step}
                                className="w-full"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                                <span>{min}</span>
                                <span>{max}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => {
                                setSelectedOption(null);
                                setIntensity(undefined);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                                onSelect({
                                    label: selectedOption.label,
                                    intensity: currentIntensity
                                });
                                setSelectedOption(null);
                                setIntensity(undefined);
                            }}
                        >
                            Insert
                        </Button>
                    </CardFooter>
                </Card>
            </Portal>
        );
    }

    // Filter options by search query
    const filterOptionsBySearch = (utteranceOpt: UtteranceOption): boolean => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            utteranceOpt.label.toLowerCase().includes(query) ||
            utteranceOpt.description?.toLowerCase().includes(query) ||
            utteranceOpt.category.toLowerCase().includes(query)
        );
    };

    // Category component for rendering utterance groups
    const CategorySection = ({
        category,
        title,
    }: {
        category: "vocal" | "respiratory" | "pause";
        title: string;
    }) => {
        const categoryOptions = UTTERANCE_OPTIONS.filter(opt => opt.category === category);
        const visibleOptions = categoryOptions.filter(utteranceOpt =>
            options.findIndex(o => o.label === utteranceOpt.label) !== -1 &&
            filterOptionsBySearch(utteranceOpt)
        );

        if (visibleOptions.length === 0) return null;

        return (
            <div className="py-1">
                <div className="px-2 py-1.5">
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        {title}
                    </Badge>
                </div>
                <div className="space-y-0.5 px-1">
                    {visibleOptions.map((utteranceOpt) => {
                        const optionIndex = options.findIndex(o => o.label === utteranceOpt.label);
                        const isSelected = optionIndex === selectedIndex;

                        return (
                            <button
                                key={utteranceOpt.label}
                                className={cn(
                                    "w-full px-3 py-2 rounded-md text-sm flex items-center justify-between group transition-colors",
                                    isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-foreground"
                                )}
                                onClick={() => {
                                    if (utteranceOpt.hasIntensity) {
                                        setSelectedOption(utteranceOpt);
                                    } else {
                                        onSelect({ label: utteranceOpt.label });
                                    }
                                }}
                            >
                                <span className="font-medium">{utteranceOpt.label}</span>
                                {utteranceOpt.hasIntensity && (
                                    <RiArrowRightSLine
                                        className={cn(
                                            "size-4 transition-colors",
                                            isSelected
                                                ? "text-primary-foreground"
                                                : "text-muted-foreground group-hover:text-foreground"
                                        )}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Check if there are any visible options after filtering
    const hasVisibleOptions = UTTERANCE_OPTIONS.some(utteranceOpt =>
        options.findIndex(o => o.label === utteranceOpt.label) !== -1 &&
        filterOptionsBySearch(utteranceOpt)
    );

    // Default menu - list of options
    return (
        <Portal>
            <Card
                ref={ref}
                className="absolute z-50 w-[280px] shadow-lg flex flex-col overflow-hidden"
            >
                {/* Search Input - Fixed at top */}
                <div className="shrink-0 bg-card border-b p-2">
                    <div className="relative">
                        <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search enrichments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-sm"
                        />
                        {searchQuery && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
                                onClick={() => setSearchQuery("")}
                            >
                                <RiCloseLine className="size-3" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Scrollable content using ScrollArea */}
                <ScrollArea className="h-[400px]">
                    {hasVisibleOptions ? (
                        <div className="py-2">
                            <CategorySection category="vocal" title="Vocal" />
                            <Separator className="my-2" />
                            <CategorySection category="respiratory" title="Respiratory" />
                            <Separator className="my-2" />
                            <CategorySection category="pause" title="Pause" />
                        </div>
                    ) : (
                        <div className="py-8 px-4 text-center text-sm text-muted-foreground">
                            No enrichments found for &quot;{searchQuery}&quot;
                        </div>
                    )}
                </ScrollArea>
            </Card>
        </Portal>
    );
};
