'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { useMediaQuery } from '@/hooks/use-media-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { TIMEZONES } from '../constants';
import { DAYS_OF_WEEK } from '../constants';
import { DayHour, DayOfWeek, OperatingHours } from '../types';
import { generateTimeOptions } from '../utils';

interface OperatingHoursFormValues {
  isHoursEnabled: boolean;
  timezone: string;
  dayHours: OperatingHours;
}

interface OperatingHoursEditModalProps {
  isHoursEnabled: boolean;
  timezone: string;
  dayHours: OperatingHours;
  onSave: (data: { isHoursEnabled: boolean; timezone: string; dayHours: OperatingHours }) => void;
  children: React.ReactNode;
}

const TIME_OPTIONS = generateTimeOptions();

const operatingHoursSchema = z.object({
  isHoursEnabled: z.boolean(),
  timezone: z.string().min(1, {
    message: 'Timezone is required',
  }),
  dayHours: z.object({
    monday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    tuesday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    wednesday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    thursday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    friday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    saturday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
    sunday: z.object({
      enabled: z.boolean(),
      from: z.string(),
      to: z.string(),
    }),
  }),
});

export function OperatingHoursEditModal({
  isHoursEnabled: initialIsHoursEnabled,
  timezone: initialTimezone,
  dayHours: initialDayHours,
  onSave,
  children,
}: OperatingHoursEditModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<OperatingHoursFormValues>({
    resolver: zodResolver(operatingHoursSchema),
    defaultValues: {
      isHoursEnabled: initialIsHoursEnabled,
      timezone: initialTimezone,
      dayHours: initialDayHours,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        isHoursEnabled: initialIsHoursEnabled,
        timezone: initialTimezone,
        dayHours: { ...initialDayHours },
      });
    }
  }, [open, initialIsHoursEnabled, initialTimezone, initialDayHours, form]);

  const onSubmit = (values: OperatingHoursFormValues) => {
    onSave({
      isHoursEnabled: values.isHoursEnabled,
      timezone: values.timezone,
      dayHours: { ...values.dayHours },
    });

    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  const isHoursEnabled = useWatch({
    control: form.control,
    name: 'isHoursEnabled',
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formContent = (
    <form
      id="operating-hours-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 pt-4"
    >
      <FieldGroup>
        <Controller
          name="isHoursEnabled"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="operating-hours-form-enable">Enable</FieldLabel>
                <FieldDescription>Quickly enable or disable business hours</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                id="operating-hours-form-enable"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          name="timezone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="operating-hours-form-timezone">Timezone</FieldLabel>
                <FieldDescription>Set your timezone</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="bg-muted/50"
                  id="operating-hours-form-timezone"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-[40px]" />
            <div className="grid flex-1 grid-cols-[100px_1fr_auto_1fr] items-center gap-2">
              <span className="text-foreground text-sm font-medium"></span>
              <span className="text-muted-foreground text-sm font-medium">From</span>
              <span className="text-muted-foreground text-center text-sm">To</span>
            </div>
          </div>

          {DAYS_OF_WEEK.map((day) => {
            const dayKey = day.toLowerCase() as DayOfWeek;
            return (
              <Controller
                key={day}
                name={`dayHours.${dayKey}`}
                control={form.control}
                render={({ field, fieldState }) => {
                  const dayValue: DayHour = field.value || {
                    enabled: false,
                    from: '09:00 AM',
                    to: '5:30 PM',
                  };
                  const isDayEnabled = dayValue.enabled;

                  return (
                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                      <Switch
                        name={`${field.name}.enabled`}
                        checked={isDayEnabled}
                        onCheckedChange={(checked) => {
                          field.onChange({
                            ...dayValue,
                            enabled: checked,
                          });
                        }}
                        disabled={!isHoursEnabled}
                        aria-invalid={fieldState.invalid}
                      />
                      <div className="grid flex-1 grid-cols-[100px_1fr_1fr] items-center gap-2">
                        <span className="text-foreground text-sm font-medium">{day}</span>
                        <Select
                          value={dayValue.from}
                          onValueChange={(value) => {
                            field.onChange({
                              ...dayValue,
                              from: value,
                            });
                          }}
                          disabled={!isDayEnabled || !isHoursEnabled}
                        >
                          <SelectTrigger
                            className="bg-muted/50 h-9 w-full text-sm"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={dayValue.to}
                          onValueChange={(value) => {
                            field.onChange({
                              ...dayValue,
                              to: value,
                            });
                          }}
                          disabled={!isDayEnabled || !isHoursEnabled}
                        >
                          <SelectTrigger
                            className="bg-muted/50 h-9 w-full text-sm"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  );
                }}
              />
            );
          })}
        </div>
      </FieldGroup>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Submit
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Operating Hours</DialogTitle>
            <DialogDescription className="mt-1 text-center">
              Set your business hours for each day of the week
            </DialogDescription>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Operating Hours</DrawerTitle>
          <DrawerDescription>Set your business hours for each day of the week</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
