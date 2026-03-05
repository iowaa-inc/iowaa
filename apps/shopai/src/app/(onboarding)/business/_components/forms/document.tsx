'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { identityUploadDocumentSchema } from '@/features/business-profile/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import TableUpload from '@/components/file-upload/table-upload';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup } from '@/components/ui/field';

import { DocumentTypeCard } from '../document-type-card';
import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

const schema = z.object({ document: identityUploadDocumentSchema });

type IdentityDocumentInput = z.infer<typeof schema>;

// Simple upload mock
async function mockUploadDocument(file: File): Promise<{ url: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file) });
    }, 1200);
  });
}

export function Document() {
  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [stepData, setStepData] = useLocalStorage<{ documentUrl?: string }>(
    ONBOARDING_STEP_DATA_KEY,
    {},
  );
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<IdentityDocumentInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      document: undefined,
    },
  });

  // Restore from local storage: Clear file because file cannot be persisted as-is
  useEffect(() => {
    if (stepData.documentUrl) {
      form.reset({ document: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepData.documentUrl]);

  async function onValid(data: IdentityDocumentInput) {
    setIsUploading(true);
    try {
      // Mock upload, replace with your endpoint if needed
      const result = await mockUploadDocument(data.document as File);
      setStepData((prev) => ({
        ...prev,
        documentUrl: result.url,
      }));
      stepper.next();
    } catch (error) {
      form.setError('document', {
        type: 'manual',
        message: 'Failed to upload document. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onValid)} className="space-y-8" autoComplete="off">
      <Alert>
        <AlertDescription>
          We accept PDF, PNG, and JPG files. Maximum file size is 10MB. This document will be
          securely stored and used only for verification purposes.
        </AlertDescription>
      </Alert>

      <FieldGroup>
        <Controller
          control={form.control}
          name="document"
          render={({ field, fieldState }) => (
            <>
              <TableUpload
                maxFiles={5}
                maxSize={10 * 1024 * 1024}
                accept=".pdf,image/png,image/jpeg"
                multiple={false}
                className="border-none!"
                simulateUpload={false}
                // TableUpload expects an onFilesChange callback,
                // we link to react-hook-form by calling field.onChange with the file or undefined
                onFilesChange={(files) => {
                  const file = files?.[0]?.file as File | undefined;
                  field.onChange(file);
                  // react-hook-form manages state, but we can add extra error if needed
                  if (!file) {
                    form.setError('document', { type: 'manual', message: 'Please select a file.' });
                  } else {
                    form.clearErrors('document');
                  }
                }}
              />
              {fieldState.invalid && (
                <FieldError id="business-document-error" errors={[fieldState.error]} />
              )}
            </>
          )}
        />
      </FieldGroup>

      <DocumentTypeCard />

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => stepper.prev()} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          disabled={!form.watch('document') || isUploading}
          className="flex-1 gap-2"
          size="lg"
        >
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </div>
    </form>
  );
}
