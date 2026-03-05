import type { ReactNode } from 'react';

import '@/styles/main.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
