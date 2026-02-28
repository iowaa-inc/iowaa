-- ==========================================
--  Table
-- ==========================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.user_profiles IS 'Profile information for authenticated users.';

-- ==========================================
--  Attach Maintenance Trigger
-- ==========================================

DROP TRIGGER IF EXISTS set_timestamp_on_user_profiles ON public.user_profiles;
CREATE TRIGGER set_timestamp_on_user_profiles
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

-- ==========================================
--  Row Level Security (RLS) and Policies
-- ==========================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
