import { ACCOUNT_FILE_ERRORS, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/constants';
import { FileUploadResult } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a currency value as a human-readable string
 *
 * @param value - The numeric value to format (in the smallest unit e.g. naira, dollar, etc.)
 * @param options - Optional formatting configuration
 * @param options.currencySymbol - Override the currency symbol (default: "₦")
 * @param options.decimals - Number of decimals to show (default: 2)
 * @param options.compact - If true, produces compact notation (e.g., ₦1.2K, $3.4M)
 * @returns Formatted currency string (e.g. "₦1,500.00")
 */
export function formatCurrency(
  value: number,
  options?: {
    currencySymbol?: string;
    decimals?: number;
    compact?: boolean;
  },
): string {
  const { currencySymbol = '₦', decimals = 2, compact = false } = options || {};

  if (isNaN(value)) return `${currencySymbol}0.00`;

  // Use compact notation for e.g. 1500 -> ₦1.5K
  if (compact) {
    const absValue = Math.abs(value);
    let compactValue = value;
    let suffix = '';

    if (absValue >= 1_000_000_000) {
      compactValue = value / 1_000_000_000;
      suffix = 'B';
    } else if (absValue >= 1_000_000) {
      compactValue = value / 1_000_000;
      suffix = 'M';
    } else if (absValue >= 1_000) {
      compactValue = value / 1_000;
      suffix = 'K';
    }

    return `${currencySymbol}${compactValue.toFixed(decimals)}${suffix}`;
  }

  // Standard formatting with thousands separator
  return currencySymbol + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Formats a date string to a readable format (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Formats a Date object to a time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

/**
 * Handles image file upload and converts to base64
 * @param file - File object from input element
 * @returns Promise resolving to file upload result with base64 data or error
 */
export async function handleImageUpload(file: File): Promise<FileUploadResult> {
  try {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      return {
        success: false,
        error: ACCOUNT_FILE_ERRORS.INVALID_FILE_TYPE,
      };
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return {
        success: false,
        error: ACCOUNT_FILE_ERRORS.FILE_TOO_LARGE,
      };
    }

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error(ACCOUNT_FILE_ERRORS.FILE_READ_ERROR));
        }
      };
      reader.onerror = () => reject(new Error(ACCOUNT_FILE_ERRORS.FILE_READ_ERROR));
      reader.readAsDataURL(file);
    });

    return {
      success: true,
      data: base64,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : ACCOUNT_FILE_ERRORS.FILE_READ_ERROR,
    };
  }
}
