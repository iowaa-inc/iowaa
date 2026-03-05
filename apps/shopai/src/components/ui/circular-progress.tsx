import * as React from 'react';

import { cn } from '@/lib/utils';

type CircularProgressBaseProps = {
  /** Progress value. 0-100 (can exceed 100 for overflow). */
  value: number;
  /** Range maximum (default 100 for percent). */
  max?: number;
  /** Circle size in pixels (default 56). */
  size?: number;
  /** Stroke width for circles (default 3). */
  strokeWidth?: number;
  /** Color class for progress. */
  colorClassName?: string;
  /** Show numeric value in center if no children. */
  showValue?: boolean;
  /** ARIA label for accessibility. */
  'aria-label'?: string;
};

type CircularProgressProps = CircularProgressBaseProps &
  React.HTMLAttributes<HTMLDivElement> & {
    /** Custom center content (default: % numeric) */
    children?: React.ReactNode;
    /** Class for SVG element */
    svgClassName?: string;
    /** Class for inner content */
    contentClassName?: string;
  };

// Utility for default coloring (adapt as needed)
export const getDefaultColorClass = (value: number, max: number) => {
  const percent = (value / max) * 100;
  if (percent >= 100) return 'text-green-600';
  if (percent >= 80) return 'text-blue-600';
  if (percent >= 60) return 'text-yellow-600';
  return 'text-orange-600';
};

/**
 * CircularProgress
 * @description
 * Accessible, flexible, and reusable circular progress indicator.
 * Animated transitions are enabled by default.
 */
const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps & { bgCircleClassName?: string }
>(
  (
    {
      value,
      max = 100,
      size = 56,
      strokeWidth = 3,
      colorClassName,
      children,
      className,
      svgClassName,
      contentClassName,
      bgCircleClassName, // new prop
      'aria-label': ariaLabel = 'progress',
      showValue = true,
      ...rest
    },
    ref,
  ) => {
    // Geometry calculations
    const r = size / 2 - strokeWidth / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circ = 2 * Math.PI * r;
    const percent = Math.max(0, Math.min(value / max, 1));
    const dash = circ * percent;
    const colorClass = colorClassName ?? getDefaultColorClass(value, max);
    const displayValue = Math.round((value / max) * 100);

    return (
      <div
        ref={ref}
        className={cn('relative', `size-[${size}px]`, className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        {...rest}
      >
        <svg
          className={cn(`size-[${size}px] -rotate-90`, svgClassName)}
          viewBox={`0 0 ${size} ${size}`}
          focusable="false"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            className={cn('stroke-muted', bgCircleClassName)}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            className={cn('stroke-current', 'transition-all duration-500', colorClass)}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash}, ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <span
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center',
            contentClassName,
          )}
        >
          {children ??
            (showValue ? (
              <span className={cn('text-xs font-bold', colorClass)}>{displayValue}%</span>
            ) : null)}
        </span>
      </div>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
