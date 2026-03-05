import type { ReactNode } from 'react';

import '@/styles/main.css';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className="bg-background">{children}</div>;
}
