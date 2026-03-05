export interface TrustTask {
  id: string;
  label: string;
  points: number;
}

export const ALL_BUSINESS_TRUST_TASKS: TrustTask[] = [
  { id: '1', label: 'Complete business profile', points: 10 },
  { id: '2', label: 'Verify business registration', points: 20 },
  { id: '3', label: 'Add business location', points: 10 },
  { id: '4', label: 'Set operating hours', points: 10 },
  { id: '5', label: 'Add brand voice', points: 5 },
  { id: '6', label: 'Complete first sale', points: 25 },
  { id: '7', label: 'Receive 5 positive reviews', points: 20 },
];

export type RegistrationType = {
  key: string;
  label: string;
  documents: string[];
};

export const REGISTRATION_TYPES: RegistrationType[] = [
  {
    key: 'sole-proprietorship',
    label: 'Sole Proprietorship',
    documents: [
      'Application for Registration for Business Name form (CAC/BN/1 or Form A)',
      'Business owner/ representative ID',
      'CAC Certificate',
      'Operating License where business is regulated',
      'Operational Business Address - attach proof of address',
      'SCUML Certificate (Optional)',
      'TIN or TIN certificate',
      'Website/Social media Url',
    ],
  },
  {
    key: 'limited-liability',
    label: 'Limited Liability Company (LLC)',
    documents: [
      'Certificate of Incorporation',
      'Memorandum and Articles of Association',
      'CAC Form CO2 (Allotment of Shares)',
      'CAC Form CO7 (Particulars of Directors)',
      'TIN Certificate',
      'Business owner/ representative ID',
      'Operating License where business is regulated',
      'Operational Business Address - attach proof of address',
    ],
  },
  {
    key: 'partnership',
    label: 'Partnership',
    documents: [
      'Partnership Agreement',
      'Business Name Registration Certificate',
      "Partners' ID Cards",
      'TIN Certificate',
      'Operational Business Address - attach proof of address',
      'Operating License where business is regulated',
    ],
  },
];

export const BRAND_VOICES = [
  'Professional',
  'Friendly',
  'Casual',
  'Formal',
  'Technical',
  'Empathetic',
  'Authoritative',
  'Conversational',
];

export const TIMEZONES = [
  { value: 'UTC-08:00', label: '(UTC-08:00) Pacific Time' },
  { value: 'UTC-05:00', label: '(UTC-05:00) Eastern Time' },
  { value: 'UTC+00:00', label: '(UTC+00:00) GMT' },
  { value: 'UTC+01:00', label: '(UTC+01:00) West Africa Time' },
];

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

/**
 * A simplified NAICS list.
 *
 * This covers both Service and Retail vendors clearly
 * */
export const BUSINESS_INDUSTRY_SECTORS = [
  'Retail Trade',
  'Food & Beverage Services',
  'Health Care & Wellness',
  'Professional Services',
  'Education & Training',
  'Automotive & Transportation',
  'Real Estate & Housing',
  'Construction & Home Services',
  'Arts, Entertainment & Recreation',
  'Finance & Insurance',
  'Others',
] as const;

export const BUSINESS_IDENTITY_DOCUMENTS = [
  'Application for Registration for Business Name form (CAC/BN/1 or Form A)',
  'CAC Certificate',
  'SCUML Certificate (Optional)',
  'Website/Social media Url',
  'Certificate of Incorporation',
  'Memorandum and Articles of Association',
  'CAC Form CO2 (Allotment of Shares)',
  'CAC Form CO7 (Particulars of Directors)',
  'TIN Certificate',
  'Business owner/ representative ID',
  'Partnership Agreement',
  'Business Name Registration Certificate',
  "Partners' ID Cards",
  'TIN Certificate',
  'Operational Business Address - attach proof of address',
  'Operating License where business is regulated',
];
