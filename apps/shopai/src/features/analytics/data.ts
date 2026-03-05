import type { HourlyLead, LeadVolume, TopProduct } from './types';

// Generate realistic hourly leads for a business for a specified date and hour rangee
export const generateHourlyLeads = (
  businessId: string,
  date: string,
  hourRange: { start: number; end: number } = { start: 0, end: 23 },
): HourlyLead[] => {
  const hours: HourlyLead[] = [];
  const day = new Date(date);
  const today = new Date();

  // Determine if date is today (compare y,m,d only)
  const isToday =
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate();

  // If today, only go up to current hour
  const maxHour = isToday ? Math.min(hourRange.end, today.getHours()) : hourRange.end;

  for (let hour = hourRange.start; hour <= maxHour; hour++) {
    // Clone the day so mutation doesn't leak
    const hourDate = new Date(day);
    hourDate.setHours(hour, 0, 0, 0);

    // Generate realistic lead counts (higher during business hours)
    const baseLeads = hour >= 9 && hour <= 17 ? 15 : 5;
    const randomVariation = Math.floor(Math.random() * 10);
    const leads = Math.max(0, baseLeads + randomVariation);

    hours.push({
      id: `${businessId}-${date}-${hour}`,
      ownerId: businessId,
      date: date,
      hour,
      timestamp: hourDate.toISOString(),
      leads,
    });
  }

  return hours;
};

// Generate lead volume for the last 30 days
const generateLeadVolume = (): LeadVolume[] => {
  const volumes: LeadVolume[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    // Generate realistic daily lead counts (higher on weekdays)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseLeads = isWeekend ? 80 : 150;
    const randomVariation = Math.floor(Math.random() * 50);
    const leads = Math.max(0, baseLeads + randomVariation);

    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    volumes.push({
      date: dateStr,
      leads,
      day,
    });
  }

  return volumes;
};

export const topProducts: TopProduct[] = [
  {
    id: 'tp-0',
    entityId: 'pe-0',
    offerId: 'po-0',
    totalLeads: 245,
    conversionRate: 14.2,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
  {
    id: 'tp-1',
    entityId: 'pe-1',
    offerId: 'po-1',
    totalLeads: 189,
    conversionRate: 11.6,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
  {
    id: 'tp-2',
    entityId: 'pe-2',
    offerId: 'po-2',
    totalLeads: 156,
    conversionRate: 9.2,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
  {
    id: 'tp-3',
    entityId: 'pe-3',
    offerId: 'po-3',
    totalLeads: 134,
    conversionRate: 8.7,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
  {
    id: 'tp-4',
    entityId: 'pe-4',
    offerId: 'po-4',
    totalLeads: 98,
    conversionRate: 7.9,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
  {
    id: 'tp-5',
    entityId: 'pe-5',
    offerId: 'po-5',
    totalLeads: 38,
    conversionRate: 5.1,
    lastUpdated: '2024-06-07T10:45:00Z',
    period: 'last 30 days',
  },
];

export const leadVolume: LeadVolume[] = generateLeadVolume();
