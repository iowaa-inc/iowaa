'use client';

import { Controller, useForm } from 'react-hook-form';

import { BUSINESS_INDUSTRY_SECTORS } from '@/features/business-profile/constants';
import { categorySchema, descriptionSchema, emailSchema } from '@/features/business-profile/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

const schema = z.object({
  category: categorySchema,
  description: descriptionSchema,
  email: emailSchema,
});

type CategoryDescriptionInput = z.infer<typeof schema>;

export function Bio() {
  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [stepData, setStepData] = useLocalStorage<CategoryDescriptionInput>(
    ONBOARDING_STEP_DATA_KEY,
    {} as CategoryDescriptionInput,
  );

  const form = useForm<CategoryDescriptionInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: (stepData && stepData.category) || BUSINESS_INDUSTRY_SECTORS[0],
      description: (stepData && stepData.description) || '',
      email: (stepData && stepData.email) || '',
    },
  });

  async function onValid(data: CategoryDescriptionInput) {
    setStepData((prev) => ({
      ...prev,
      category: data.category,
      description: data.description,
      email: data.email,
    }));
    stepper.next();
  }

  return (
    <form onSubmit={form.handleSubmit(onValid)} className="space-y-8" autoComplete="off">
      <FieldGroup>
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="business-category-input">Business Category</FieldLabel>
              <div className="w-full">
                <Combobox
                  items={BUSINESS_INDUSTRY_SECTORS as readonly string[]}
                  value={field.value || ''}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    id="business-category-input"
                    className="w-full"
                    placeholder="Select a category"
                    autoComplete="off"
                  />
                  <ComboboxContent className="w-full min-w-[250px]">
                    <ComboboxEmpty>No categories found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <FieldDescription>
                Choose the category that best describes your business
              </FieldDescription>
              {fieldState.invalid && <FieldError id="category-error" errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="business-description-input">Business Description</FieldLabel>
              <Textarea
                id="business-description-input"
                placeholder="Tell us about your business, what you offer, and what makes you unique..."
                className="min-h-32 resize-none"
                {...field}
              />
              <FieldDescription>
                {field.value ? field.value.length : 0}/500 characters
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError id="description-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="business-email-input">Business Email Address</FieldLabel>
              <Input
                id="business-email-input"
                type="email"
                placeholder="you@business.com"
                autoComplete="email"
                {...field}
              />
              <FieldDescription>
                This email will be used for important business communication.
              </FieldDescription>
              {fieldState.invalid && <FieldError id="email-error" errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => stepper.prev()} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
          Continue
        </Button>
      </div>
    </form>
  );
}
