import React from 'react';

import { Button } from '@/components/ui/button';

interface EmptySearchProps {
  query: string;
  onCreate?: () => void;
}

export function EmptySearch({ query, onCreate }: EmptySearchProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
      <div className="text-muted-foreground text-center leading-relaxed">
        We couldn&apos;t find{' '}
        <span className="text-foreground font-semibold">&quot;{query.trim()}&quot;</span> We&apos;ll
        help you create a new product record using AI
      </div>
      <Button type="button" className="mt-2" onClick={onCreate}>
        Create Product
      </Button>
    </div>
  );
}
