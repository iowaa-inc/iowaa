import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

export type Business = Tables<'businesses'>;
export type BusinessInsert = TablesInsert<'businesses'>;
export type BusinessUpdate = TablesUpdate<'businesses'>;

export type BusinessProfile = Tables<'business_profiles'>;
export type BusinessProfileInsert = TablesInsert<'business_profiles'>;
export type BusinessProfileUpdate = TablesUpdate<'business_profiles'>;

export type BusinessOperations = Tables<'business_operations'>;
export type BusinessOperationsInsert = TablesInsert<'business_operations'>;
export type BusinessOperationsUpdate = TablesUpdate<'business_operations'>;

export type ComplianceDocument = Tables<'compliance_documents'>;
export type ComplianceDocumentInsert = TablesInsert<'compliance_documents'>;
export type ComplianceDocumentUpdate = TablesUpdate<'compliance_documents'>;

export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RegistrationProfile {
  businessId: string;
  registrationType: string;
  documentStatus: DocumentStatus | 'none';
}

export interface BusinessTrustProfile {
  businessId: string;
  sellerLevel: string;
  trustScore: number;
  completedTrustTaskIds?: string[];
}

export interface BrandVoicesProfile {
  businessId: string;
  brandVoices: string[];
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type OperatingHourRange = { from: string; to: string };
export type DayHour = { enabled: boolean; from: string; to: string };
export type OperatingHours = {
  [key in DayOfWeek]: DayHour;
};

export type RawWeeklySchedule =
  | null
  | ({
      isHoursEnabled?: boolean;
      dayHours?: Partial<Record<DayOfWeek, Partial<DayHour>>>;
    } & { [key: string]: unknown });

export interface BusinessSchedule {
  isHoursEnabled: boolean;
  timezone: string;
  dayHours: OperatingHours;
}

export type UpdateScheduleInput = {
  isHoursEnabled: boolean;
  timezone: NonNullable<BusinessOperations['timezone']> | string;
  dayHours: OperatingHours;
};
