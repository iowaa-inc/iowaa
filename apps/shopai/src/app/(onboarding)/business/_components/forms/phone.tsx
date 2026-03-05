'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { phoneSchema } from '@/features/business-profile/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiLoader4Fill } from '@remixicon/react';
import { useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/components/ui/phone-input';

import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';
import { PhoneVerify } from './phone-verify';

const schema = z.object({ phone: phoneSchema });

type PhoneInputType = z.infer<typeof schema>;

export function Phone() {
  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [stepData, setStepData] = useLocalStorage<{ phone?: string }>(ONBOARDING_STEP_DATA_KEY, {});

  const [view, setView] = useState<'phone' | 'otp'>('phone');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const form = useForm<PhoneInputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: (stepData && stepData.phone) || '',
    },
  });

  const phoneValue = form.watch('phone');

  // Quick phone validity for enabling send OTP button
  const phoneValid =
    !form.formState.errors.phone &&
    form.getValues('phone') &&
    /^\+\d{8,}$/.test(form.getValues('phone'));

  async function handleSendOtp() {
    setIsSendingOtp(true);
    // Pretend to contact a backend or WhatsApp API
    setTimeout(() => {
      setIsSendingOtp(false);
      setView('otp');
    }, 1000);
  }

  function handlePhoneVerify(phone: string) {
    console.log(phone);
    setStepData((prev) => ({
      ...prev,
      phone,
    }));
    stepper.next();
  }

  if (view === 'phone') {
    return (
      <form
        className="space-y-6"
        autoComplete="off"
        onSubmit={form.handleSubmit(() => handleSendOtp())}
      >
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="business-phone-input">Phone Number</FieldLabel>
                <div className="relative">
                  <PhoneInput
                    {...field}
                    id="business-phone-input"
                    autoComplete="off"
                    placeholder="e.g., (555) 123-4567"
                    className="h-10 pr-10"
                    aria-invalid={fieldState.invalid}
                    value={field.value || ''}
                    international={false}
                    defaultCountry="NG"
                    onChange={(val) => field.onChange(val ?? '')}
                  />
                </div>
                <FieldDescription className="py-2">
                  We&apos;ll send a WhatsApp OTP to this phone to verify you own it.
                </FieldDescription>
                {fieldState.invalid && <FieldError id="phone-error" errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => stepper.prev()} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1" size="lg" disabled={!phoneValid || isSendingOtp}>
            {isSendingOtp ? (
              <>
                <RiLoader4Fill className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <RiCheckboxCircleFill className="text-success mr-2 h-4 w-4" />
                Verify With WhatsApp
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }

  if (view === 'otp') {
    return (
      <PhoneVerify
        phone={phoneValue}
        onEditPhone={() => setView('phone')}
        onBack={() => setView('phone')}
        onVerify={handlePhoneVerify}
      />
    );
  }

  // fallback
  return null;
}
