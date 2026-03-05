-------------------------------------------------------------------------------
-- MIGRATION: 3_business_operations.sql
-------------------------------------------------------------------------------

-- Purpose:
--   Logistics, regional configurations, and availability for each business.

DROP TABLE IF EXISTS public.business_operations CASCADE;

CREATE TABLE IF NOT EXISTS public.business_operations (
    business_id              UUID           PRIMARY KEY REFERENCES public.businesses(id) ON DELETE CASCADE,
    registration_country_iso VARCHAR(2),
    timezone                 VARCHAR(100),
    weekly_schedule          JSONB          DEFAULT '{}'::jsonb,
    updated_at               TIMESTAMPTZ    DEFAULT NOW()
);

-- Row-Level Security: Enable for business_operations
ALTER TABLE public.business_operations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view operations (for open/close status)" ON public.business_operations;
DROP POLICY IF EXISTS "Owners can manage operations" ON public.business_operations;

-- Public can view open/close status
CREATE POLICY "Public can view operations (for open/close status)"
    ON public.business_operations
    FOR SELECT
    USING (true);

-- Owners can manage their business operations
CREATE POLICY "Owners can manage operations"
    ON public.business_operations
    FOR ALL
    USING (
        EXISTS (
            SELECT 1
            FROM public.businesses
            WHERE id = public.business_operations.business_id
              AND owner_id = auth.uid()
        )
    );

-------------------------------------------------------------------------------
-- Trigger: Automatically update `updated_at` on business_operations updates
-------------------------------------------------------------------------------

DROP TRIGGER IF EXISTS set_timestamp_operations ON public.business_operations;

CREATE TRIGGER set_timestamp_operations
    BEFORE UPDATE ON public.business_operations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();
