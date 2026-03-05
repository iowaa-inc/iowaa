'use client';

import { createStore } from '@/lib/create-store';

import type { BusinessProfile, DayHour, DayOfWeek, DocumentStatus } from './types';

export interface ExtendedBusinessProfile extends BusinessProfile {
  brandVoices: string[];
  dayHours: Record<DayOfWeek, DayHour>;
  registrationType: string;
  documentStatus: DocumentStatus | 'none';
  completedTrustTaskIds: string[];
  trustScore: number;
  sellerLevel: string;
}

export type BusinessProfileStoreData = ExtendedBusinessProfile;

const defaultDayHours: Record<DayOfWeek, DayHour> = {
  monday: { enabled: true, from: '09:00 AM', to: '5:30 PM' },
  tuesday: { enabled: true, from: '09:00 AM', to: '5:30 PM' },
  wednesday: { enabled: true, from: '09:00 AM', to: '5:30 PM' },
  thursday: { enabled: true, from: '09:00 AM', to: '5:30 PM' },
  friday: { enabled: true, from: '09:00 AM', to: '5:30 PM' },
  saturday: { enabled: false, from: '09:00 AM', to: '5:30 PM' },
  sunday: { enabled: false, from: '09:00 AM', to: '5:30 PM' },
};

const INITIAL_BUSINESS_PROFILE: BusinessProfileStoreData = {
  id: '1',
  logo: null,
  name: 'My Business',
  emailAddress: 'business@example.com',
  category: 'Retail',
  description: 'A great business description',
  phone: '+1234567890',
  location: '123 Main St, City, State 12345',
  timezone: 'America/New_York',
  isHoursEnabled: true,
  agreedToTerms: false,
  agreedToUpdates: false,
  brandVoices: ['Professional'],
  dayHours: defaultDayHours,
  registrationType: '',
  documentStatus: 'none',
  completedTrustTaskIds: ['1', '2'],
  trustScore: 0,
  sellerLevel: 'Seller',
};

const { Provider, useStore } = createStore<BusinessProfileStoreData, 'businessProfile'>({
  storeName: 'businessProfile',
  initialData: INITIAL_BUSINESS_PROFILE,
  supportPartialUpdates: true,
  errorMessage: 'useBusinessProfileStore must be used within a BusinessProfileProvider',
});

export const BusinessProfileProvider = Provider;
export const useBusinessProfileStore = useStore;
