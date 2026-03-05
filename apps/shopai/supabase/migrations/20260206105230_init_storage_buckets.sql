--------------------------------------------------------------------------------
-- Migration: {date}_init_storage_buckets.sql
-- Purpose: Create storage buckets for public and private assets
--------------------------------------------------------------------------------

-- ==========================================
-- 1. SETUP BUCKETS
-- ==========================================

-- A. PUBLIC (Images, Avatars, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', TRUE)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public;

-- B. PRIVATE (Contracts, IDs, Invoices, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('private-assets', 'private-assets', FALSE)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public;
