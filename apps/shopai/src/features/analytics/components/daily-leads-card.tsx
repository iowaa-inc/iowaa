'use client';

import { useEffect, useMemo, useState } from 'react';

import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useWindowSize } from 'usehooks-ts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

import { useHourlyLeads } from '../hooks/use-hourly-leads';
import {
  calculateLeadChange,
  filterSparklineData,
  getSparklineInterval,
  hourToTimeLabel,
} from '../lib/utils';
import type { HourlyLead } from '../types';

export type HourlyLeadWithTime = HourlyLead & { time: string };

export function DailyLeadsCard() {
  const [todayDate, setTodayDate] = useState<string | null>(null);

  useEffect(() => {
    setTodayDate(format(new Date(), 'yyyy-MM-dd'));
  }, []);

  const hourlyLeads = useHourlyLeads();

  const todayData: HourlyLeadWithTime[] = useMemo(() => {
    if (!todayDate) return [];
    return hourlyLeads.get(todayDate).map((h) => ({
      ...h,
      time: hourToTimeLabel(h.hour),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayDate]);

  const [hoveredPoint, setHoveredPoint] = useState<HourlyLeadWithTime | null>(null);

  const { width: viewportWidth } = useWindowSize();

  const filteredSparkline = useMemo(
    () => filterSparklineData(todayData, getSparklineInterval(viewportWidth)),
    [todayData, viewportWidth],
  );

  const totalDailyLeadsCard = useMemo(
    () => todayData.reduce((sum, h) => sum + h.leads, 0),
    [todayData],
  );

  const { changePercentage, changeValue, changeColor } = useMemo(() => {
    let current: number;
    let previous: number;

    if (hoveredPoint) {
      current = hoveredPoint.leads;
      const prevIndex = todayData.findIndex((h) => h.hour === hoveredPoint.hour) - 1;
      previous = prevIndex >= 0 ? todayData[prevIndex].leads : 0;
    } else if (todayData.length < 2) {
      current = todayData[0]?.leads ?? 0;
      previous = 0;
    } else {
      current = todayData[todayData.length - 1].leads;
      previous = todayData[todayData.length - 2].leads;
    }
    return calculateLeadChange(current, previous);
  }, [hoveredPoint, todayData]);

  const onChartHover = (h: HourlyLeadWithTime | null) => setHoveredPoint(h);

  function chartTimeLabel() {
    if (hoveredPoint) {
      return `At ${hoveredPoint.time}`;
    }
    if (todayData.length > 0) {
      const last = todayData.at(-1)!;
      return `At ${last.time}`;
    }
    return 'At 11 PM';
  }

  if (!todayDate) {
    return (
      <Card className="w-full">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="mb-1 h-4 w-40" />
            <Skeleton className="h-10 w-32" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
          {/* Skeleton for chart area */}
          <Skeleton className="mt-2 h-[140px] w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        {/* Lead count display */}
        <div className="space-y-2">
          <h3 className="text-muted-foreground mb-1 text-sm">Leads generated today</h3>
          <p className="text-foreground text-4xl font-semibold">
            {hoveredPoint ? hoveredPoint.leads : totalDailyLeadsCard}
          </p>
          {/* Time label and change percentage */}
          <div className="flex items-center justify-between">
            <h4 className="text-muted-foreground text-sm">{chartTimeLabel()}</h4>
            <span className={`text-sm font-medium ${changeColor}`}>
              {changePercentage >= 0 ? '+' : ''}
              {changePercentage.toFixed(1)}% ({changePercentage >= 0 ? '+' : ''}
              {changeValue})
            </span>
          </div>
        </div>
        {/* Sparkline chart */}
        <ChartContainer
          config={{
            leads: {
              label: 'Leads',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[140px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredSparkline}
            margin={{ left: 12, right: 12 }}
            onMouseMove={(state) => {
              if (
                state &&
                'isTooltipActive' in state &&
                state.isTooltipActive &&
                state.activePayload &&
                state.activePayload[0] &&
                state.activePayload[0].payload
              ) {
                const payload = state.activePayload[0].payload as HourlyLeadWithTime;
                onChartHover(payload);
              }
            }}
            onMouseLeave={() => onChartHover(null)}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="leads"
              type="linear"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
