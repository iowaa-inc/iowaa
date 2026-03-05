import { CircularProgress, getDefaultColorClass } from '@/components/ui/circular-progress';

import { cn } from '@/lib/utils';

interface ListingQualityIndicatorProps {
  value: number;
}

function getScoreLabel(score: number): string {
  if (score >= 100) return 'Excellent';
  if (score >= 80) return 'Great';
  if (score >= 60) return 'Good';
  return 'Needs improvement';
}

export function ListingQualityIndicator({ value }: ListingQualityIndicatorProps) {
  return (
    <div className="flex items-center gap-4">
      <CircularProgress value={value} strokeWidth={5} className="size-14" />
      <div className="flex flex-col">
        <span className="text-muted-foreground text-sm">Listing Quality</span>
        <span className={cn('text-sm font-semibold', getDefaultColorClass(value, 100))}>
          {getScoreLabel(value)}
        </span>
      </div>
    </div>
  );
}
