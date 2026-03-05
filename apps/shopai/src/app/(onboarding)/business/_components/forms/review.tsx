'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  categorySchema,
  dayHoursSchema,
  descriptionSchema,
  emailSchema,
  logoPreviewSchema,
  nameSchema,
  phoneSchema,
} from '@/features/business-profile/schema';
import { Edit2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalStorage } from 'usehooks-ts';
import z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { onboardBusiness } from '../../_actions/onboard-business';
import { OperatingHoursTable } from '../operating-hour-table';
import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const businessInputSchema = z.object({
  name: nameSchema,
  category: categorySchema,
  description: descriptionSchema,
  email: emailSchema,
  phone: phoneSchema,
  dayHours: dayHoursSchema,
  logoUrl: logoPreviewSchema,
  // identityDocument: z.string(), // URL to uploaded identity document
});
type BusinessInputType = z.infer<typeof businessInputSchema>;

export function Review() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  const { useStepper } = stepperContext;
  const stepper = useStepper();

  // This ensures up-to-date step ID mapping.
  const stepIds = Object.fromEntries(stepper.all.map((step) => [step.id, step.id]));

  const [stepData] = useLocalStorage<Partial<BusinessInputType>>(
    ONBOARDING_STEP_DATA_KEY,
    {} as Partial<BusinessInputType>,
  );

  async function handleSubmit() {
    setIsSubmitting(true);

    const toastId = toast.loading('Submitting your onboarding...');
    try {
      const payload = new FormData();
      payload.append('name', stepData.name ?? '');
      payload.append('category', stepData.category ?? '');
      payload.append('description', stepData.description ?? '');
      payload.append('email', stepData.email ?? '');
      payload.append('phone', stepData.phone ?? '');
      payload.append('operatingHours', stepData.dayHours ? JSON.stringify(stepData.dayHours) : '');
      payload.append('logoUrl', stepData.logoUrl ?? '');

      const result = await onboardBusiness(payload);

      if (!result || !result.success) {
        toast.error('Error submitting onboarding. Please try again.', { id: toastId });
        setIsSubmitting(false);
        return;
      }

      toast.success('Onboarding complete. Redirecting...', { id: toastId });
      localStorage.removeItem(ONBOARDING_STEP_DATA_KEY);
      setTimeout(() => {
        router.push('/dashboard/inventory');
      }, 1300);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Error submitting onboarding. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-2">
        <OptionSection
          title="Business Name"
          value={stepData.name || ''}
          onEdit={() => stepper.goTo(stepIds.name)}
        />
        {stepData.logoUrl && typeof stepData.logoUrl === 'string' && (
          <OptionSection
            title="Logo"
            value={
              <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-full border">
                <Image src={stepData.logoUrl} alt="Business logo" fill className="object-cover" />
              </div>
            }
            onEdit={() => stepper.goTo(stepIds.logoUrl)}
          />
        )}
        <OptionSection
          title="Category"
          value={stepData.category || ''}
          onEdit={() => stepper.goTo(stepIds.category)}
        />
        <OptionSection
          title="Description"
          value={stepData.description || ''}
          onEdit={() => stepper.goTo(stepIds.category)}
        />
        <OptionSection
          title="Email"
          value={stepData.email || ''}
          onEdit={() => stepper.goTo(stepIds.category)}
        />
        <OptionSection
          title="Phone Number"
          value={stepData.phone || ''}
          onEdit={() => stepper.goTo(stepIds.category)}
        />
        {stepData.dayHours && (
          <OptionSection
            title="Operating Hours"
            value={<OperatingHoursTable hours={stepData.dayHours} />}
            onEdit={() => stepper.goTo(stepIds.hours)}
          />
        )}
        {/* Identity Document */}
        {/* {stepData.identityDocument && typeof stepData.identityDocument === 'string' && (
          <OptionSection
            title="Identity Document"
            value="✓ Uploaded"
            // No document step in current stepper, so point to review/hours as fallback, or update when/if added
            onEdit={() => stepper.goTo(stepIds.review)}
          />
        )} */}
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => stepper.goTo(stepIds.hours)}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={() => setShowConfirmDialog(true)}
          disabled={isSubmitting}
          className="flex-1 gap-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Complete Onboarding
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          <AlertDialogDescription>
            Please double-check your information. Once submitted, your onboarding is complete.
          </AlertDialogDescription>
          <div className="mt-3 flex gap-2">
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function OptionSection({
  title,
  value,
  onEdit,
}: {
  title: string;
  value: string | React.ReactNode;
  onEdit?: () => void;
}) {
  return (
    <div className="flex w-full flex-col py-2.5">
      <div className="flex w-full items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        {onEdit && (
          <Button variant="secondary" onClick={onEdit}>
            <Edit2 />
            Edit
          </Button>
        )}
      </div>
      <div className="text-foreground/90 text-base">
        {typeof value === 'string' ? value : value}
      </div>
    </div>
  );
}
