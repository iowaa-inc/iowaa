import type { Metadata } from 'next';
import { Geist, Geist_Mono, Google_Sans } from 'next/font/google';

import { ThemeProvider } from '@repo/ui-core/components/theme-provider';
import { Toaster } from '@repo/ui-core/components/sonner';
import { TooltipProvider } from '@repo/ui-core/components/tooltip';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'StudioAI - Professional Speech Production Platform',
  description: 'Produce audiobooks, podcasts, training videos, and more with studio-quality AI voices. A complete production suite for creators who demand broadcast-quality results.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} ${googleSans.variable} antialiased overflow-x-hidden max-w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
