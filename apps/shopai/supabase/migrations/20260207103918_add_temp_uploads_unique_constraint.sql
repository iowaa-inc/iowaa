--------------------------------------------------------------------------------
-- Migration: Add unique constraint to temp_uploads table
-- Purpose: Enable upsert operations on (storage_path, bucket_id) combination
--------------------------------------------------------------------------------

ALTER TABLE public.temp_uploads
ADD CONSTRAINT temp_uploads_path_bucket_unique 
UNIQUE (storage_path, bucket_id);

