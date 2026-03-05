'use client';

import type { Json } from '@/types/supabase';
import useSWR from 'swr';

import { createClient } from '@/lib/supabase/client';

import type {
  BusinessSchedule,
  DayHour,
  DayOfWeek,
  OperatingHours,
  RawWeeklySchedule,
  UpdateScheduleInput,
} from '../types';

function normaliseDayHours(raw: RawWeeklySchedule): {
  isHoursEnabled: boolean;
  dayHours: OperatingHours;
} {
  // Assume only "dayHours" wrapper shape, no backwards compatibility
  const dayHoursObj =
    raw && typeof raw === 'object' && 'dayHours' in raw
      ? ((raw as { dayHours?: Partial<Record<DayOfWeek, Partial<DayHour>>> }).dayHours ?? {})
      : {};

  const result: Partial<OperatingHours> = {};

  (Object.keys(dayHoursObj) as DayOfWeek[]).forEach((day) => {
    const existing = dayHoursObj[day] ?? {};

    result[day] = {
      enabled: typeof existing.enabled === 'boolean' ? existing.enabled : false,
      from: typeof existing.from === 'string' ? existing.from : '',
      to: typeof existing.to === 'string' ? existing.to : '',
    };
  });

  const anyDayEnabled = Object.values(result).some((day) => day?.enabled);

  const isHoursEnabled =
    raw && typeof raw === 'object' && typeof raw.isHoursEnabled === 'boolean'
      ? raw.isHoursEnabled
      : anyDayEnabled;

  return { isHoursEnabled, dayHours: result as OperatingHours };
}

async function fetchBusinessSchedule(businessId: string): Promise<BusinessSchedule> {
  const supabase = createClient();

  const { data: operations, error: operationsError } = await supabase
    .from('business_operations')
    .select('weekly_schedule, timezone')
    .eq('business_id', businessId)
    .single();

  console.log(operations);

  if (operationsError) {
    throw operationsError;
  }

  const rawSchedule = operations?.weekly_schedule as RawWeeklySchedule;

  const parsed = normaliseDayHours(rawSchedule);

  console.log(parsed);

  return {
    isHoursEnabled: parsed.isHoursEnabled,
    timezone: operations?.timezone ?? '',
    dayHours: parsed.dayHours,
  };
}

export function useBusinessSchedule(businessId?: string) {
  const { data, error, isLoading, mutate } = useSWR<BusinessSchedule | null>(
    businessId ? ['business-operations-schedule', businessId] : null,
    ([, id]) => fetchBusinessSchedule(id as string),
    {
      revalidateOnFocus: false,
    },
  );

  const schedule: BusinessSchedule = (data as BusinessSchedule | null) ?? {
    isHoursEnabled: false,
    timezone: '',
    dayHours: {} as OperatingHours,
  };

  const updateSchedule = async (input: UpdateScheduleInput) => {
    if (!businessId) {
      throw new Error('Missing business id in route.');
    }

    const supabase = createClient();

    const payload: { timezone: string; weekly_schedule: Json } = {
      timezone: input.timezone,
      weekly_schedule: {
        isHoursEnabled: input.isHoursEnabled,
        dayHours: input.dayHours,
      } as Json,
    };

    const { error: updateError } = await supabase
      .from('business_operations')
      .update(payload)
      .eq('business_id', businessId);

    if (updateError) {
      throw updateError;
    }

    await mutate((current) => {
      const base = (current as BusinessSchedule | null) ?? {
        isHoursEnabled: false,
        timezone: '',
        dayHours: {} as OperatingHours,
      };

      return {
        ...base,
        ...input,
      };
    }, false);
  };

  const refresh = () => mutate();

  return {
    schedule,
    isLoading,
    error,
    updateSchedule,
    refresh,
  };
}
