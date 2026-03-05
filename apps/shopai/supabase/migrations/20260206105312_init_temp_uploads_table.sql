--------------------------------------------------------------------------------
-- Migration: {date}_init_temp_uploads_table.sql
-- Purpose: Set up table for temporary uploads & RLS for temp_uploads
--------------------------------------------------------------------------------

-- ==========================================
-- 1. SETUP TRACKING TABLE
-- ==========================================

DROP TABLE IF EXISTS public.temp_uploads CASCADE;

CREATE TABLE IF NOT EXISTS public.temp_uploads (
    id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id      UUID          REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    storage_path  TEXT          NOT NULL,
    bucket_id     TEXT          NOT NULL,
    created_at    TIMESTAMPTZ   DEFAULT NOW(),

    -- Maintain your unique constraint
    CONSTRAINT temp_uploads_storage_bucket_key UNIQUE (storage_path, bucket_id)
);

ALTER TABLE public.temp_uploads ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 2. TABLE POLICIES
-- ==========================================

-- 1. INSERT: Ensure users can only insert rows where they are the owner
DROP POLICY IF EXISTS "Users can insert temp tracking" ON public.temp_uploads;
CREATE POLICY "Users can insert temp tracking"
  ON public.temp_uploads
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- 2. SELECT: Users can only see their own uploads
DROP POLICY IF EXISTS "Users can view own temp tracking" ON public.temp_uploads;
CREATE POLICY "Users can view own temp tracking"
  ON public.temp_uploads
  FOR SELECT TO authenticated
  USING (auth.uid() = owner_id);

-- 4. DELETE: Service Role can still do anything (for cleanup jobs)
DROP POLICY IF EXISTS "Service Role can delete tracking" ON public.temp_uploads;
CREATE POLICY "Service Role can delete tracking"
  ON public.temp_uploads
  FOR DELETE TO service_role
  USING (TRUE);

-- 3. UPDATE: Users can only update their own rows
DROP POLICY IF EXISTS "Users can update temp tracking" ON public.temp_uploads;
CREATE POLICY "Users can update temp tracking"
  ON public.temp_uploads
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- UNIQUE POLICY: Allow users to delete their own records
DROP POLICY IF EXISTS "Users can delete their own temp tracking" ON public.temp_uploads;
CREATE POLICY "Users can delete their own temp tracking"
  ON public.temp_uploads
  FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);

