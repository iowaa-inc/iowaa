'use client'

import React, { useState, useEffect, ReactNode, useRef } from 'react'
import { RiAddLine, RiCloseLine } from '@remixicon/react'

import { Button } from '@repo/ui-core/components/button'
import { ScrollArea } from '@repo/ui-core/components/scroll-area'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor,
} from '@repo/ui-core/components/popover'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@repo/ui-core/components/dropdown-menu'

import { EFFECT_OPTIONS, EFFECT_BUILDER_REGISTRY } from './config'
import { EffectType, BuilderItem } from './types'
import type { Position } from '../tyoes'

// --- Types ---

interface SelectionText {
    text: string
    position: Position
}

interface PronunciationModalProps {
    selection: SelectionText | null
    onClose: () => void
    onApply: (data: BuilderItem[]) => void
    trigger?: ReactNode
    value?: BuilderItem[]     // <-- accept value as optional prop
}

// Helper: get module by type from EFFECT_BUILDER_REGISTRY
function getModuleByType(type: EffectType) {
    return EFFECT_BUILDER_REGISTRY.find((mod) => mod.type === type)
}

export function PronunciationModal({
    selection,
    onClose,
    onApply,
    trigger,
    value, // <-- accept value
}: PronunciationModalProps) {
    const [open, setOpen] = useState(false)
    const [builderItems, setBuilderItems] = useState<BuilderItem[]>([])
    const anchorRef = useRef<HTMLDivElement>(null)

    // Set builderItems from value prop when selection/value changes.
    useEffect(() => {
        if (selection) {
            setOpen(true)
            if (Array.isArray(value) && value.length > 0) {
                setBuilderItems(value)
            } else {
                setBuilderItems([])
            }
        } else {
            setOpen(false)
            setBuilderItems([])
        }
    }, [selection, value])

    if (!selection) return null

    // Position popover anchor at highlighted position
    const anchorStyle: React.CSSProperties = {
        position: 'absolute',
        left: selection.position.x,
        top: selection.position.y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 80,
    }

    // --- Actions ---
    const addEffect = (type: EffectType) => {
        setBuilderItems((prev) =>
            prev.some((item) => item.type === type)
                ? prev
                : [...prev, { type, values: {} }]
        )
    }

    const removeEffect = (type: EffectType) => {
        setBuilderItems((prev) => prev.filter((item) => item.type !== type))
    }

    // Given a builder type, update its values
    const updateEffectValues = (type: EffectType, key: string, value: string) => {
        setBuilderItems((prev) =>
            prev.map((item) =>
                item.type === type
                    ? { ...item, values: { ...item.values, [key]: value } }
                    : item
            )
        )
    }

    // Only show options not already in builderKeys
    const availableOptions = EFFECT_OPTIONS.filter(
        (opt) => !builderItems.some((item) => item.type === opt.value)
    )

    // Popover open/close by action
    const handlePopoverOpenChange = (next: boolean) => {
        if (!next) {
            setOpen(false)
            setTimeout(() => {
                onClose()
                setBuilderItems([])
            }, 150)
        } else {
            setOpen(true)
        }
    }

    // Construct data for onApply based on builderItems (with type & values)
    const handleApply = () => {
        onApply(builderItems)
        handlePopoverOpenChange(false)
    }

    return (
        <Popover open={open} onOpenChange={handlePopoverOpenChange}>
            <PopoverAnchor asChild>
                <div ref={anchorRef} style={anchorStyle} />
            </PopoverAnchor>
            {!!trigger && (
                <PopoverTrigger asChild>
                    {trigger}
                </PopoverTrigger>
            )}
            <PopoverContent
                side="bottom"
                align="center"
                sideOffset={8}
                className="max-w-[250px] p-0 overflow-hidden rounded-2xl border border-border/50 shadow-xl bg-background pointer-events-auto"
            >
                <div className="flex flex-col items-center w-full p-0 space-y-3 py-4">
                    <div className="flex flex-col items-center w-full px-4 space-y-3">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">Pronunciation</span>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="size-7.5"
                                onClick={() => handlePopoverOpenChange(false)}
                            >
                                <RiCloseLine size={20} />
                            </Button>
                        </div>
                        <div className="w-full bg-background border border-dashed p-3 rounded-xl flex justify-center">
                            <span className="font-medium text-muted-foreground text-sm">{selection.text}</span>
                        </div>
                    </div>
                    {builderItems.length > 0 && (
                        <ScrollArea
                            className="mb-0 w-full flex flex-col gap-0 items-center max-h-[240px] px-4 space-y-3"
                        >
                            <div className="flex flex-col w-full">
                                {builderItems.map((item, index) => {
                                    const Module = getModuleByType(item.type)
                                    if (!Module) return null

                                    return (
                                        <React.Fragment key={item.type}>
                                            {index > 0 && (
                                                <div className="h-px w-full bg-border/60 my-4 relative flex justify-center">
                                                    <span className="text-[10px] text-muted-foreground/50 absolute -top-2 bg-background px-1">
                                                        |
                                                    </span>
                                                </div>
                                            )}
                                            <div className="w-full relative group">
                                                {/* Render the effect builder UI via module 'render' implementation */}
                                                {Module.render({
                                                    values: item.values,
                                                    onAdd: () => { /* optional: stubbed */ },
                                                    onRemove: () => removeEffect(item.type),
                                                    onPlay: () => { },
                                                    onChange: (key: string, value: string) => {
                                                        updateEffectValues(item.type, key, value)
                                                    },
                                                })}
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    )}
                    {availableOptions.length > 0 && (
                        <div className={builderItems.length > 0 ? "pt-1" : ""}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="mt-4 rounded-full"
                                    >
                                        <RiAddLine size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" className="w-40">
                                    {availableOptions.map((opt) => (
                                        <DropdownMenuItem
                                            key={opt.value}
                                            onClick={() => addEffect(opt.value)}
                                            className="cursor-pointer"
                                        >
                                            {opt.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                    {builderItems.length > 0 && (
                        <div className="flex flex-col items-center w-full px-4 space-y-3 mt-1">
                            <div className="w-full pt-4 border-t border-border/40">
                                <Button onClick={handleApply} className="w-full">
                                    Apply effect
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}