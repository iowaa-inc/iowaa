-- ==========================================
--  Trigger: Auto-add project creator as owner
-- ==========================================
-- Fires on every project INSERT. Adds the creator (created_by) as owner
-- in project_members. Single transaction: if member insert fails, project
-- insert rolls back. Reused for both signup (Personal) and app-created projects.

CREATE OR REPLACE FUNCTION public.handle_project_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.project_members (project_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner')
  ON CONFLICT (project_id, user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_project_created ON public.projects;
CREATE TRIGGER on_project_created
  AFTER INSERT ON public.projects
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_project_created();

-- ==========================================
--  Update handle_new_auth_user: remove project_members insert
-- ==========================================
-- The trigger above now handles adding the creator as owner.
-- handle_new_auth_user only needs to insert the project; the trigger
-- will add the user as owner automatically.

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  personal_project_id uuid;
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.projects (name, description, created_by)
  VALUES ('Personal', 'Your personal project', NEW.id)
  RETURNING id INTO personal_project_id;
  -- Trigger on_project_created adds creator as owner automatically

  INSERT INTO public.user_settings (user_id, preferences, active_project_id)
  VALUES (NEW.id, '{}'::jsonb, personal_project_id)
  ON CONFLICT (user_id) DO UPDATE
  SET active_project_id = EXCLUDED.active_project_id;

  RETURN NEW;
END;
$$;

-- ==========================================
--  Drop RLS policy: no longer needed
-- ==========================================
-- The trigger runs as SECURITY DEFINER and bypasses RLS.
-- App-created projects no longer need the creator to insert into project_members.

DROP POLICY IF EXISTS "Project creators can add themselves as owner" ON public.project_members;

