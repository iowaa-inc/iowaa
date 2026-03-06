
export const ENRICHMENT_TYPE = "enrichment";

export const HIGHLIGHT_ENRICHMENT_TYPE = "highlight-enrichment";

// Utterance categories with their options
export type UtteranceCategory = "vocal" | "respiratory" | "pause";

export interface UtteranceOption {
    label: string;
    category: UtteranceCategory;
    description?: string;
    hasIntensity: boolean; // Whether this utterance supports intensity control
    intensityLabel?: string; // Label for the intensity control (e.g., "Duration", "Intensity", "Volume")
    intensityRange?: { min: number; max: number; default: number; step: number };
}

export const UTTERANCE_OPTIONS: UtteranceOption[] = [
    // Vocal utterances
    {
        label: "Laughter",
        category: "vocal",
        description: "Natural laughing sound",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Chuckle",
        category: "vocal",
        description: "Quiet, brief laugh",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Giggle",
        category: "vocal",
        description: "Light, nervous laugh",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Sigh",
        category: "vocal",
        description: "Audible exhalation expressing emotion",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Gasp",
        category: "vocal",
        description: "Sharp intake of breath",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Groan",
        category: "vocal",
        description: "Sound of discomfort or disapproval",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Hmm",
        category: "vocal",
        description: "Thinking or contemplative sound",
        hasIntensity: false,
    },
    {
        label: "Uh-huh",
        category: "vocal",
        description: "Affirmative acknowledgment",
        hasIntensity: false,
    },
    {
        label: "Mm-hmm",
        category: "vocal",
        description: "Agreement or acknowledgment",
        hasIntensity: false,
    },
    {
        label: "Uh",
        category: "vocal",
        description: "Hesitation or filler",
        hasIntensity: false,
    },
    {
        label: "Um",
        category: "vocal",
        description: "Hesitation or thinking",
        hasIntensity: false,
    },
    {
        label: "Er",
        category: "vocal",
        description: "Hesitation",
        hasIntensity: false,
    },
    {
        label: "Ah",
        category: "vocal",
        description: "Realization or understanding",
        hasIntensity: false,
    },
    {
        label: "Oh",
        category: "vocal",
        description: "Surprise or realization",
        hasIntensity: false,
    },
    {
        label: "Whimper",
        category: "vocal",
        description: "Soft crying or complaining sound",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Whistle",
        category: "vocal",
        description: "Whistling sound",
        hasIntensity: true,
        intensityLabel: "Volume",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Tsk",
        category: "vocal",
        description: "Disapproval or annoyance click",
        hasIntensity: false,
    },
    {
        label: "Shush",
        category: "vocal",
        description: "Quieting sound",
        hasIntensity: true,
        intensityLabel: "Volume",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },

    // Respiratory utterances
    {
        label: "Breath",
        category: "respiratory",
        description: "Natural breathing sound",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Inhale",
        category: "respiratory",
        description: "Audible breath in",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Exhale",
        category: "respiratory",
        description: "Audible breath out",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Cough",
        category: "respiratory",
        description: "Coughing sound",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Sniff",
        category: "respiratory",
        description: "Sniffing sound",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 2, step: 1 },
    },
    {
        label: "Sneeze",
        category: "respiratory",
        description: "Sneezing sound",
        hasIntensity: true,
        intensityLabel: "Intensity",
        intensityRange: { min: 1, max: 5, default: 4, step: 1 },
    },
    {
        label: "Clear Throat",
        category: "respiratory",
        description: "Throat clearing sound",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },
    {
        label: "Yawn",
        category: "respiratory",
        description: "Yawning sound",
        hasIntensity: true,
        intensityLabel: "Audibility",
        intensityRange: { min: 1, max: 5, default: 3, step: 1 },
    },

    // Pause utterances
    {
        label: "Pause",
        category: "pause",
        description: "Brief silence",
        hasIntensity: true,
        intensityLabel: "Duration",
        intensityRange: { min: 0.25, max: 3, default: 0.5, step: 0.25 },
    },
    {
        label: "Long Pause",
        category: "pause",
        description: "Extended silence",
        hasIntensity: true,
        intensityLabel: "Duration",
        intensityRange: { min: 1, max: 5, default: 2, step: 0.5 },
    },
];

// For backward compatibility with existing code
export const ENRICHMENT_OPTIONS = UTTERANCE_OPTIONS.map(opt => ({ label: opt.label }));
