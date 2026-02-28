import React from "react";

import { GenderSelection } from "./modules/gender-selection";
import { AgeRange } from "./modules/age-range";
import { AccentBlend } from "./modules/accent-blend";
import { AuthenticityMarkers } from "./modules/authenticity-markers";
import { BreathHandling } from "./modules/breath-handling";
import { CodeSwitching } from "./modules/code-switching";
import { DefaultTemperament } from "./modules/default-temperament";
import { EmotionalVibe } from "./modules/emotional-vibe";
import { EmphasisStyle } from "./modules/emphasis-style";
import { EnunciationStyle } from "./modules/enunciation-style";
import { GlottalFry } from "./modules/glottal-fry-settings";
import { IntonationRules } from "./modules/intonation-rules";
import { LanguageSelection } from "./modules/language-selection";
import { MicroArticulation } from "./modules/micro-articulation";
import { MicProximity } from "./modules/microphone-proximity";
import { PacingStrategy } from "./modules/pacing-strategy";
import { PausePatterns } from "./modules/pause-patterns";
import { ProjectionStyle } from "./modules/projection-style";
import { ProsodyIntonation } from "./modules/prosody-intonation";
import { Region } from "./modules/region";
import { Register } from "./modules/register";
import { Resonance } from "./modules/resonance";
import { Rhoticity } from "./modules/rhoticity";
import { Rhythm } from "./modules/rhythm";
import { RoomTone } from "./modules/room-tone";
import { SibilanceControl } from "./modules/sibilance-control";
import { SignalCleanliness } from "./modules/signal-cleanliness";
import { SpeedTempo } from "./modules/speed-tempo";
import { SubRegion } from "./modules/sub-region";
import { TechnicalPrecision } from "./modules/technical-precision";
import { UndesiredToneMarkers } from "./modules/undesired-tone-markers";
import { VocalTexture } from "./modules/vocal-texture";
import { VoiceQuality } from "./modules/voice-quality-archetype";
import { VowelQuality } from "./modules/vowel-quality";
import { WarmthGradient } from "./modules/warmth-gradient";

export type VoiceProfileModule = {
    key: string;
    label: string;
    description: string;
    render: () => React.ReactElement;
};

export type VoiceProfileModuleOptionGroup = {
    name: string;
    description: string;
    options: VoiceProfileModule[];
};

export type VoiceProfileModuleRegistryEntry = {
    name: string;
    options: VoiceProfileModuleOptionGroup[];
};

export const voiceProfileModuleRegistry: VoiceProfileModuleRegistryEntry[] = [
    {
        name: "Identity",
        options: [
            {
                name: "Core Identity",
                description: "Core characteristics such as gender, age, voice quality, and resonance.",
                options: [
                    GenderSelection,
                    AgeRange,
                    VoiceQuality,
                    Resonance,
                ],
            },
            {
                name: "Cultural & Linguistic Base",
                description: "Defines the language, regional background, and accent blend.",
                options: [
                    LanguageSelection,
                    Region,
                    SubRegion,
                    AccentBlend,
                ],
            },
            {
                name: "Socio-Linguistics",
                description: "Sociolinguistic markers including register, code-switching, and authenticity.",
                options: [
                    Register,
                    CodeSwitching,
                    AuthenticityMarkers,
                ],
            },
            {
                name: "Phonetic Settings",
                description: "Detailed phonetic and articulation features.",
                options: [
                    VowelQuality,
                    ProsodyIntonation,
                    Rhoticity,
                    MicroArticulation,
                    BreathHandling,
                ],
            },
        ],
    },
    {
        name: "Performance",
        options: [
            {
                name: "Performance & Prosody",
                description: "Performance-related features: emotion, pacing, intonation, rhythm, and emphasis.",
                options: [
                    EmotionalVibe,
                    PacingStrategy,
                    EnunciationStyle,
                    SpeedTempo,
                    IntonationRules,
                    Rhythm,
                    EmphasisStyle,
                    PausePatterns,
                ],
            },
            {
                name: "Texture & Resonance",
                description: "Refined features for vocal texture and secondary resonance characteristics.",
                options: [
                    VocalTexture,
                    GlottalFry,
                    SibilanceControl,
                ],
            },
            {
                name: "Emotional Baseline",
                description: "The baseline emotional state and projection style.",
                options: [
                    DefaultTemperament,
                    WarmthGradient,
                    ProjectionStyle,
                ],
            },
            {
                name: "Negative Constraints",
                description: "Attributes to avoid, and technical precision markers.",
                options: [
                    UndesiredToneMarkers,
                    TechnicalPrecision,
                ],
            },
        ],
    },
    {
        name: "Engineering",
        options: [
            {
                name: "Audio Engineering",
                description: "Audio engineering factors such as mic proximity, room tone, and signal cleanliness.",
                options: [
                    MicProximity,
                    RoomTone,
                    SignalCleanliness,
                ],
            },
        ],
    },
];