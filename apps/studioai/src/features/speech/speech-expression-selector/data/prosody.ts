/**
 * Structured list of Prosody options with descriptions.
 * Organized by physical property for flexible UI presentation.
 */

export type ProsodyProperty = "speed" | "pitch" | "volume" | "intonation" | "timbre";

export interface ProsodyOption {
    label: string;
    value: string;
    description: string;
}

export type ProsodyOptionsMap = {
    [K in ProsodyProperty]: ProsodyOption[];
};

export const PROSODY_OPTIONS: ProsodyOptionsMap = {
    speed: [
        {
            label: "Very Slow",
            value: "rate_0.5",
            description: "Dragging, emphatic, or confused. (0.5x)"
        },
        {
            label: "Slow",
            value: "rate_0.8",
            description: "Deliberate, calm, or sad. (0.8x)"
        },
        {
            label: "Normal",
            value: "rate_1.0",
            description: "Conversational pace. (1.0x)"
        },
        {
            label: "Fast",
            value: "rate_1.2",
            description: "Energetic, hurried, or excited. (1.2x - ~160wpm)"
        },
        {
            label: "Rapid",
            value: "rate_1.5",
            description: "Frantic, legal disclaimer style. (1.5x)"
        },
    ],
    pitch: [
        {
            label: "Deep / Low",
            value: "pitch_low",
            description: "Authoritative, serious, or ominous."
        },
        {
            label: "Normal",
            value: "pitch_default",
            description: "The voice's natural baseline."
        },
        {
            label: "High",
            value: "pitch_high",
            description: "Youthful, tense, or surprised."
        },
        {
            label: "Variable",
            value: "pitch_dynamic",
            description: "Highly expressive, lots of range (Storytelling)."
        },
        {
            label: "Monotone",
            value: "pitch_flat",
            description: "Robotic, bored, or deadpan."
        },
    ],
    volume: [
        {
            label: "Whisper",
            value: "vol_whisper",
            description: "Breath-heavy, minimal vocal cord vibration."
        },
        {
            label: "Soft",
            value: "vol_soft",
            description: "Quiet conversation, intimate."
        },
        {
            label: "Normal",
            value: "vol_default",
            description: "Standard speaking volume."
        },
        {
            label: "Loud",
            value: "vol_loud",
            description: "Projecting to a room, confident."
        },
        {
            label: "Shouting",
            value: "vol_shout",
            description: "Maximum intensity (often distorts)."
        },
    ],
    intonation: [
        {
            label: "Statement (Falling)",
            value: "contour_falling",
            description: "Pitch drops at the end. Finality, certainty."
        },
        {
            label: "Question (Rising)",
            value: "contour_rising",
            description: "Pitch goes up at the end. Uncertainty, asking."
        },
        {
            label: "Suspense (Flat/Hover)",
            value: "contour_suspend",
            description: "Pitch stays middle. \"Wait for it...\""
        },
        {
            label: "Up-speak",
            value: "contour_uptalk",
            description: "Ending sentences like questions (Millennial/Gen Z style)."
        },
    ],
    timbre: [
        {
            label: "Breathy",
            value: "timbre_breathy",
            description: "Airy, relaxed, or seductive."
        },
        {
            label: "Crisp",
            value: "timbre_crisp",
            description: "Sharp articulation, news anchor style."
        },
        {
            label: "Gravelly",
            value: "timbre_fry",
            description: "Rough texture, vocal fry."
        },
        {
            label: "Strained",
            value: "timbre_tense",
            description: "Tight throat, sounding stressed or choked up."
        },
    ]
};
