-- ==========================================
--  Table
-- ==========================================

CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- ==========================================
--  Maintenance Trigger
-- ==========================================

CREATE TRIGGER set_timestamp_on_user_settings
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

---------------------------------------------------------------
-- SCOPE 3:  SECURITY (ROW LEVEL SECURITY & POLICIES)
---------------------------------------------------------------

-- ==========================================
--  Row Level Security (RLS) and Policies
-- ==========================================

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to ensure idempotence (optional, recommended in migrations)
DROP POLICY IF EXISTS "Users can read own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;

CREATE POLICY "Users can read own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
