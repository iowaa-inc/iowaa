export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // uploads  (5MB)

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;

export const ACCOUNT_FILE_ERRORS = {
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)',
  FILE_READ_ERROR: 'Failed to read the selected file',
} as const;
