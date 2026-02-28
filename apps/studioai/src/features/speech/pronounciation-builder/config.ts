import { AvoidModule } from "./modules/avoid";
import { EmphasisModule } from "./modules/emphasis";
import { PronounceModule } from "./modules/pronounce";
import { RhymeModule } from "./modules/rhyme";
import { EffectType } from "./types";

export const EFFECT_OPTIONS: { label: string; value: EffectType }[] = [
    { label: 'Pronounce', value: 'pronounce' },
    { label: 'Rhyme', value: 'rhyme' },
    { label: 'Avoid', value: 'avoid' },
    { label: 'Emphasis', value: 'emphasis' },
]

export const EFFECT_STYLE_MAP: Record<string, string> = {
    pronounce: "bg-purple-100 border-purple-300 text-purple-900",
    rhyme: "bg-blue-100 border-blue-300 text-blue-900",
    avoid: "bg-pink-100 border-pink-300 text-pink-900",
    emphasis: "bg-yellow-100 border-yellow-300 text-yellow-900",
    default: "bg-gray-100 border-gray-300 text-gray-900",
};

export const EFFECT_BUILDER_REGISTRY = [
    PronounceModule,
    RhymeModule,
    AvoidModule,
    EmphasisModule
];
