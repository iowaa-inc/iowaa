import { Descendant } from 'slate';
import { SpeechSegment, SpeechSegmentConfig } from './types';
import { SelectedExpression } from '../speech-expression-selector/types';

/**
 * Generates a unique ID for mock data
 */
function generateId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Default configuration for speech segments
 */
const DEFAULT_CONFIG: SpeechSegmentConfig = {
  enabled: true,
  locked: false,
  highlighted: false,
  autoPlay: false,
  loop: false,
  volume: 1.0,
  tags: [],
};

/**
 * Sample text content for different dialog scenarios
 */
const SAMPLE_TEXTS = {
  greeting: "Well, I wasn't sure if you wanted coffee or tea, so I brought both, just in case.",
  response: "Oh, thank you! That's so thoughtful of you. Honestly, either is fine—it's been a long morning already!",
  suggestion: "I get it. Want to sit by the window? The light's really nice right now.",
  excitement: "This is absolutely incredible! I can't believe we finally made it happen!",
  concern: "I'm a bit worried about the timeline. Do you think we can realistically meet this deadline?",
  explanation: "Let me walk you through this step by step. First, we need to understand the core principles.",
};

/**
 * Sample expression configurations
 */
const EXPRESSION_PRESETS = {
  neutral: [
    { id: generateId(), moduleId: 'speed', prefix: 'Speak', value: 'rate_1.0' },
    { id: generateId(), moduleId: 'emotion', prefix: 'Convey', value: 'neutral' },
    { id: generateId(), moduleId: 'pitch', prefix: 'With', value: 'pitch_default' },
    { id: generateId(), moduleId: 'volume', prefix: 'Speak', value: 'vol_default' },
  ] as SelectedExpression[],

  excited: [
    { id: generateId(), moduleId: 'speed', prefix: 'Speak', value: 'rate_1.2' },
    { id: generateId(), moduleId: 'emotion', prefix: 'Convey', value: 'excited' },
    { id: generateId(), moduleId: 'pitch', prefix: 'With', value: 'pitch_high' },
    { id: generateId(), moduleId: 'volume', prefix: 'Speak', value: 'vol_loud' },
  ] as SelectedExpression[],

  calm: [
    { id: generateId(), moduleId: 'speed', prefix: 'Speak', value: 'rate_0.9' },
    { id: generateId(), moduleId: 'emotion', prefix: 'Convey', value: 'calm' },
    { id: generateId(), moduleId: 'pitch', prefix: 'With', value: 'pitch_low' },
    { id: generateId(), moduleId: 'timbre', prefix: 'With', value: 'timbre_breathy' },
    { id: generateId(), moduleId: 'volume', prefix: 'Speak', value: 'vol_soft' },
  ] as SelectedExpression[],

  concerned: [
    { id: generateId(), moduleId: 'speed', prefix: 'Speak', value: 'rate_0.95' },
    { id: generateId(), moduleId: 'emotion', prefix: 'Convey', value: 'concerned' },
    { id: generateId(), moduleId: 'pitch', prefix: 'With', value: 'pitch_default' },
    { id: generateId(), moduleId: 'intonation', prefix: 'Speak', value: 'contour_rising' },
  ] as SelectedExpression[],

  professional: [
    { id: generateId(), moduleId: 'speed', prefix: 'Speak', value: 'rate_1.0' },
    { id: generateId(), moduleId: 'emotion', prefix: 'Convey', value: 'neutral' },
    { id: generateId(), moduleId: 'pitch', prefix: 'With', value: 'pitch_default' },
    { id: generateId(), moduleId: 'timbre', prefix: 'With', value: 'timbre_clear' },
  ] as SelectedExpression[],
};

/**
 * Converts text to Slate.js Descendant format
 */
function textToDescendant(text: string): Descendant[] {
  return [
    {
      type: 'paragraph',
      children: [{ text }],
    },
  ];
}

/**
 * Creates a mock speech segment
 */
export function createMockSegment(
  scriptId: string,
  order: number,
  options?: {
    text?: string;
    timestamp?: number;
    expressions?: SelectedExpression[];
    config?: Partial<SpeechSegmentConfig>;
  }
): SpeechSegment {
  const now = new Date().toISOString();
  const text = options?.text || SAMPLE_TEXTS.greeting;

  return {
    id: generateId(),
    script_id: scriptId,
    order,
    timestamp: options?.timestamp ?? order * 5, // Default: 5 seconds per segment
    duration: undefined,
    content: textToDescendant(text),
    expressions: options?.expressions || EXPRESSION_PRESETS.neutral,
    config: { ...DEFAULT_CONFIG, ...options?.config },
    created_at: now,
    updated_at: now,
  };
}

/**
 * Creates a full conversation with multiple segments
 */
export function createMockConversation(scriptId: string): SpeechSegment[] {
  return [
    createMockSegment(scriptId, 0, {
      text: SAMPLE_TEXTS.greeting,
      timestamp: 0,
      expressions: EXPRESSION_PRESETS.neutral,
      config: { tags: ['conversation', 'opening'] },
    }),
    createMockSegment(scriptId, 1, {
      text: SAMPLE_TEXTS.response,
      timestamp: 6,
      expressions: EXPRESSION_PRESETS.calm,
      config: { tags: ['conversation', 'response'] },
    }),
    createMockSegment(scriptId, 2, {
      text: SAMPLE_TEXTS.suggestion,
      timestamp: 14,
      expressions: EXPRESSION_PRESETS.neutral,
      config: { tags: ['conversation', 'suggestion'] },
    }),
  ];
}

/**
 * Creates a presentation-style dialog
 */
export function createMockPresentation(scriptId: string): SpeechSegment[] {
  return [
    createMockSegment(scriptId, 0, {
      text: "Welcome everyone! Today we're going to explore some exciting new features.",
      timestamp: 0,
      expressions: EXPRESSION_PRESETS.professional,
      config: { tags: ['presentation', 'intro'], highlighted: true },
    }),
    createMockSegment(scriptId, 1, {
      text: SAMPLE_TEXTS.explanation,
      timestamp: 8,
      expressions: EXPRESSION_PRESETS.professional,
      config: { tags: ['presentation', 'explanation'] },
    }),
    createMockSegment(scriptId, 2, {
      text: SAMPLE_TEXTS.excitement,
      timestamp: 18,
      expressions: EXPRESSION_PRESETS.excited,
      config: { tags: ['presentation', 'conclusion'] },
    }),
  ];
}

/**
 * Creates an empty segment template
 */
export function createEmptySegment(scriptId: string, order: number, timestamp: number): SpeechSegment {
  const now = new Date().toISOString();

  return {
    id: generateId(),
    script_id: scriptId,
    order,
    timestamp,
    duration: undefined,
    content: textToDescendant(''),
    expressions: EXPRESSION_PRESETS.neutral,
    config: DEFAULT_CONFIG,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Export presets and utilities
 */
export const MockDataUtils = {
  generateId,
  textToDescendant,
  createMockSegment,
  createMockConversation,
  createMockPresentation,
  createEmptySegment,
  SAMPLE_TEXTS,
  EXPRESSION_PRESETS,
  DEFAULT_CONFIG,
};
