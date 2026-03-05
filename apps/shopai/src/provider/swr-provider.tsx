'use client';

import { SWRConfig } from 'swr';

import { fetcher } from '@/lib/fetcher';

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        // Add other SWR global config here if needed
      }}
    >
      {children}
    </SWRConfig>
  );
}
