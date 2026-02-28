export interface EmotionOption {
    id: string;
    label: string;
    category: "basic" | "compound";
    description: string;
    icon?: string; // You can map Lucide icons here later
}

export const EMOTION_OPTIONS: EmotionOption[] = [
    // --- Basic Emotions (The Core 6 + Neutral) ---
    {
        id: "neutral",
        label: "Neutral",
        category: "basic",
        description: "Balanced, objective, and clear. Good for general narration.",
    },
    {
        id: "joy",
        label: "Joy",
        category: "basic",
        description: "Bright, smiling, and energetic. Good for positive news.",
    },
    {
        id: "sadness",
        label: "Sadness",
        category: "basic",
        description: "Lower pitch, slower pace, perhaps slightly trembling.",
    },
    {
        id: "anger",
        label: "Anger",
        category: "basic",
        description: "Forceful, sharp attacks, louder volume.",
    },
    {
        id: "fear",
        label: "Fear",
        category: "basic",
        description: "Breathier, faster pace, higher pitch, hesitant.",
    },
    {
        id: "disgust",
        label: "Disgust",
        category: "basic",
        description: "Sneering tone, drawn out syllables.",
    },
    {
        id: "surprise",
        label: "Surprise",
        category: "basic",
        description: "Sudden upward inflection, higher energy.",
    },

    // --- Compound/Complex Emotions (Nuanced & Professional) ---
    {
        id: "authority",
        label: "Authoritative",
        category: "compound",
        description: "Commanding, firm, and deep. (Confidence + Sternness)",
    },
    {
        id: "sarcasm",
        label: "Sarcastic",
        category: "compound",
        description: "Drawling, exaggerated pitch shifts. (Mockery + Disinterest)",
    },
    {
        id: "empathy",
        label: "Empathetic",
        category: "compound",
        description: "Soft, warm, and understanding. (Sadness + Warmth)",
    },
    {
        id: "excitement",
        label: "Excited",
        category: "compound",
        description: "High energy, fast pace, breathless. (Joy + Anticipation)",
    },
    {
        id: "whisper",
        label: "Whisper",
        category: "compound",
        description: "Very soft, breathy, secretive. (Fear + Intimacy)",
    },
    {
        id: "terrified",
        label: "Terrified",
        category: "compound",
        description: "Extreme fear, shaky, perhaps screaming. (Fear + Shock)",
    },
    {
        id: "friendly",
        label: "Friendly",
        category: "compound",
        description: "Casual, inviting, and conversational. (Joy + Trust)",
    },
    {
        id: "professional",
        label: "Professional",
        category: "compound",
        description: "Crisp, articulate, and distant. (Neutral + Politeness)",
    },
    {
        id: "hopeful",
        label: "Hopeful",
        category: "compound",
        description: "Rising inflection, bright but soft. (Joy + Uncertainty)",
    },
];
