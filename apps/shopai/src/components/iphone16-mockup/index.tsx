import { cn } from '@/lib/utils';

import { Iphone16StatusBar } from './status-bar';

interface Iphone16MockupProps {
  className?: string;
  children: React.ReactNode;
}

export function Iphone16Mockup({ children, className }: Iphone16MockupProps) {
  return (
    <div
      className={cn(
        'relative mx-auto aspect-1/2 overflow-hidden rounded-[50px] border-8 border-black bg-black shadow-2xl dark:border-gray-600',
        className,
      )}
    >
      <Iphone16StatusBar />
      <div className="flex h-full flex-col pt-11">{children}</div>
    </div>
  );
}
