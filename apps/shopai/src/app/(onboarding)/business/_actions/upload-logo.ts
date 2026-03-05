'use server';

import { FileUploadType, getFileConfig } from '@/configs/file-config';

import { createClient } from '@/lib/supabase/server';

export type UploadResult =
  | { success: true; data: { url: string; path: string } }
  | { success: false; error: string };

/**
 * Generic function to upload a temporary file based on a configuration type.
 */
export async function uploadTempFile(
  formData: FormData,
  type: FileUploadType,
): Promise<UploadResult> {
  try {
    const config = getFileConfig(type);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthorized. Please log in.',
      };
    }

    const file = formData.get('file') as File | null;
    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      };
    }

    const fileValidation = config.validationSchema.safeParse(file);
    if (!fileValidation.success) {
      return {
        success: false,
        error: fileValidation.error.errors[0]?.message || 'Invalid file',
      };
    }

    const fileExt = file.name.split('.').pop() || 'png';
    const timestamp = Date.now();

    const newFileName = `${config.fullPrefix}${user.id}-${timestamp}.${fileExt}`;
    const searchPattern = `${config.fullPrefix}${user.id}-%`;

    const { data: oldRecords, error: fetchError } = await supabase
      .from('temp_uploads')
      .select('storage_path')
      .eq('bucket_id', config.bucketName) // Use config bucket
      .like('storage_path', searchPattern);

    if (fetchError) {
      console.error('Error checking for existing temp files:', fetchError);
      // Decide if you want to abort or continue. Continuing is usually safer for UX.
    }

    if (oldRecords && oldRecords.length > 0) {
      const pathsToDelete = oldRecords.map((r) => r.storage_path);

      await supabase.storage.from(config.bucketName).remove(pathsToDelete);

      await supabase.from('temp_uploads').delete().in('storage_path', pathsToDelete);
    }

    const { error: insertError } = await supabase.from('temp_uploads').insert({
      storage_path: newFileName,
      bucket_id: config.bucketName,
    });

    if (insertError) {
      return {
        success: false,
        error: `Failed to track upload: ${insertError.message}`,
      };
    }

    const { error: uploadError } = await supabase.storage
      .from(config.bucketName)
      .upload(newFileName, file, {
        cacheControl: '0',
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      // Rollback DB entry
      await supabase
        .from('temp_uploads')
        .delete()
        .eq('storage_path', newFileName)
        .eq('bucket_id', config.bucketName);

      return {
        success: false,
        error: uploadError.message || 'Failed to upload file',
      };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(config.bucketName).getPublicUrl(newFileName);

    return {
      success: true,
      data: { url: publicUrl, path: newFileName },
    };
  } catch (error) {
    console.error(`Upload error (${type}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function removeTempFile(fileUrl: string, type: FileUploadType): Promise<UploadResult> {
  try {
    const config = getFileConfig(type);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Unauthorized.' };
    }

    if (!fileUrl || typeof fileUrl !== 'string') {
      return { success: false, error: 'Invalid file URL' };
    }

    let path = '';
    const prefixIndex = fileUrl.indexOf(config.fullPrefix);

    if (prefixIndex !== -1) {
      path = fileUrl.substring(prefixIndex);
    } else {
      return {
        success: false,
        error: 'URL does not match expected storage path.',
      };
    }

    if (!path.startsWith(config.fullPrefix)) {
      return {
        success: false,
        error: `Security Check: Can only remove files from ${config.folderPath}`,
      };
    }

    const { error: storageError } = await supabase.storage.from(config.bucketName).remove([path]);

    if (storageError) {
      console.error('Failed to delete file from storage:', storageError);
      return {
        success: false,
        error: storageError.message,
      };
    }

    const { error: trackingError } = await supabase.from('temp_uploads').delete().match({
      storage_path: path,
      bucket_id: config.bucketName,
    });

    if (trackingError) {
      console.warn('File deleted but failed to remove DB record:', trackingError);
    }

    return {
      success: true,
      data: { url: '', path: '' },
    };
  } catch (error) {
    console.error(`Remove error (${type}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
