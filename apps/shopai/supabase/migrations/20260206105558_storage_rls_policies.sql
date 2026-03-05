--------------------------------------------------------------------------------
-- Migration: {date}_storage_rls_policies.sql
-- Purpose: RLS policies for storage.objects and helper functions
--------------------------------------------------------------------------------

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Helper function to extract business_id from storage path
CREATE OR REPLACE FUNCTION public.get_business_id_from_path(name TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN (string_to_array(name, '/'))[2];
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 3. STORAGE RLS POLICIES
-- ==========================================

-- A. PUBLIC ASSETS (Read: Everyone, Write: Auth)

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "Auth users upload temp public" ON storage.objects;
CREATE POLICY "Auth users upload temp public"
  ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
      bucket_id = 'public-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
  );

-- Allow users to update (overwrite) their own files in the temp folder
DROP POLICY IF EXISTS "Auth users update own public temp files" ON storage.objects;
CREATE POLICY "Auth users update own public temp files"
  ON storage.objects
  FOR UPDATE TO authenticated
  USING (
      bucket_id = 'public-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  );

-- UNIQUE POLICY: Allow users to delete their own temp/avatars/logos files in public-assets
DROP POLICY IF EXISTS "Auth users delete own public temp files" ON storage.objects;
CREATE POLICY "Auth users delete own public temp files"
  ON storage.objects
  FOR DELETE TO authenticated
  USING (
      bucket_id = 'public-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  );


-- B. PRIVATE ASSETS (Strict Access Control)

-- 1. Upload to Temp (Standard for all private files)
DROP POLICY IF EXISTS "Auth users upload temp private" ON storage.objects;
CREATE POLICY "Auth users upload temp private"
  ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
  );

-- Allow users to update (overwrite) their own files in the temp folder
DROP POLICY IF EXISTS "Auth users update own temp files" ON storage.objects;
CREATE POLICY "Auth users update own temp files"
  ON storage.objects
  FOR UPDATE TO authenticated
  USING (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  )
  WITH CHECK (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  );

-- UNIQUE POLICY: Allow users to delete their own temp/avatars/logos files in private-assets
DROP POLICY IF EXISTS "Auth users delete own temp private files" ON storage.objects;
CREATE POLICY "Auth users delete own temp private files"
  ON storage.objects
  FOR DELETE TO authenticated
  USING (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  );


-- 2. Preview Own Temp Files (CRITICAL FIX)
DROP POLICY IF EXISTS "Users view own temp private" ON storage.objects;
CREATE POLICY "Users view own temp private"
  ON storage.objects
  FOR SELECT TO authenticated
  USING (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] IN ('temp', 'avatars', 'logos')
      AND auth.uid() = owner
  );

-- 3. Business Scope: Members view Business Files
DROP POLICY IF EXISTS "Business members view business files" ON storage.objects;
CREATE POLICY "Business members view business files"
  ON storage.objects
  FOR SELECT TO authenticated
  USING (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] = 'businesses'
      AND EXISTS (
          SELECT 1
          FROM public.business_members bm
          WHERE bm.user_id = auth.uid()
            AND bm.business_id::TEXT = public.get_business_id_from_path(name)
      )
  );

-- 4. User Scope: Users view their OWN personal private files (e.g. KYC)
DROP POLICY IF EXISTS "Users view own private files" ON storage.objects;
CREATE POLICY "Users view own private files"
  ON storage.objects
  FOR SELECT TO authenticated
  USING (
      bucket_id = 'private-assets'
      AND (storage.foldername(name))[1] = 'users'
      AND (storage.foldername(name))[2] = auth.uid()::TEXT
  );
