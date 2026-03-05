-------------------------------------------------------------------------------
-- MIGRATION: 6_business_shared_triggers.sql
-------------------------------------------------------------------------------

-- Utility: Automatically updates the `updated_at` field on row update.

CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
