'use client';

import React, { type ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';

import { useMediaQuery } from '@/hooks/use-media-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { handleImageUpload } from '@/lib/utils';

import { BUSINESS_INDUSTRY_SECTORS } from '../data';

interface BusinessProfileData {
  logo: string | null;
  name: string;
  email: string;
  category: string;
  description: string;
}

interface ProfileEditModalProps {
  profile: BusinessProfileData;
  onSave: (data: BusinessProfileData) => void;
  onError?: (error: string) => void;
  children: React.ReactNode;
}

const profileEditSchema = z.object({
  name: z
    .string()
    .min(1, 'Business name is required')
    .max(100, 'Business name must be at most 100 characters'),
  email: z.string().min(1, 'Email address is required').email('Please enter a valid email address'),
  category: z.string().min(1, 'Business category is required'),
  description: z.string().max(500, 'Description must be at most 500 characters'),
});

type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

export function ProfileEditModal({ profile, onSave, onError, children }: ProfileEditModalProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logo, setLogo] = useState<string | null>(profile.logo);

  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      category: profile.category,
      description: profile.description || '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: profile.name,
        email: profile.email,
        category: profile.category,
        description: profile.description || '',
      });
      setLogo(profile.logo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await handleImageUpload(file);
    if (result.success && result.data) {
      setLogo(result.data);
    } else if (result.error) {
      onError?.(result.error);
    }
    setIsUploading(false);
  };

  const handleLogoRemove = () => {
    setLogo(null);
  };

  const onSubmit = (values: ProfileEditFormValues) => {
    onSave({
      logo,
      name: values.name.trim(),
      email: values.email.trim(),
      category: values.category,
      description: (values.description || '').trim(),
    });

    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setLogo(profile.logo);
    setOpen(false);
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formContent = (
    <form id="profile-edit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <FieldGroup>
        <div>
          <FieldLabel className="mb-2">Logo</FieldLabel>
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <div className="bg-muted/50 border-border hover:border-primary/50 flex items-center gap-3 rounded-md border p-3 transition-colors">
                {logo ? (
                  <>
                    <Image
                      src={logo || '/placeholder.svg'}
                      alt="Logo preview"
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span className="text-foreground flex-1 truncate text-sm">
                      {logo.startsWith('data:') ? 'Image uploaded' : logo.split('/').pop()}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload
                      className={`text-muted-foreground h-5 w-5 ${isUploading ? 'animate-pulse' : ''}`}
                    />
                    <span className="text-muted-foreground text-sm">
                      {isUploading ? 'Uploading...' : 'Upload logo'}
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
            {logo && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleLogoRemove}
                className="shrink-0"
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="profile-edit-form-name">Business Name</FieldLabel>
                <span className="text-muted-foreground text-sm">Required</span>
              </div>
              <Input
                {...field}
                id="profile-edit-form-name"
                placeholder="Business name"
                className="bg-muted/50"
                disabled={isUploading}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="profile-edit-form-email">Email Address</FieldLabel>
                <span className="text-muted-foreground text-sm">Required</span>
              </div>
              <Input
                {...field}
                id="profile-edit-form-email"
                type="email"
                placeholder="email@example.com"
                className="bg-muted/50"
                disabled={isUploading}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="profile-edit-form-category">Category</FieldLabel>
                <span className="text-muted-foreground text-sm">Required</span>
              </div>
              <Select value={field.value} onValueChange={field.onChange} disabled={isUploading}>
                <SelectTrigger
                  className="bg-muted/50"
                  id="profile-edit-form-category"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_INDUSTRY_SECTORS.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-edit-form-description">Description</FieldLabel>
              <Textarea
                {...field}
                id="profile-edit-form-description"
                placeholder="Describe your business..."
                className="bg-muted/50 min-h-[100px] resize-none"
                disabled={isUploading}
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
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Submit'}
        </Button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Profile</DialogTitle>
            <p className="text-muted-foreground mt-1 text-center text-sm">
              Update your business name, logo, category, and description
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
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Update your business name, logo, category, and description
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">{formContent}</div>
      </DrawerContent>
    </Drawer>
  );
}
