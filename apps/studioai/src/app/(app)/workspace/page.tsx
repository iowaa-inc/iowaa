'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useActiveProject } from '@/features/project/hooks/use-active-project';
import { RiLoader4Line } from '@remixicon/react';

export default function Page() {
  const router = useRouter();
  const { activeProjectId, isLoading, error } = useActiveProject();

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      // Next.js recommends using a custom 500 error route for unexpected errors
      router.replace('/500');
      return;
    }

    if (!activeProjectId) {
      // Next.js recommends showing a 404 for not found resources
      router.replace('/404');
      return;
    }

    router.replace(`/workspace/${activeProjectId}`);
  }, [isLoading, error, activeProjectId, router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-base text-[#555]">
      <RiLoader4Line
        size={44}
        className="text-muted-foreground animate-spin"
        aria-label="Loading"
      />
      Loading your workspace...
    </div>
  );
}
