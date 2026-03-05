-------------------------------------------------------------------------------
-- MIGRATION: 2_business_profiles.sql
-------------------------------------------------------------------------------

-- Purpose:
--   Public-facing branding and contact information for each business.

DROP TABLE IF EXISTS public.business_profiles CASCADE;

CREATE TABLE IF NOT EXISTS public.business_profiles (
    business_id           UUID         PRIMARY KEY REFERENCES public.businesses(id) ON DELETE CASCADE,
    display_name          VARCHAR(255) NOT NULL UNIQUE,
    logo_url              TEXT,
    category              VARCHAR(100) NOT NULL,
    short_description     TEXT,
    support_email         VARCHAR(255) NOT NULL,
    whatsapp_number       VARCHAR(20)  NOT NULL,
    is_whatsapp_verified  BOOLEAN      DEFAULT false,
    updated_at            TIMESTAMPTZ  DEFAULT NOW()
);

-- Row-Level Security: Enable for business_profiles
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.business_profiles;
DROP POLICY IF EXISTS "Owners can update their profiles" ON public.business_profiles;
DROP POLICY IF EXISTS "Owners can insert their profiles" ON public.business_profiles;

-- Public can view all profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.business_profiles
    FOR SELECT
    USING (true);

-- Owners can update their own profiles
CREATE POLICY "Owners can update their profiles"
    ON public.business_profiles
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses
            WHERE id = public.business_profiles.business_id
                AND owner_id = auth.uid()
        )
    );

-- Owners can insert their own profiles
CREATE POLICY "Owners can insert their profiles"
    ON public.business_profiles
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses
            WHERE id = public.business_profiles.business_id
                AND owner_id = auth.uid()
        )
    );

-------------------------------------------------------------------------------
-- Trigger: Automatically update `updated_at` on business_profiles updates
-------------------------------------------------------------------------------

DROP TRIGGER IF EXISTS set_timestamp_profiles ON public.business_profiles;

CREATE TRIGGER set_timestamp_profiles
    BEFORE UPDATE ON public.business_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();
