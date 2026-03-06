import { Descendant } from 'slate';
import { SelectedExpression } from '../speech-expression-selector/types';

/**
 * Represents a single speech segment in the dialog
 * Each segment contains the text content, timing information,
 * and enrichment data for voice synthesis
 */
export interface SpeechSegment {
  id: string;
  script_id: string;
  order: number; // Position in the dialog sequence
  timestamp: number; // Start time in seconds
  duration?: number; // Duration in seconds (optional, can be calculated)

  // Content
  content: Descendant[]; // Slate.js document structure for rich text editing

  // Enrichment data - voice expression configurations
  expressions: SelectedExpression[]; // Selected voice expressions (emotion, pitch, speed, etc.)

  // Configuration
  config: SpeechSegmentConfig;

  // Metadata
  created_at: string;
  updated_at: string;
}

/**
 * Configuration options for a speech segment
 */
export interface SpeechSegmentConfig {
  // Playback settings
  autoPlay?: boolean;
  loop?: boolean;

  // Voice settings
  voiceId?: string; // Reference to a specific voice profile
  volume?: number; // 0-1 scale

  // Processing flags
  enabled?: boolean; // Whether this segment should be included in final output
  locked?: boolean; // Prevent editing

  // Visual settings
  highlighted?: boolean; // Highlight this segment in the UI
  color?: string; // Custom color for visual organization

  // Notes and metadata
  notes?: string; // Internal notes about this segment
  tags?: string[]; // Organizational tags
}

/**
 * Enrichment data that can be applied to text selections within a segment
 * This extends beyond segment-level expressions to inline enrichments
 */
export interface TextEnrichment {
  id: string;
  segment_id: string;

  // Text range this enrichment applies to
  startOffset: number;
  endOffset: number;

  // Enrichment type
  type: 'pronunciation' | 'emphasis' | 'pause' | 'phoneme' | 'custom';

  // Type-specific data
  data: PronunciationData | EmphasisData | PauseData | PhonemeData | Record<string, unknown>;

  created_at: string;
  updated_at: string;
}

/**
 * Pronunciation enrichment data
 */
export interface PronunciationData {
  phonetic: string; // IPA or custom phonetic representation
  alternatives?: string[]; // Alternative pronunciations
}

/**
 * Emphasis enrichment data
 */
export interface EmphasisData {
  level: 'strong' | 'moderate' | 'reduced' | 'none';
  type?: 'stress' | 'volume' | 'pitch';
}

/**
 * Pause enrichment data
 */
export interface PauseData {
  duration: number; // Duration in milliseconds
  type?: 'breath' | 'comma' | 'period' | 'dramatic';
}

/**
 * Phoneme enrichment data
 */
export interface PhonemeData {
  phoneme: string; // Specific phoneme symbol
  duration?: number; // Optional duration adjustment
}

/**
 * Complete speech dialog structure
 * Contains all segments in order
 */
export interface SpeechDialog {
  id: string;
  script_id: string;
  segments: SpeechSegment[];

  // Dialog-level metadata
  totalDuration?: number; // Total duration in seconds
  segmentCount: number;

  created_at: string;
  updated_at: string;
}

/**
 * Request type for creating a new speech segment
 */
export interface CreateSpeechSegmentRequest {
  id?: string;
  script_id: string;
  order?: number; // If not provided, will be appended to the end
  timestamp?: number; // If not provided, will be calculated based on previous segments
  content?: Descendant[]; // If not provided, will use empty content
  expressions?: SelectedExpression[];
  config?: Partial<SpeechSegmentConfig>;
}

/**
 * Request type for updating a speech segment
 */
export interface UpdateSpeechSegmentRequest {
  id: string;
  content?: Descendant[];
  expressions?: SelectedExpression[];
  config?: Partial<SpeechSegmentConfig>;
  timestamp?: number;
  order?: number;
}

/**
 * Request type for deleting a speech segment
 */
export interface DeleteSpeechSegmentRequest {
  id: string;
}

/**
 * Request type for reordering segments
 */
export interface ReorderSpeechSegmentsRequest {
  script_id: string;
  segmentOrders: Array<{ id: string; order: number }>;
}
