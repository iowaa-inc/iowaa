'use client';

import { useParams } from 'next/navigation';

import { Clock } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { DAYS_OF_WEEK } from '../constants';
import { useBusinessSchedule } from '../hooks/use-business-schedule';
import { OperatingHoursEditModal } from './operating-hours-edit-modal';

export function OperatingHoursCard() {
  // Get businessId from the route params
  const params = useParams();
  const businessId =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;

  const { schedule, updateSchedule } = useBusinessSchedule(businessId);

  const handleSave = (hoursData: {
    isHoursEnabled: boolean;
    timezone: string;
    dayHours: typeof schedule.dayHours;
  }) => {
    updateSchedule({
      isHoursEnabled: hoursData.isHoursEnabled,
      timezone: hoursData.timezone,
      dayHours: hoursData.dayHours,
    })
      .then(() => {
        toast.success('Operating hours updated successfully');
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : 'Failed to update operating hours');
      });
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Operating Hours</CardTitle>
            <CardDescription>When customers can reach your business</CardDescription>
          </div>
          <OperatingHoursEditModal
            isHoursEnabled={schedule.isHoursEnabled}
            timezone={schedule.timezone}
            dayHours={schedule.dayHours}
            onSave={handleSave}
          >
            <Button variant="outline" size="default" className="shrink-0 bg-transparent">
              Edit
            </Button>
          </OperatingHoursEditModal>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="space-y-6">
          {DAYS_OF_WEEK.map((day) => {
            const dayKey = day.toLowerCase() as keyof typeof schedule.dayHours;
            const entry = schedule.dayHours?.[dayKey];

            return (
              <div key={day} className="flex items-center justify-between">
                <p className="text-foreground text-sm font-medium">
                  <Clock className="mr-2 inline h-4 w-4" />
                  {day}
                </p>
                <p className="text-foreground text-sm">
                  {schedule.isHoursEnabled && entry?.enabled && entry.from && entry.to
                    ? `${entry.from} - ${entry.to}`
                    : 'Closed'}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
