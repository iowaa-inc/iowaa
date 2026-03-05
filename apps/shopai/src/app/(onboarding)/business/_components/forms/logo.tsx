'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';

import { logoPreviewSchema } from '@/features/business-profile/schema';
import { formatBytes } from '@/hooks/use-file-upload';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiDeleteBin7Line, RiLoader4Fill } from '@remixicon/react';
import { useLocalStorage } from 'usehooks-ts';
import * as z from 'zod';

import AvatarUpload from '@/components/file-upload/avatar-upload';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

import { removeTempFile, uploadTempFile } from '../../_actions/upload-logo';
import { ONBOARDING_STEP_DATA_KEY, stepperContext } from '../stepper-context';

const LogoFormSchema = z.object({ logoUrl: logoPreviewSchema });
type LogoFormValues = z.infer<typeof LogoFormSchema>;

export function Logo() {
  const { useStepper } = stepperContext;
  const stepper = useStepper();

  const [localStepData, setLocalStepData] = useLocalStorage<{ logoUrl?: string }>(
    ONBOARDING_STEP_DATA_KEY,
    {},
  );

  const form = useForm<LogoFormValues>({
    resolver: zodResolver(LogoFormSchema),
    defaultValues: { logoUrl: localStepData.logoUrl || undefined },
  });

  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemovingLogo, setIsRemovingLogo] = useState(false);

  // Simulate (incremental) progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isUploading) {
      progressRef.current = 0;
      setUploadProgress(0);
      // Simulate progressive progress (80% on client, then finish on success)
      progressInterval.current = setInterval(() => {
        progressRef.current += 0.02 + (progressRef.current < 0.6 ? 0.01 : 0.002); // Fast at first
        if (progressRef.current >= 0.88) progressRef.current = 0.88;
        setUploadProgress(progressRef.current);
      }, 40);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [isUploading]);

  const finalizeProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    setUploadProgress(1);
    setTimeout(() => setUploadProgress(0), 400); // Smooth reset after finish
  };

  const handleCancelFileSelection = () => setSelectedFile(null);

  const handleConfirmFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile.file);

      const uploadResult = await uploadTempFile(formData, 'business_logo');

      if (!uploadResult.success || !uploadResult.data) {
        throw new Error(
          // @ts-expect-error - Technically property 'error' only exists on { success: false }
          uploadResult.error || 'Upload failed',
        );
      }

      // On real upload finish, fill 100% then close dialog
      finalizeProgress();
      setTimeout(() => {
        setLocalStepData((prevData) => ({
          ...prevData,
          logoUrl: uploadResult.data.url,
        }));
        form.setValue('logoUrl', uploadResult.data.url, { shouldValidate: true });
        setSelectedFile(null);
      }, 400); // finish animation before close
    } catch (error) {
      finalizeProgress();
      form.setError('logoUrl', {
        type: 'manual',
        message:
          error instanceof Error ? error.message : 'Failed to upload logoUrl. Please try again.',
      });
      setSelectedFile(null);
      console.error('Upload failed', error);
    } finally {
      setTimeout(() => setIsUploading(false), 500); // Wait for UX smooth
    }
  };

  // Remove logo from server and clear all references
  const handleRemoveLogo = async () => {
    setIsRemovingLogo(true);
    try {
      if (localStepData.logoUrl) {
        const removeResult = await removeTempFile(localStepData.logoUrl, 'business_logo');
        console.log(removeResult);
        if (!removeResult.success) {
          console.error('Failed to remove logo:', removeResult.error);
        }
      }

      setSelectedFile(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLocalStepData(({ logoUrl, ...rest }) => rest);
      form.setValue('logoUrl', '', { shouldValidate: true });
    } finally {
      setTimeout(() => setIsRemovingLogo(false), 600);
    }
  };

  const currentLogoUrl = form.watch('logoUrl');

  return (
    <>
      <form
        onSubmit={form.handleSubmit(stepper.next)}
        className="w-full space-y-6"
        autoComplete="off"
      >
        <FieldGroup>
          <Controller
            name="logoUrl"
            control={form.control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="business-logo-input" className="sr-only">
                  Business Logo
                </FieldLabel>
                <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex flex-col items-center sm:items-start">
                    <AvatarUpload
                      hideLabel
                      maxSize={5 * 1024 * 1024}
                      defaultAvatar={currentLogoUrl || undefined}
                      onRemove={handleRemoveLogo}
                      disabled={isUploading}
                      onFileChange={(filePayload) => {
                        if (
                          filePayload &&
                          filePayload.file instanceof File &&
                          typeof filePayload.preview === 'string'
                        ) {
                          setSelectedFile({
                            file: filePayload.file,
                            preview: filePayload.preview,
                          });
                          return false;
                        }
                      }}
                      // No more pulse effect for isRemovingLogo!
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-4 text-center sm:items-start sm:text-start">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        {selectedFile ? 'Avatar uploaded' : 'Click to upload avatar'}
                      </p>
                      <FieldDescription className="mx-auto max-w-xs text-center sm:mx-0 sm:text-start">
                        Recommended: square image, at least 300x300px, PNG, JPG up to{' '}
                        {formatBytes(5 * 1024 * 1024)}
                      </FieldDescription>
                    </div>
                  </div>
                  {currentLogoUrl && (
                    <div className="mt-3 shrink-0 sm:mt-0 sm:ml-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="w-fit gap-2"
                        onClick={handleRemoveLogo}
                        disabled={isUploading || isRemovingLogo}
                      >
                        {isRemovingLogo ? (
                          <>
                            <RiLoader4Fill className="h-4 w-4 animate-spin" />
                            Removing...
                          </>
                        ) : (
                          <>
                            <RiDeleteBin7Line className="h-4 w-4" />
                            Remove
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                {fieldState.invalid && <FieldError id="logo-error" errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => stepper.prev()} className="flex-1">
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 gap-2"
            size="lg"
            disabled={!currentLogoUrl || isUploading || !localStepData.logoUrl}
          >
            {isUploading && <RiLoader4Fill className="h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>

      <Dialog
        open={selectedFile !== null}
        onOpenChange={(isOpen) => !isOpen && handleCancelFileSelection()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              Are you sure you want to use this image? It will be uploaded temporarily.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            {selectedFile?.preview && (
              <div className="relative flex size-48 items-center justify-center">
                {/* Progressive circular progress bar overlays the image while uploading */}
                {isUploading && (
                  <CircularProgress
                    value={uploadProgress * 100}
                    max={100}
                    size={192}
                    strokeWidth={6}
                    className="absolute inset-0 size-48"
                    colorClassName="text-primary"
                    showValue={false}
                  />
                )}
                <div className="relative z-10 size-44 overflow-hidden rounded-full">
                  <Image
                    fill
                    src={selectedFile.preview}
                    alt="Pending upload"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancelFileSelection}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirmFileUpload} disabled={isUploading}>
              {isUploading && <RiLoader4Fill className="mr-2 h-4 w-4 animate-spin" />}
              Confirm & Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
