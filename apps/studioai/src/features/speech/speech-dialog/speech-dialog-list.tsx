'use client';

import { useState } from 'react';
import { Descendant } from 'slate';
import { Button } from '@repo/ui-core/components/button';
import { RiAddLine, RiDeleteBinLine, RiLoader4Line, RiCheckLine } from '@remixicon/react';
import { cn } from '@repo/ui-core/lib/utils';

import { SpeechSegment as SpeechSegmentComponent } from '../speech-segment';
import { SpeechProvider } from '../speech-expression-selector/context';
import { SpeechExpressionSelector } from '../speech-expression-selector';
import { SpeechSegment } from './types';
import { SelectedExpression } from '../speech-expression-selector/types';

interface SpeechDialogListProps {
  segments: SpeechSegment[];
  onSegmentChange?: (segmentId: string, updates: Partial<SpeechSegment>) => void;
  onSegmentDelete?: (segmentId: string) => void;
  onSegmentCreate?: () => void;
  className?: string;
  readOnly?: boolean;
}

/**
 * Individual speech segment item component
 */
interface SpeechSegmentItemProps {
  segment: SpeechSegment & { _isSyncing?: boolean; _syncError?: boolean };
  onContentChange?: (content: Descendant[]) => void;
  onExpressionsChange?: (expressions: SelectedExpression[]) => void;
  onDelete?: () => void;
  readOnly?: boolean;
  showDelete?: boolean;
}

const SpeechSegmentItem: React.FC<SpeechSegmentItemProps> = ({
  segment,
  onContentChange,
  onExpressionsChange,
  onDelete,
  readOnly = false,
  showDelete = true,
}) => {
  const handleContentChange = (content: Descendant[]) => {
    if (onContentChange) {
      onContentChange(content);
    }
  };

  const handleExpressionChange = (expressions: SelectedExpression[]) => {
    if (onExpressionsChange) {
      onExpressionsChange(expressions);
    }
  };

  return (
    <div className={cn('relative', segment.config.highlighted && 'ring-2 ring-primary/20 rounded-lg p-2')}>
      <SpeechSegmentComponent.Root>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <SpeechSegmentComponent.Timestamp seconds={segment.timestamp} />

            <SpeechProvider initialItems={segment.expressions}>
              <SpeechExpressionSelector
                onChange={(expression) => {
                  if (!readOnly) {
                    handleExpressionChange(expression);
                  }
                }}
              />
            </SpeechProvider>

            {segment.config.tags && segment.config.tags.length > 0 && (
              <div className="flex gap-1">
                {segment.config.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <SpeechSegmentComponent.PlayButton
              onClick={() => {
                console.log('Play segment:', segment.id);
              }}
            />

            {segment._isSyncing ? (
              <div className="flex items-center text-muted-foreground mr-1 h-8 px-2" title="Syncing...">
                <RiLoader4Line className="size-4 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center text-emerald-500/70 mr-1 h-8 px-2" title="Saved">
                <RiCheckLine className="size-4" />
              </div>
            )}

            {showDelete && !readOnly && !segment._isSyncing && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onDelete}
                aria-label="Delete segment"
              >
                <RiDeleteBinLine className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-start w-full">
          <SpeechSegmentComponent.Indent />
          <div className="min-w-0 flex-1">
            <SpeechSegmentComponent.Text
              segment={segment.content}
              onChange={handleContentChange}
              readOnly={readOnly || segment.config.locked}
            />
          </div>
        </div>
      </SpeechSegmentComponent.Root>
    </div>
  );
};

/**
 * Main speech dialog list component
 * Displays all speech segments for a script
 */
export const SpeechDialogList: React.FC<SpeechDialogListProps> = ({
  segments,
  onSegmentChange,
  onSegmentDelete,
  onSegmentCreate,
  className,
  readOnly = false,
}) => {
  const sortedSegments = [...segments].sort((a, b) => a.order - b.order);

  const handleContentChange = (segmentId: string, content: Descendant[]) => {
    if (onSegmentChange) {
      onSegmentChange(segmentId, { content });
    }
  };

  const handleExpressionsChange = (segmentId: string, expressions: SelectedExpression[]) => {
    if (onSegmentChange) {
      onSegmentChange(segmentId, { expressions });
    }
  };

  const handleDelete = (segmentId: string) => {
    if (onSegmentDelete) {
      onSegmentDelete(segmentId);
    }
  };

  const handleCreate = () => {
    if (onSegmentCreate) {
      onSegmentCreate();
    }
  };

  if (segments.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">No speech segments yet</p>
          {!readOnly && (
            <Button onClick={handleCreate} variant="outline">
              <RiAddLine className="mr-2 size-4" />
              Create First Segment
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Add segment button - top */}
      {!readOnly && (
        <div className="mb-6">
          <Button onClick={handleCreate} variant="outline" className="w-full">
            <RiAddLine className="mr-2 size-4" />
            Add Segment
          </Button>
        </div>
      )}

      {/* Segments list */}
      <div className="space-y-12">
        {sortedSegments.map((segment) => (
          <SpeechSegmentItem
            key={segment.id}
            segment={segment}
            onContentChange={(content) => handleContentChange(segment.id, content)}
            onExpressionsChange={(expressions) => handleExpressionsChange(segment.id, expressions)}
            onDelete={() => handleDelete(segment.id)}
            readOnly={readOnly}
            showDelete={sortedSegments.length > 1}
          />
        ))}
      </div>

      {/* Add segment button - bottom */}
      {!readOnly && (
        <div className="mt-6">
          <Button onClick={handleCreate} variant="outline" className="w-full">
            <RiAddLine className="mr-2 size-4" />
            Add Segment
          </Button>
        </div>
      )}
    </div>
  );
};
