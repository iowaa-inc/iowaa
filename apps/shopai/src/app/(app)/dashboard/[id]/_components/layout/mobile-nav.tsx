'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getNavItemsForPath } from '../../_constants/nav';

export function MobileNav() {
  const pathname = usePathname();
  const navItems = getNavItemsForPath(pathname);

  return (
    <nav className="bg-card fixed right-0 bottom-0 left-0 flex py-1 md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 px-1 py-2 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground/60 hover:text-foreground'}`}
          >
            <item.icon size={28} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
// border-t border-border
