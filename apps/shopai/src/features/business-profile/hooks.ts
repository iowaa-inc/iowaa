'use client';

import { useBusinessProfileStore } from './provider';
import type { ExtendedBusinessProfile } from './provider';

export function useBusinessProfile() {
  const store = useBusinessProfileStore();

  return {
    get: (): ExtendedBusinessProfile => {
      const profile = store.businessProfile.get();
      return {
        ...profile,
        email: profile.email || profile.emailAddress,
      };
    },
    update: store.businessProfile.update,
    set: store.businessProfile.set,
    reset: store.businessProfile.reset,
    isLoading: store.isLoading,
    setLoading: store.setLoading,
  };
}
