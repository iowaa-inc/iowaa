'use client';

import { useMemo } from 'react';

import { hourlyLeads, leadVolume, topProducts } from '../data';
import type { HourlyLead, LeadVolume, TopProduct } from '../types';

export function useAnalytics() {
  const todayHourlyLeads = useMemo(() => hourlyLeads, []);
  const volumeData = useMemo(() => leadVolume, []);
  const topProductsData = useMemo(() => topProducts, []);

  const totalDailyLeadsCard = useMemo(() => {
    return todayHourlyLeads.reduce((sum, hour) => sum + hour.leads, 0);
  }, [todayHourlyLeads]);

  return {
    getHourlyLeads: (): HourlyLead[] => todayHourlyLeads,
    getLeadVolume: (): LeadVolume[] => volumeData,
    getTopProducts: (): TopProduct[] => topProductsData,
    getTotalDailyLeadsCard: (): number => totalDailyLeadsCard,
  };
}
