import {
  RemixiconComponentType,
  RiBox3Fill,
  RiFlaskFill,
  RiGroup2Fill,
  RiSettings4Fill,
  RiWalletFill,
} from '@remixicon/react';

type NavItem = {
  label: string;
  href: string;
  icon: RemixiconComponentType;
};

type NavItemConfig = Omit<NavItem, 'href'> & {
  /** Path segment after /dashboard/[businessId] */
  segment: string;
};

const navItemConfigs: NavItemConfig[] = [
  {
    label: 'Inventory',
    segment: 'inventory',
    icon: RiBox3Fill,
  },
  {
    label: 'Playground',
    segment: 'playground',
    icon: RiFlaskFill,
  },
  {
    label: 'Leads',
    segment: 'leads',
    icon: RiGroup2Fill,
  },
  {
    label: 'Wallet',
    segment: 'wallet',
    icon: RiWalletFill,
  },
  {
    label: 'Settings',
    segment: 'settings',
    icon: RiSettings4Fill,
  },
];

/**
 * Build dashboard nav items for the current pathname.
 *
 * Expected dashboard path shape: /dashboard/[businessId]/...
 */
export function getNavItemsForPath(pathname: string): NavItem[] {
  // Split: ['', 'dashboard', '<businessId>', ...]
  const segments = pathname.split('/');

  const hasBusinessId = segments.length >= 3 && segments[1] === 'dashboard' && segments[2];

  const base =
    hasBusinessId && segments[2]
      ? `/dashboard/${segments[2]}`
      : // Fallback – this should only happen before we know the business id.
        '/dashboard';

  return navItemConfigs.map((item) => ({
    label: item.label,
    icon: item.icon,
    href: `${base}/${item.segment}`,
  }));
}
