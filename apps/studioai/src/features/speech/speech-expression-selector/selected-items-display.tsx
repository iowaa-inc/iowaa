import React from "react";
import { RiCloseLine } from "@remixicon/react";
import { Badge } from "@repo/ui-core/components/badge";
import { ScrollArea, ScrollBar } from "@repo/ui-core/components/scroll-area";
import { SelectedExpression } from "./types";

interface SelectedItemsDisplayProps {
    selectedItems: SelectedExpression[];
    onRemove: (id: string) => void;
}

export function SelectedItemsDisplay({ selectedItems, onRemove }: SelectedItemsDisplayProps) {
    if (!selectedItems || selectedItems.length === 0) return null;

    return (
        <ScrollArea className="max-w-[350px] whitespace-nowrap">
            <div className="flex gap-2 items-center w-full pr-4 min-h-10">
                {selectedItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div className="flex items-center gap-2">
                            {item.prefix && (
                                <span className="text-muted-foreground text-sm font-medium">
                                    {item.prefix}
                                </span>
                            )}
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1 h-6 px-2 rounded-sm text-sm"
                            >
                                <span className="text-muted-foreground">{item.value}</span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(item.id);
                                    }}
                                    className="ml-1 rounded hover:text-destructive focus:outline-none"
                                    aria-label="Remove"
                                    tabIndex={0}
                                >
                                    <RiCloseLine size={14} />
                                </button>
                            </Badge>
                        </div>
                        {index < selectedItems.length - 1 && (
                            <span className="block bg-muted-foreground/30 rounded-full size-1 shrink-0"></span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
