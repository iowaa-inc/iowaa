import '@/styles/main.css';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="bg-background text-foreground flex min-h-screen flex-col">
      {children}
    </ScrollArea>
  );
}
