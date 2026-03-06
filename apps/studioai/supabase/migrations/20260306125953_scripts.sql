CREATE TABLE IF NOT EXISTS public.scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.scripts IS 'Scripts associated with projects';

CREATE INDEX idx_scripts_project_id ON public.scripts(project_id);

-- Maintenance Triggers
DROP TRIGGER IF EXISTS set_timestamp_on_scripts ON public.scripts;
CREATE TRIGGER set_timestamp_on_scripts
BEFORE UPDATE ON public.scripts
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

-- Row Level Security
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read scripts of projects they are members of" ON public.scripts;
CREATE POLICY "Users can read scripts of projects they are members of" ON public.scripts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = scripts.project_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create scripts in projects they are members of" ON public.scripts;
CREATE POLICY "Users can create scripts in projects they are members of" ON public.scripts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = scripts.project_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update scripts in projects they are members of" ON public.scripts;
CREATE POLICY "Users can update scripts in projects they are members of" ON public.scripts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = scripts.project_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete scripts in projects they are members of" ON public.scripts;
CREATE POLICY "Users can delete scripts in projects they are members of" ON public.scripts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.project_members
      WHERE project_members.project_id = scripts.project_id
      AND project_members.user_id = auth.uid()
    )
  );
