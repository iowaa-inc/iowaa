import { logoUploadSchema } from '@/features/business-profile/schema';
import { z } from 'zod';

export type FileUploadType = 'business_logo' | 'user_avatar'; // Add more as needed

interface FileConfig {
  bucketName: string;
  folderPath: string; // e.g., 'temp/'
  filePrefix: string; // e.g., 'business-logo-'
  validationSchema: z.ZodType<unknown>;
  // computed property helper
  get fullPrefix(): string;
}

export const FILE_CONFIGS: Record<FileUploadType, FileConfig> = {
  business_logo: {
    bucketName: 'public-assets',
    folderPath: 'temp/',
    filePrefix: 'business-logo-',
    validationSchema: logoUploadSchema,
    get fullPrefix() {
      return `${this.folderPath}${this.filePrefix}`;
    },
  },
  // Example of how easy it is to add another type:
  user_avatar: {
    bucketName: 'avatars',
    folderPath: 'temp-uploads/',
    filePrefix: 'avatar-',
    validationSchema: z.any(), // Replace with actual schema
    get fullPrefix() {
      return `${this.folderPath}${this.filePrefix}`;
    },
  },
};

export const getFileConfig = (type: string): FileConfig => {
  const config = FILE_CONFIGS[type as FileUploadType];
  if (!config) {
    throw new Error(`Invalid file upload type: ${type}`);
  }
  return config;
};
