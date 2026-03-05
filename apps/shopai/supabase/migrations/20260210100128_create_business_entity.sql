-------------------------------------------------------------------------------
-- FUNCTION: create_business_entity
-- Purpose: Orchestrates the atomic creation of a business across all tables.
-------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.create_business_entity(
    p_display_name     TEXT,
    p_category         TEXT,
    p_description      TEXT,
    p_support_email    TEXT,
    p_whatsapp_number  TEXT,
    p_logo_url         TEXT,
    p_weekly_schedule  JSONB,
    p_owner_id         UUID DEFAULT auth.uid() -- Defaults to caller if not passed
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER         -- Runs with privileges of the creator to ensure all inserts succeed
SET search_path = public -- Security best practice
AS $$
DECLARE
    v_business_id   UUID;
BEGIN
    ----------------------------------------------------------------------------
    -- 1. Create the Anchor Business Record
    ----------------------------------------------------------------------------
    INSERT INTO public.businesses (
        owner_id,
        onboarding_step,
        is_onboarding_completed
    ) VALUES (
        p_owner_id,
        1,       -- Initial creation counts as step 1
        true     -- Mark as completed if all info is gathered
    )
    RETURNING id INTO v_business_id;

    ----------------------------------------------------------------------------
    -- 2. Create the Public Profile
    ----------------------------------------------------------------------------
    INSERT INTO public.business_profiles (
        business_id,
        display_name,
        category,
        short_description,
        support_email,
        whatsapp_number,
        logo_url
    ) VALUES (
        v_business_id,
        p_display_name,
        p_category,
        p_description,
        p_support_email,
        p_whatsapp_number,
        p_logo_url
    );

    ----------------------------------------------------------------------------
    -- 3. Create Operational Settings (Schedule)
    ----------------------------------------------------------------------------
    INSERT INTO public.business_operations (
        business_id,
        weekly_schedule
    ) VALUES (
        v_business_id,
        p_weekly_schedule
    );

    ----------------------------------------------------------------------------
    -- 4. Link the User as the Owner in the Members Table
    ----------------------------------------------------------------------------
    INSERT INTO public.business_members (
        business_id,
        user_id,
        role
    ) VALUES (
        v_business_id,
        p_owner_id,
        'owner'
    );

    ----------------------------------------------------------------------------
    -- Return the new Business ID and success status
    ----------------------------------------------------------------------------
    RETURN json_build_object(
        'success', true,
        'business_id', v_business_id
    );

EXCEPTION WHEN OTHERS THEN
    -- If any step above fails, the transaction automatically rolls back.
    -- We raise the exception to be caught by the client.
    RAISE EXCEPTION 'Failed to onboard business: %', SQLERRM;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_business_entity TO authenticated;
