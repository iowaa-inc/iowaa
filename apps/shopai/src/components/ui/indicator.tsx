import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const indicatorVariants = cva('flex size-2 rounded-full', {
  variants: {
    variant: {
      neutral: 'bg-neutral-quaternary',
      dark: 'bg-zinc-900',
      brand: 'bg-primary',
      success: 'bg-green-500',
      danger: 'bg-red-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500',
      warning: 'bg-amber-400',
      teal: 'bg-teal-500',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export interface IndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof indicatorVariants> {}

export const Indicator = React.forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(indicatorVariants({ variant }), className)} {...props} />
  ),
);
Indicator.displayName = 'Indicator';
