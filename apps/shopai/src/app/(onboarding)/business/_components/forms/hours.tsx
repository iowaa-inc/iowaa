'use client';

import { Controller, useForm } from 'react-hook-form';

import { DAYS_OF_WEEK } from '@/features/business-profile/constants';
import { dayHoursSchema, hourEntrySchema } from '@/features/business-profile/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

const schema = z.object({
  dayHours: dayHoursSchema,
});

type DayHour = z.infer<typeof hourEntrySchema>;
type OperatingHoursFormValues = z.infer<typeof schema>;

// Utility for default day hour object
const defaultDayHour: DayHour = { enabled: false, from: '09:00', to: '17:30' };
const defaultDayHours = DAYS_OF_WEEK.reduce(
  (acc, day) => {
    acc[day.toLowerCase()] = { ...defaultDayHour };
    return acc;
  },
  {} as Record<string, DayHour>,
);

export function Hours() {
  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [stepData, setStepData] = useLocalStorage<z.infer<typeof schema>>(
    ONBOARDING_STEP_DATA_KEY,
    {} as z.infer<typeof schema>,
  );

  const form = useForm<OperatingHoursFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dayHours: stepData?.dayHours || { ...defaultDayHours },
    },
  });

  async function onValid(data: OperatingHoursFormValues) {
    setStepData((prev) => ({
      ...prev,
      dayHours: data.dayHours,
    }));
    stepper.next();
  }

  return (
    <form onSubmit={form.handleSubmit(onValid)} className="space-y-8" autoComplete="off">
      <FieldGroup>
        <div className="space-y-4">
          {/* Table-like header for clarity */}
          <div className="flex items-start gap-2">
            <div className="grid flex-1 grid-cols-[170px_1fr_1fr] gap-2">
              <span className="text-muted-foreground col-span-1 ml-9 text-left text-sm font-medium">
                Day
              </span>
              <span className="text-muted-foreground col-span-1 text-left text-sm font-medium">
                From
              </span>
              <span className="text-muted-foreground col-span-1 text-left text-sm font-medium">
                To
              </span>
            </div>
          </div>
          {DAYS_OF_WEEK.map((day) => {
            const dayKey = day.toLowerCase();
            return (
              <Controller
                key={dayKey}
                name={`dayHours.${dayKey as typeof day}`}
                control={form.control}
                render={({ field, fieldState }) => {
                  // Safe default for field value:
                  const value: DayHour = field.value || {
                    ...defaultDayHour,
                  };
                  return (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="items-center"
                    >
                      <Checkbox
                        checked={value.enabled}
                        onCheckedChange={(checked) =>
                          field.onChange({
                            ...value,
                            enabled: checked,
                          })
                        }
                        className="mr-2 ml-1"
                        aria-label={`Enable ${day} hours`}
                      />
                      <div className="grid flex-1 grid-cols-[120px_1fr_1fr] items-center gap-2">
                        <span className="text-foreground font-medium">
                          {day.charAt(0).toUpperCase() + day.slice(1)}{' '}
                        </span>
                        {/* FROM Input */}
                        <Input
                          type="time"
                          value={value.from}
                          onChange={(e) =>
                            field.onChange({
                              ...value,
                              from: e.target.value,
                            })
                          }
                          disabled={!value.enabled}
                          className="bg-muted/50 h-9 w-full text-sm"
                          aria-invalid={fieldState.invalid}
                        />
                        {/* TO Input */}
                        <Input
                          type="time"
                          value={value.to}
                          onChange={(e) =>
                            field.onChange({
                              ...value,
                              to: e.target.value,
                            })
                          }
                          disabled={!value.enabled}
                          className="bg-muted/50 h-9 w-full text-sm"
                          aria-invalid={fieldState.invalid}
                        />
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
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={stepper.prev} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" size="lg" disabled={form.formState.isSubmitting}>
          Continue
        </Button>
      </div>
    </form>
  );
}
