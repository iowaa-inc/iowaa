-- ==========================================
--  Add active_project_id to user_settings
-- ==========================================

ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS active_project_id uuid REFERENCES public.projects(id) ON DELETE RESTRICT;

-- Make it NOT NULL after adding the column (for existing rows, we'll handle via migration)
-- First, ensure all existing users have a Personal project set
DO $$
DECLARE
  user_record RECORD;
  personal_project_id uuid;
BEGIN
  FOR user_record IN SELECT id FROM auth.users LOOP
    -- Find or create Personal project for this user
    SELECT id INTO personal_project_id
    FROM public.projects
    WHERE name = 'Personal' AND created_by = user_record.id
    LIMIT 1;
    
    -- If no Personal project exists, create one
    IF personal_project_id IS NULL THEN
      INSERT INTO public.projects (name, description, created_by)
      VALUES ('Personal', 'Your personal project', user_record.id)
      RETURNING id INTO personal_project_id;
      
      -- Add user as owner
      INSERT INTO public.project_members (project_id, user_id, role)
      VALUES (personal_project_id, user_record.id, 'owner')
      ON CONFLICT (project_id, user_id) DO NOTHING;
    END IF;
    
    -- Ensure user_settings exists and has active_project_id set
    INSERT INTO public.user_settings (user_id, preferences, active_project_id)
    VALUES (user_record.id, '{}'::jsonb, personal_project_id)
    ON CONFLICT (user_id) DO UPDATE
    SET active_project_id = COALESCE(user_settings.active_project_id, personal_project_id);
  END LOOP;
END $$;

-- Now make the column NOT NULL (only if it's not already NOT NULL)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'user_settings' 
    AND column_name = 'active_project_id'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.user_settings
    ALTER COLUMN active_project_id SET NOT NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_settings_active_project_id ON public.user_settings(active_project_id);

COMMENT ON COLUMN public.user_settings.active_project_id IS 'The currently active project for the user (cannot be null)';

-- ==========================================
--  Update RLS policy to validate active_project_id
-- ==========================================

DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;
CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE 
  USING (auth.uid() = user_id) 
  WITH CHECK (
    auth.uid() = user_id
    AND active_project_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = user_settings.active_project_id
      AND project_members.user_id = auth.uid()
    )
  );

-- ==========================================
--  Update handle_new_auth_user function to create Personal project
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  personal_project_id uuid;
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;

  -- Create Personal project for the new user
  INSERT INTO public.projects (name, description, created_by)
  VALUES ('Personal', 'Your personal project', NEW.id)
  RETURNING id INTO personal_project_id;

  -- Add user as owner of the Personal project
  INSERT INTO public.project_members (project_id, user_id, role)
  VALUES (personal_project_id, NEW.id, 'owner')
  ON CONFLICT (project_id, user_id) DO NOTHING;

  -- Create user settings and set Personal project as active
  INSERT INTO public.user_settings (user_id, preferences, active_project_id)
  VALUES (NEW.id, '{}'::jsonb, personal_project_id)
  ON CONFLICT (user_id) DO UPDATE
  SET active_project_id = EXCLUDED.active_project_id;

  RETURN NEW;
END;
$$;

