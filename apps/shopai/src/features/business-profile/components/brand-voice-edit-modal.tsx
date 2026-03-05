'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useMediaQuery } from '@/hooks/use-media-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

import { BRAND_VOICES } from '../constants';

interface BrandVoiceEditModalProps {
  selectedVoices: string[];
  onSave: (voices: string[]) => void;
  children: React.ReactNode;
}

const brandVoiceSchema = z.object({
  voices: z.array(z.string()).min(1, 'Select at least one brand voice'),
});

type BrandVoiceFormValues = z.infer<typeof brandVoiceSchema>;

export function BrandVoiceEditModal({
  selectedVoices: initialSelectedVoices,
  onSave,
  children,
}: BrandVoiceEditModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<BrandVoiceFormValues>({
    resolver: zodResolver(brandVoiceSchema),
    defaultValues: {
      voices: initialSelectedVoices,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        voices: initialSelectedVoices,
      });
    }
  }, [open, initialSelectedVoices, form]);

  const onSubmit = (values: BrandVoiceFormValues) => {
    onSave([...values.voices]);
    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formContent = (
    <form id="brand-voice-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <FieldGroup>
        <Controller
          name="voices"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Brand Voices</FieldLabel>
              <FieldDescription>Select multiple tones that represent your brand</FieldDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                {BRAND_VOICES.map((voice) => {
                  const isChecked = field.value?.includes(voice) ?? false;
                  return (
                    <button
                      key={voice}
                      type="button"
                      onClick={() => {
                        const currentVoices = field.value || [];
                        if (isChecked) {
                          field.onChange(currentVoices.filter((v) => v !== voice));
                        } else {
                          field.onChange([...currentVoices, voice]);
                        }
                      }}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        isChecked
                          ? 'bg-primary text-primary-foreground'
                          : 'border-primary/30 text-foreground hover:bg-primary/10 border'
                      }`}
                      aria-pressed={isChecked}
                    >
                      {voice}
                    </button>
                  );
                })}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Brand Voice</DialogTitle>
            <p className="text-muted-foreground mt-1 text-center text-sm">
              Select multiple tones that represent your brand
            </p>
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
          <DrawerTitle>Edit Brand Voice</DrawerTitle>
          <DrawerDescription>Select multiple tones that represent your brand</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
