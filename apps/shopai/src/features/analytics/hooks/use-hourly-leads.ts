import { generateHourlyLeads } from '../data';
// import { useAnalyticsStore, AnalyticsStoreData } from "../provider";
import type { HourlyLead } from '../types';

export function useHourlyLeads() {
  // const { analytics, setLoading, isLoading } = useAnalyticsStore();

  return {
    get(
      date: string | string[],
      options?: {
        businessId?: string;
        hourRange?: { start: number; end: number };
      },
    ): HourlyLead[] {
      const dates = Array.isArray(date) ? date.slice() : [date];
      // Sort dates from latest to oldest
      const sortedDates = dates.sort((a, b) => {
        // Assumes format yyyy-MM-dd
        return new Date(b).getTime() - new Date(a).getTime();
      });
      const businessId = options?.businessId ?? 'default-business';
      const hourRange = options?.hourRange;

      // Concatenate if multiple dates, now sorted from latest to oldest
      return sortedDates.flatMap((d) => generateHourlyLeads(businessId, d, hourRange));
    },

    // set(leads: HourlyLead[]) {
    //     analytics.update((prev: AnalyticsStoreData) => ({
    //         ...prev,
    //         hourlyLeads: leads,
    //     }));
    // },

    // add(lead: HourlyLead) {
    //     analytics.update((prev: AnalyticsStoreData) => ({
    //         ...prev,
    //         hourlyLeads: [...prev.hourlyLeads, lead],
    //     }));
    // },

    // update(updates: Partial<HourlyLead>, hour?: number) {
    //     if (hour === undefined) return;
    //     analytics.update((prev: AnalyticsStoreData) => ({
    //         ...prev,
    //         hourlyLeads: prev.hourlyLeads.map(h =>
    //             h.hour === hour ? { ...h, ...updates } : h
    //         ),
    //     }));
    // },

    // remove(hour: number) {
    //     analytics.update((prev: AnalyticsStoreData) => ({
    //         ...prev,
    //         hourlyLeads: prev.hourlyLeads.filter(h => h.hour !== hour),
    //     }));
    // },

    // reset() {
    //     analytics.update((prev: AnalyticsStoreData) => ({
    //         ...prev,
    //         hourlyLeads: [],
    //     }));
    // },

    // isLoading,
    // setLoading,
  };
}
