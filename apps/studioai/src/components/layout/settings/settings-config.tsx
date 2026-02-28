import type { ComponentType } from 'react';

import { type RemixiconComponentType, RiPaletteFill, RiUser3Fill } from '@remixicon/react';

import { AppearanceSection } from './sections/account/appearance';
import { ProfileSection } from './sections/account/profile';

export type SettingsTabId = 'profile' | 'appearance';

export interface SettingsSectionItem {
  id: SettingsTabId;
  label: string;
  icon: RemixiconComponentType;
  component: ComponentType<any>;
}

export interface SettingsGroup {
  id: string;
  title: string;
  items: SettingsSectionItem[];
}

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: RiUser3Fill,
        component: ProfileSection,
      },
      {
        id: 'appearance',
        label: 'Appearance',
        icon: RiPaletteFill,
        component: AppearanceSection,
      },
    ],
  },
];
