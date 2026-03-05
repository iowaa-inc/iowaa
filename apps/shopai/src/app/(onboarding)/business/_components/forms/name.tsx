'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { nameSchema } from '@/features/business-profile/schema';
import { useAvailabilityCheck } from '@/hooks/use-availability-check';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiLoader4Fill } from '@remixicon/react';
import { useDebounceValue, useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

const schema = z.object({
  name: nameSchema,
});

type BusinessNameInput = z.infer<typeof schema>;

const nameAvailability = {
  true: {
    id: 'name-available',
    text: '✓ This business name is available',
    className: 'text-success',
  },
  false: {
    id: 'name-taken',
    text: '✗ This business name is already taken',
    className: 'text-error',
  },
};

export function Name() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [localData, setLocalData] = useLocalStorage<z.infer<typeof schema>>(
    ONBOARDING_STEP_DATA_KEY,
    {} as z.infer<typeof schema>,
  );

  const form = useForm<BusinessNameInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: (localData && localData.name) || '',
    },
  });

  const nameValue = form.watch('name');

  // Debounce the nameValue before checking availability
  // 500ms debounce is common for input
  const [debouncedName] = useDebounceValue(nameValue, 500);

  const debouncedShouldCheck = debouncedName && debouncedName.length >= 2;

  const {
    isAvailable,
    isValidating,
    isLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: availabilityError,
  } = useAvailabilityCheck({
    option: {
      scope: 'business_profiles',
      property: 'display_name',
      value: debouncedShouldCheck ? debouncedName.toLowerCase() : null,
    },
  });

  async function onValid(data: BusinessNameInput) {
    // Note: If name field is empty or invalid, RHF validation prevents submit.
    if (!isAvailable) {
      form.setError('name', {
        type: 'manual',
        message: 'This business name is already taken',
      });
      return;
    }

    setLocalData((prev) => ({ ...prev, name: data.name }));
    stepper.next();
  }

  // Determine whether to show description feedback (only if query made and at least 2 characters)
  const showNameAvailability = typeof isAvailable === 'boolean' && !!debouncedShouldCheck;

  return (
    <form onSubmit={form.handleSubmit(onValid)} className="space-y-6" autoComplete="off">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="business-name-input">Business Name</FieldLabel>
              <div className="relative" suppressHydrationWarning>
                <Input
                  {...field}
                  id="business-name-input"
                  autoComplete="off"
                  placeholder="e.g., Tech Solutions Inc."
                  className="h-10 pr-10"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid
                      ? 'name-error'
                      : isAvailable === true
                        ? 'name-available'
                        : isAvailable === false
                          ? 'name-taken'
                          : undefined
                  }
                />
                {mounted && (isValidating || isLoading) && debouncedShouldCheck && (
                  <RiLoader4Fill className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
                )}
                {mounted &&
                  !isValidating &&
                  !isLoading &&
                  isAvailable === true &&
                  debouncedShouldCheck && (
                    <RiCheckboxCircleFill className="text-success absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                  )}
              </div>
              {mounted && showNameAvailability && (
                <FieldDescription
                  id={nameAvailability[`${isAvailable}`].id}
                  className={cn(nameAvailability[`${isAvailable}`].className, 'py-2')}
                >
                  {nameAvailability[`${isAvailable}`].text}
                </FieldDescription>
              )}
              {fieldState.invalid && <FieldError id="name-error" errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        disabled={!isAvailable || form.formState.isSubmitting}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </form>
  );
}
