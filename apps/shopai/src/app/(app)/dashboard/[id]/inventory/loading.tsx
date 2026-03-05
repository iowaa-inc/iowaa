import { Skeleton } from '@/components/ui/skeleton';

export default function InventoryLoading() {
  return (
    <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="hidden h-10 w-32 sm:block" />
      </div>

      <div className="bg-card rounded-xl border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="divide-y">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-4 max-w-xs flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="ml-auto h-8 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
