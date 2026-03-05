import z from 'zod';

import { BUSINESS_INDUSTRY_SECTORS } from './constants';

export type CategoryInputType = z.infer<typeof categorySchema>;
export const categorySchema = z.enum(BUSINESS_INDUSTRY_SECTORS, {
  required_error: 'Please select a category.',
});

export type DescriptionInputType = z.infer<typeof descriptionSchema>;
export const descriptionSchema = z
  .string()
  .trim()
  .min(10, {
    message: 'Description must be at least 10 characters.',
  })
  .max(500, {
    message: 'Description cannot exceed 500 characters.',
  })
  .optional();

export type EmailInputType = z.infer<typeof emailSchema>;
export const emailSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'Email address is required.',
  })
  .email({
    message: 'Enter a valid email address.',
  });

export const logoUploadSchema = z.any().refine(
  (file) => {
    if (!file) return false;
    if (!(file instanceof File)) return false;
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024;
  },
  {
    message: 'Please upload a PNG, JPG, or WebP file up to 5MB.',
  },
);

export const logoPreviewSchema = z
  .string()
  .url({ message: 'Logo must be a valid URL.' })
  .min(1, { message: 'Please upload a logo.' });

export type NameInputType = z.infer<typeof nameSchema>;
export const nameSchema = z
  .string()
  .min(2, {
    message: 'Business name must be at least 2 characters.',
  })
  .max(100, {
    message: 'Business name must be no more than 100 characters.',
  })
  .regex(/^[A-Za-z0-9 '&(),.-]{2,100}$/, {
    message: 'Business name contains invalid characters.',
  });

export type PhoneInputType = z.infer<typeof phoneSchema>;
export const phoneSchema = z
  .string()
  .min(8, {
    message: 'Phone number must be at least 8 digits.',
  })
  .max(24, {
    message: "Phone number can't be more than 24 digits.",
  })
  .regex(/^\+\d{8,}$/, {
    message: 'Enter a valid international phone number (e.g., +15551234567)',
  });

export const hourEntrySchema = z.object({
  enabled: z.boolean(),
  from: z.string(),
  to: z.string(),
});

export type DayHoursInputType = z.infer<typeof dayHoursSchema>;
export const dayHoursSchema = z.object({
  monday: hourEntrySchema,
  tuesday: hourEntrySchema,
  wednesday: hourEntrySchema,
  thursday: hourEntrySchema,
  friday: hourEntrySchema,
  saturday: hourEntrySchema,
  sunday: hourEntrySchema,
});

export const identityUploadDocumentSchema = z
  .instanceof(File, { message: 'Please upload a file.' })
  .refine(
    (file: File) =>
      !!file &&
      ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type) &&
      file.size <= 10 * 1024 * 1024,
    { message: 'File must be PDF, PNG, JPG and <= 10MB.' },
  );
