'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useMediaQuery } from '@/hooks/use-media-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

import { isValidPhoneNumber } from '../utils';

const locationEditSchema = z.object({
  businessPhone: z
    .string()
    .min(1, {
      message: 'Business phone number is required',
    })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: 'Please enter a valid phone number',
    }),
  location: z.string().min(1, {
    message: 'Location is required',
  }),
});

type LocationEditFormValues = z.infer<typeof locationEditSchema>;

interface LocationEditModalProps {
  businessPhone: string;
  location: string;
  onSave: (data: { businessPhone: string; location: string }) => void;
  onError?: (error: string) => void;
  children: React.ReactNode;
}

export function LocationEditModal({
  businessPhone: initialBusinessPhone,
  location: initialLocation,
  onSave,
  children,
}: LocationEditModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<LocationEditFormValues>({
    resolver: zodResolver(locationEditSchema),
    defaultValues: {
      businessPhone: initialBusinessPhone,
      location: initialLocation,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        businessPhone: initialBusinessPhone,
        location: initialLocation,
      });
    }
  }, [open, initialBusinessPhone, initialLocation, form]);

  const onSubmit = (values: LocationEditFormValues) => {
    onSave({
      businessPhone: values.businessPhone.trim(),
      location: values.location.trim(),
    });

    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formContent = (
    <form id="location-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <FieldGroup>
        <Controller
          name="businessPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="location-edit-form-phone" className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  Business Phone Number
                </FieldLabel>
                <span className="text-muted-foreground text-sm">Required</span>
              </div>
              <Input
                {...field}
                id="location-edit-form-phone"
                placeholder="+234 xxx xxx xxxx"
                className="bg-muted/50"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>Determines your business location</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="location-edit-form-location"
                  className="flex items-center gap-1"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Location
                </FieldLabel>
                <span className="text-muted-foreground text-sm">Required</span>
              </div>
              <Input
                {...field}
                id="location-edit-form-location"
                placeholder="City, Country"
                className="bg-muted/50"
                aria-invalid={fieldState.invalid}
              />
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
            <DialogTitle className="text-center">Edit Location</DialogTitle>
            <p className="text-muted-foreground mt-1 text-center text-sm">
              Update your contact details and business location
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
          <DrawerTitle>Edit Location</DrawerTitle>
          <DrawerDescription>Update your contact details and business location</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
