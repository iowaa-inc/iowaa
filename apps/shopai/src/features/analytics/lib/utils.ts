import type { HourlyLead } from '../types';

/**
 * Calculate percentage change and absolute change between two lead values
 */
export function calculateLeadChange(current: number, previous: number) {
  const delta = current - previous;
  const percent = previous === 0 ? 100 : (delta / previous) * 100;

  let color = 'text-muted-foreground';
  if (percent > 0) {
    color = 'text-green-600';
  } else if (percent < 0) {
    color = 'text-red-600';
  }

  return {
    changePercentage: percent,
    changeValue: delta,
    changeColor: color,
  };
}

export function hourToTimeLabel(hour: number) {
  const h = hour % 24;
  const period = h < 12 ? 'AM' : 'PM';
  const label = h % 12 === 0 ? 12 : h % 12;
  return `${label} ${period}`;
}

/**
 * Get the interval for filtering sparkline data based on viewport width
 */
export function getSparklineInterval(width: number): number {
  if (width < 500) {
    return 3; // Show every 3rd hour on mobile
  } else if (width < 800) {
    return 2; // Show every 2nd hour on tablet
  }
  return 1; // Show all hours on desktop
}

/**
 * Filters sparkline data by a given interval, always including the last data point.
 *
 * @param data - Array of hourly leads with a time string.
 * @param interval - Step interval for filtering.
 * @returns The filtered sparkline data array.
 */
export function filterSparklineData(
  data: Array<HourlyLead & { time: string }>,
  interval: number,
): Array<HourlyLead & { time: string }> {
  if (!data || data.length === 0) return [];
  if (interval <= 1) return data;

  const result: Array<HourlyLead & { time: string }> = [];
  for (let i = 0; i < data.length; i += interval) {
    result.push(data[i]);
  }

  // Ensure the last data point is included for end-of-day.
  const lastResult = result.at(-1);
  const lastData = data.at(-1);

  if (result.length > 0 && lastData && lastResult?.hour !== lastData.hour) {
    result.push(lastData);
  }

  return result;
}
