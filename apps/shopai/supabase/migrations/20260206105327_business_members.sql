-------------------------------------------------------------------------------
-- MIGRATION: {date}_business_members.sql
-------------------------------------------------------------------------------

-- Purpose:
--   Many-to-many link between users and businesses.
--   Allows multiple members per business and a user to belong to many businesses.
--   Owners (from public.businesses.owner_id) can manage their members.

-- Table: public.business_members
DROP TABLE IF EXISTS public.business_members CASCADE;

CREATE TABLE IF NOT EXISTS public.business_members (
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Simple role model; adjust as needed
    role        TEXT NOT NULL DEFAULT 'member'
                CHECK (role IN ('owner', 'admin', 'member', 'viewer')),

    invited_by  UUID REFERENCES auth.users(id),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY (business_id, user_id)
);

-------------------------------------------------------------------------------
-- Row-Level Security
-------------------------------------------------------------------------------

ALTER TABLE public.business_members ENABLE ROW LEVEL SECURITY;

-- 1) Members can see their own memberships
DROP POLICY IF EXISTS "Members can view their own business memberships" ON public.business_members;
DROP POLICY IF EXISTS "Business owners manage members" ON public.business_members;
DROP POLICY IF EXISTS "Service role full access to business_members" ON public.business_members;

CREATE POLICY "Members can view their own business memberships"
    ON public.business_members
    FOR SELECT
    USING (auth.uid() = user_id);

-- 2) Business owners can manage all members of their business
CREATE POLICY "Business owners manage members"
    ON public.business_members
    FOR ALL
    USING (
        EXISTS (
            SELECT 1
            FROM public.businesses b
            WHERE b.id = public.business_members.business_id
              AND b.owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.businesses b
            WHERE b.id = public.business_members.business_id
              AND b.owner_id = auth.uid()
        )
    );

-- 3) Service role has full access (for backend jobs / admin tasks)
CREATE POLICY "Service role full access to business_members"
    ON public.business_members
    FOR ALL TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

-------------------------------------------------------------------------------
-- Trigger: Automatically update `updated_at` on business_members updates
-------------------------------------------------------------------------------

-- Ensure updated_at is maintained automatically on UPDATE
DROP TRIGGER IF EXISTS set_timestamp_business_members ON public.business_members;

CREATE TRIGGER set_timestamp_business_members
    BEFORE UPDATE ON public.business_members
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();