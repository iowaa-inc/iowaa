'use client';

import { useTheme } from 'next-themes';

import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiLoaderLine,
} from '@remixicon/react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const statusColors = {
  success: 'text-green-600 dark:text-green-400',
  info: 'text-blue-600 dark:text-blue-400',
  warning: 'text-amber-600 dark:text-amber-300',
  error: 'text-red-600 dark:text-red-400',
  loading: 'text-muted-foreground dark:text-muted-foreground',
};

// We use tailwind color vars for background/text/border,
// but override icon color using Tailwind classes per status for both themes.
// The rest of the toast should retain your themed tokens.

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <RiCheckboxCircleLine className={`size-4 ${statusColors.success}`} />,
        info: <RiInformationLine className={`size-4 ${statusColors.info}`} />,
        warning: <RiErrorWarningLine className={`size-4 ${statusColors.warning}`} />,
        error: <RiCloseCircleLine className={`size-4 ${statusColors.error}`} />,
        loading: <RiLoaderLine className={`size-4 animate-spin ${statusColors.loading}`} />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'cn-toast [&[data-status=success]]:border-green-400 dark:[&[data-status=success]]:border-green-600 [&[data-status=success]]:bg-green-50 dark:[&[data-status=success]]:bg-green-950/40 ' +
            '[&[data-status=info]]:border-blue-300 dark:[&[data-status=info]]:border-blue-800 [&[data-status=info]]:bg-blue-50 dark:[&[data-status=info]]:bg-blue-950/40 ' +
            '[&[data-status=warning]]:border-amber-300 dark:[&[data-status=warning]]:border-amber-700 [&[data-status=warning]]:bg-amber-50 dark:[&[data-status=warning]]:bg-amber-950/50 ' +
            '[&[data-status=error]]:border-red-400 dark:[&[data-status=error]]:border-red-700 [&[data-status=error]]:bg-red-50 dark:[&[data-status=error]]:bg-red-950/40 ' +
            'border',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
