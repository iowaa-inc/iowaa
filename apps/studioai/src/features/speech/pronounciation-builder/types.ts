import type { ReactNode } from "react";

export type EffectType = "pronounce" | "rhyme" | "avoid" | "emphasis";

export interface BuilderItem {
    type: EffectType;  // The effect type (e.g., "pronounce")
    values: Record<string, string>; // Relevant effect values/config
}

export interface GlobalEffectRenderProps {
    values: Record<string, string>;
    onRemove: () => void,
    onAdd: () => void,
    onPlay: () => void,
    onChange: (key: string, val: string) => void,
}

export interface PronounciationBuilderEffectModule {
    type: EffectType;
    label: string;
    icon?: ReactNode;
    render: (props: GlobalEffectRenderProps) => ReactNode;
}
