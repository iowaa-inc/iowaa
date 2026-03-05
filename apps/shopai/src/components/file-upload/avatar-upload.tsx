'use client';

import Image from 'next/image';

import { type FileWithPreview, formatBytes, useFileUpload } from '@/hooks/use-file-upload';
import { TriangleAlert, User, X } from 'lucide-react';

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

// <-- use next/image

// You need to implement this behavior in the useFileUpload hook. In this file, onFileChange is only called after the file (and preview) is already loaded by the hook, so blocking it here won't prevent preview/file loading. The hook must support conditional file handling before loading previews.
interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file: FileWithPreview | null) => void;
  onRemove?: () => void;
  defaultAvatar?: string;
  disabled?: boolean; // <-- added disabled prop
  hideLabel?: boolean; // <-- new prop to conditionally hide section title
}

export default function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  onRemove,
  defaultAvatar,
  disabled = false, // <-- default to false
  hideLabel = false, // <-- default to false
}: AvatarUploadProps) {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: 'image/*',
    multiple: false,
    onFilesChange: (files) => {
      return onFileChange?.(files[0] || null);
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar;

  const handleRemove = () => {
    if (disabled) return; // <-- prevent remove if disabled
    if (currentFile) {
      removeFile(currentFile.id);
    }
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4',
        className,
        disabled && 'pointer-events-none opacity-60',
      )}
      aria-disabled={disabled || undefined}
    >
      {/* Avatar Preview */}
      <div className="relative">
        <div
          className={cn(
            'group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/20',
            previewUrl && 'border-solid',
            disabled && 'cursor-not-allowed',
          )}
          onDragEnter={disabled ? undefined : handleDragEnter}
          onDragLeave={disabled ? undefined : handleDragLeave}
          onDragOver={disabled ? undefined : handleDragOver}
          onDrop={disabled ? undefined : handleDrop}
          onClick={disabled ? undefined : openFileDialog}
          aria-disabled={disabled || undefined}
        >
          <input {...getInputProps({ disabled })} className="sr-only" disabled={disabled} />

          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              style={{ objectFit: 'cover' }}
              unoptimized={Boolean(currentFile?.preview)} // local files can't be optimized by Next.js
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="text-muted-foreground size-6" />
            </div>
          )}
        </div>

        {/* Remove Button - only show when file is uploaded */}
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="absolute end-0 top-0 size-6 rounded-full"
            aria-label="Remove avatar"
            disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions (conditionally rendered) */}
      {!hideLabel && (
        <div className="space-y-0.5 text-center">
          <p className="text-sm font-medium">{currentFile ? 'Avatar uploaded' : 'Upload avatar'}</p>
          <p className="text-muted-foreground text-xs">PNG, JPG up to {formatBytes(maxSize)}</p>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
