-- ==========================================
--  Enum: Project Role
-- ==========================================

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_role') THEN
    CREATE TYPE public.project_role AS ENUM ('owner', 'admin', 'member', 'viewer');
  END IF;
END $$;

COMMENT ON TYPE public.project_role IS 'Role types for project membership';

-- ==========================================
--  Table: Projects
-- ==========================================

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.projects IS 'Projects that users can belong to and collaborate on';

-- ==========================================
--  Table: Project Members
-- ==========================================

CREATE TABLE IF NOT EXISTS public.project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.project_role NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  UNIQUE(project_id, user_id)
);

COMMENT ON TABLE public.project_members IS 'Tracks user membership and roles within projects';

CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_project_members_role ON public.project_members(role);

-- ==========================================
--  Maintenance Triggers
-- ==========================================

DROP TRIGGER IF EXISTS set_timestamp_on_projects ON public.projects;
CREATE TRIGGER set_timestamp_on_projects
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_on_project_members ON public.project_members;
CREATE TRIGGER set_timestamp_on_project_members
BEFORE UPDATE ON public.project_members
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

-- ==========================================
--  Prevent renaming or modifying Personal projects
-- ==========================================

CREATE OR REPLACE FUNCTION public.prevent_personal_project_modification()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Prevent renaming Personal projects
  IF OLD.name = 'Personal' AND NEW.name != 'Personal' THEN
    RAISE EXCEPTION 'Cannot rename Personal project';
  END IF;
  
  -- Prevent changing created_by of Personal projects
  IF OLD.name = 'Personal' AND OLD.created_by != NEW.created_by THEN
    RAISE EXCEPTION 'Cannot change owner of Personal project';
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_personal_project_modification ON public.projects;
CREATE TRIGGER prevent_personal_project_modification
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE PROCEDURE public.prevent_personal_project_modification();

---------------------------------------------------------------
-- SCOPE 3:  SECURITY (ROW LEVEL SECURITY & POLICIES)
---------------------------------------------------------------

-- ==========================================
--  Row Level Security (RLS) and Policies: Projects
-- ==========================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read projects they are members of" ON public.projects;
CREATE POLICY "Users can read projects they are members of" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Project owners and admins can update projects" ON public.projects;
CREATE POLICY "Project owners and admins can update projects" ON public.projects
  FOR UPDATE USING 
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id = auth.uid()
      AND project_members.role IN ('owner', 'admin')
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id = auth.uid()
      AND project_members.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "Project owners can delete projects" ON public.projects;
CREATE POLICY "Project owners can delete projects" ON public.projects
  FOR DELETE USING (
    -- Cannot delete Personal projects
    name != 'Personal'
    AND EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = projects.id
      AND project_members.user_id = auth.uid()
      AND project_members.role = 'owner'
    )
  );

-- ==========================================
--  Row Level Security (RLS) and Policies: Project Members
-- ==========================================

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

-- To allow users to "see all members of projects they belong to," create a security-definer view or helper function.
-- Example: you can define a view as follows:
-- CREATE VIEW public.view_project_memberships AS
--   SELECT m.*
--   FROM public.project_members m
--   JOIN public.project_members my_membership
--     ON m.project_id = my_membership.project_id
--   WHERE my_membership.user_id = auth.uid();
-- Then grant SELECT on this view as needed.

-- DROP POLICY IF EXISTS "Users can read members of projects they belong to" ON public.project_members;
-- CREATE POLICY "Users can read members of projects they belong to" ON public.project_members
--   FOR SELECT USING (
--     EXISTS (
--       SELECT 1 FROM public.project_members pm
--       WHERE pm.project_id = project_members.project_id
--       AND pm.user_id = auth.uid()
--     )
--   );

DROP POLICY IF EXISTS "Project owners and admins can add members" ON public.project_members;
CREATE POLICY "Project owners and admins can add members" ON public.project_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = project_members.project_id
      AND pm.user_id = auth.uid()
      AND pm.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "Project owners and admins can update member roles" ON public.project_members;
CREATE POLICY "Project owners and admins can update member roles" ON public.project_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = project_members.project_id
      AND pm.user_id = auth.uid()
      AND pm.role IN ('owner', 'admin')
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = project_members.project_id
      AND pm.user_id = auth.uid()
      AND pm.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "Project owners and admins can remove members" ON public.project_members;
CREATE POLICY "Project owners and admins can remove members" ON public.project_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      WHERE pm.project_id = project_members.project_id
      AND pm.user_id = auth.uid()
      AND pm.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "Users can leave projects themselves" ON public.project_members;
CREATE POLICY "Users can leave projects themselves" ON public.project_members
  FOR DELETE USING (
    auth.uid() = user_id
    -- Cannot leave Personal project
    AND NOT EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_members.project_id
      AND projects.name = 'Personal'
      AND projects.created_by = auth.uid()
    )
  );

