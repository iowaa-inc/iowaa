# Speech Dialog Module

This module provides a complete data structure and UI components for managing speech segments in the StudioAI workspace.

## Overview

The Speech Dialog module allows users to create, edit, and manage speech segments that form a complete dialog or script. Each segment contains:

- **Text content**: Editable rich text using Slate.js
- **Expressions**: Voice configuration (emotion, pitch, speed, volume, etc.)
- **Configuration**: Segment-specific settings (timestamps, tags, highlighting)
- **Enrichments**: Advanced text-level annotations (pronunciation, emphasis, pauses)

## File Structure

```
speech-dialog/
├── types.ts                    # TypeScript type definitions
├── mock-data.ts               # Mock data utilities for testing
├── speech-dialog-list.tsx     # Main UI component
├── index.ts                   # Module exports
└── README.md                  # This file
```

## Data Structure

### SpeechSegment

The core data structure representing a single speech segment:

```typescript
interface SpeechSegment {
  id: string;
  script_id: string;
  order: number;              // Position in sequence
  timestamp: number;          // Start time in seconds
  duration?: number;          // Duration in seconds
  content: Descendant[];      // Slate.js rich text content
  expressions: SelectedExpression[];  // Voice configurations
  config: SpeechSegmentConfig;
  created_at: string;
  updated_at: string;
}
```

### SpeechSegmentConfig

Configuration options for each segment:

```typescript
interface SpeechSegmentConfig {
  enabled?: boolean;          // Include in output
  locked?: boolean;           // Prevent editing
  highlighted?: boolean;      // Visual emphasis
  color?: string;            // Custom color
  notes?: string;            // Internal notes
  tags?: string[];           // Organization tags
  voiceId?: string;          // Voice profile
  volume?: number;           // Volume (0-1)
  autoPlay?: boolean;        // Auto-play setting
  loop?: boolean;            // Loop setting
}
```

### TextEnrichment

Advanced enrichments for text selections within segments:

```typescript
interface TextEnrichment {
  id: string;
  segment_id: string;
  startOffset: number;
  endOffset: number;
  type: 'pronunciation' | 'emphasis' | 'pause' | 'phoneme' | 'custom';
  data: PronunciationData | EmphasisData | PauseData | PhonemeData | Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
```

## Components

### SpeechDialogList

Main component for displaying and managing speech segments.

**Props:**

```typescript
interface SpeechDialogListProps {
  segments: SpeechSegment[];
  onSegmentChange?: (segmentId: string, updates: Partial<SpeechSegment>) => void;
  onSegmentDelete?: (segmentId: string) => void;
  onSegmentCreate?: () => void;
  className?: string;
  readOnly?: boolean;
}
```

**Usage:**

```tsx
import { SpeechDialogList, SpeechSegment, MockDataUtils } from '@/features/speech/speech-dialog';

function MyComponent() {
  const [segments, setSegments] = useState<SpeechSegment[]>(
    MockDataUtils.createMockConversation('script-id')
  );

  const handleSegmentChange = (segmentId: string, updates: Partial<SpeechSegment>) => {
    setSegments(prev =>
      prev.map(segment =>
        segment.id === segmentId ? { ...segment, ...updates } : segment
      )
    );
  };

  const handleSegmentDelete = (segmentId: string) => {
    setSegments(prev => prev.filter(s => s.id !== segmentId));
  };

  const handleSegmentCreate = () => {
    const newSegment = MockDataUtils.createEmptySegment('script-id', segments.length, 0);
    setSegments(prev => [...prev, newSegment]);
  };

  return (
    <SpeechDialogList
      segments={segments}
      onSegmentChange={handleSegmentChange}
      onSegmentDelete={handleSegmentDelete}
      onSegmentCreate={handleSegmentCreate}
    />
  );
}
```

## Mock Data Utilities

The `mock-data.ts` file provides utilities for generating test data:

### Available Functions

- `createMockSegment()` - Create a single segment with custom options
- `createMockConversation()` - Generate a 3-segment conversation
- `createMockPresentation()` - Generate a presentation-style dialog
- `createEmptySegment()` - Create an empty segment template
- `textToDescendant()` - Convert plain text to Slate.js format

### Expression Presets

Pre-configured voice expressions for different moods:

- `EXPRESSION_PRESETS.neutral` - Default neutral voice
- `EXPRESSION_PRESETS.excited` - High energy, faster pace
- `EXPRESSION_PRESETS.calm` - Relaxed, slower pace
- `EXPRESSION_PRESETS.concerned` - Worried tone
- `EXPRESSION_PRESETS.professional` - Clear, professional delivery

### Example: Creating Custom Mock Data

```typescript
import { MockDataUtils } from '@/features/speech/speech-dialog';

const customSegment = MockDataUtils.createMockSegment('script-id', 0, {
  text: 'Hello, world!',
  timestamp: 0,
  expressions: MockDataUtils.EXPRESSION_PRESETS.excited,
  config: {
    tags: ['greeting', 'intro'],
    highlighted: true,
  },
});
```

## Features

### ✅ Implemented

- **Complete Type System**: Comprehensive TypeScript types for all data structures
- **Mock Data Generation**: Flexible utilities for testing with realistic data
- **Speech Segment UI**: Component for displaying individual segments
- **Speech Dialog List**: List component with create/delete functionality
- **Expression Integration**: Full integration with existing SpeechExpressionSelector
- **Visual Indicators**: Timestamps, tags, highlighting, and play buttons
- **State Management**: Local state management with callback handlers
- **Rich Text Editing**: Slate.js integration for text content

### 🔜 To Be Implemented

These features are defined in the type system but require backend implementation:

- **Database Schema**: Tables for `speech_segments` and `text_enrichments`
- **CRUD Operations**: Server actions for create, read, update, delete
- **Persistence**: Save/load segments from database
- **Real-time Updates**: Sync changes across clients
- **Reordering**: Drag-and-drop segment reordering
- **Audio Playback**: Actual audio synthesis and playback
- **Duration Calculation**: Automatic duration estimation
- **Text Enrichments**: UI for adding pronunciation, emphasis, pauses
- **Export**: Export to various audio/script formats

## Database Schema (To Be Implemented)

When ready to implement persistence, create these tables:

```sql
-- Speech segments table
CREATE TABLE speech_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id UUID NOT NULL REFERENCES scripts(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  duration INTEGER,
  content JSONB NOT NULL,
  expressions JSONB NOT NULL DEFAULT '[]',
  config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(script_id, order_index)
);

-- Text enrichments table
CREATE TABLE text_enrichments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_id UUID NOT NULL REFERENCES speech_segments(id) ON DELETE CASCADE,
  start_offset INTEGER NOT NULL,
  end_offset INTEGER NOT NULL,
  enrichment_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_speech_segments_script_id ON speech_segments(script_id);
CREATE INDEX idx_speech_segments_order ON speech_segments(script_id, order_index);
CREATE INDEX idx_text_enrichments_segment_id ON text_enrichments(segment_id);
```

## Testing

The current implementation uses mock data for testing:

1. Navigate to any script page: `/workspace/[project-id]/[script-id]`
2. You'll see a conversation with 3 pre-populated segments
3. Click "Add Segment" to create new segments
4. Click the delete button (trash icon) to remove segments
5. Edit text content directly in the editor
6. Modify expressions using the expression selector
7. All changes are logged to the console

## Next Steps

1. **Review and Approve**: Review the data structure and UI implementation
2. **Database Implementation**: Create migration files with the schema above
3. **Server Actions**: Implement CRUD operations in `features/speech/speech-dialog/actions/`
4. **Hooks**: Create React hooks for data fetching (e.g., `use-speech-segments.ts`)
5. **Persistence**: Connect UI to backend through server actions
6. **Testing**: Add unit tests for utilities and integration tests for components

## Notes

- The `order` field is used for sorting segments in the correct sequence
- Timestamps are in seconds for easier calculations
- The `config` object is intentionally flexible for future extensibility
- Expression integration reuses the existing `SpeechExpressionSelector` component
- All handlers are callback-based for flexible state management patterns
