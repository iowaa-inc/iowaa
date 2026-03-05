
-------------------------------------------------------------------------------
-- MIGRATION: {date}_core_business_registry.sql
-------------------------------------------------------------------------------

-- Purpose:
-- The anchor table linking a user to a business entity.
-- Contains system-level status, not public data.

-- Enable necessary extensions (put in first migration for safety)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS public.businesses CASCADE;

CREATE TABLE IF NOT EXISTS public.businesses (
    id                      UUID        PRIMARY KEY      DEFAULT gen_random_uuid(),
    owner_id                UUID        NOT NULL         REFERENCES auth.users(id) ON DELETE CASCADE,
    onboarding_step         SMALLINT    DEFAULT 0,
    is_onboarding_completed BOOLEAN     DEFAULT false,
    is_verified             BOOLEAN     DEFAULT false,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(owner_id)
);

-- Row-Level Security: Businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can update their own business" ON public.businesses;
DROP POLICY IF EXISTS "Users can insert their own business" ON public.businesses;

CREATE POLICY "Users can view their own business"
    ON public.businesses
    FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can update their own business"
    ON public.businesses
    FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own business"
    ON public.businesses
    FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-------------------------------------------------------------------------------
-- Trigger: Automatically update `updated_at` on businesses updates
-------------------------------------------------------------------------------

DROP TRIGGER IF EXISTS set_timestamp_businesses ON public.businesses;

CREATE TRIGGER set_timestamp_businesses
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();
