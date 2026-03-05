'use server';

import {
  categorySchema,
  dayHoursSchema,
  descriptionSchema,
  emailSchema,
  logoPreviewSchema,
  nameSchema,
  phoneSchema,
} from '@/features/business-profile/schema';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

export type OnboardBusinessResult =
  | { success: true; business_id: string }
  | { success: false; error: string | Record<string, unknown> };

export async function onboardBusiness(formData: FormData): Promise<OnboardBusinessResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'Unauthorized',
    };
  }

  let dayHours: unknown = undefined;
  const operatingHours = formData.get('operatingHours');
  try {
    dayHours = operatingHours ? JSON.parse(operatingHours as string) : {};
  } catch (e: unknown) {
    console.error('JSON Parse Error:', e);
    return {
      success: false,
      error: 'Invalid operating hours format',
    };
  }

  const payload = {
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    dayHours,
    logoUrl: formData.get('logoUrl'),
  };

  const validation = z
    .object({
      name: nameSchema,
      category: categorySchema,
      description: descriptionSchema,
      email: emailSchema,
      phone: phoneSchema,
      dayHours: dayHoursSchema,
      logoUrl: logoPreviewSchema,
    })
    .safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten(),
    };
  }

  const data = validation.data;

  const { data: result, error } = await supabase.rpc('create_business_entity', {
    p_display_name: data.name,
    p_category: data.category,
    p_description: data.description || '',
    p_support_email: data.email,
    p_whatsapp_number: data.phone,
    p_logo_url: data.logoUrl,
    p_weekly_schedule: data.dayHours || {},
    p_owner_id: user.id,
  });

  if (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create business entity.',
    };
  }

  let businessId = '';
  if (
    Array.isArray(result) &&
    result[0] &&
    typeof result[0] === 'object' &&
    'business_id' in result[0] &&
    (result[0] as { business_id?: unknown }).business_id != null
  ) {
    businessId = String((result[0] as { business_id?: unknown }).business_id);
  } else {
    // fallback: treat as failure (should not happen if function works correctly)
    return {
      success: false,
      error: 'No business_id returned from database.',
    };
  }

  return {
    success: true,
    business_id: businessId,
  };
}
