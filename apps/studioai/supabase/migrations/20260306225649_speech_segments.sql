CREATE TABLE IF NOT EXISTS public.speech_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid NOT NULL REFERENCES public.scripts(id) ON DELETE CASCADE,
  "order" integer NOT NULL,
  timestamp numeric NOT NULL,
  duration numeric,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  expressions jsonb NOT NULL DEFAULT '[]'::jsonb,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.speech_segments IS 'Speech segments for a script dialog';

CREATE INDEX IF NOT EXISTS idx_speech_segments_script_id ON public.speech_segments(script_id);
CREATE INDEX IF NOT EXISTS idx_speech_segments_order ON public.speech_segments("order");

-- Maintenance Triggers
DROP TRIGGER IF EXISTS set_timestamp_on_speech_segments ON public.speech_segments;
CREATE TRIGGER set_timestamp_on_speech_segments
BEFORE UPDATE ON public.speech_segments
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at_timestamp();

-- Row Level Security
ALTER TABLE public.speech_segments ENABLE ROW LEVEL SECURITY;

-- We allow users to read/write/delete speech segments if they have access to the parent script (which means they have access to the project).
-- Since scripts RLS already requires project membership, we can join with scripts to check project membership.

DROP POLICY IF EXISTS "Users can read speech segments of scripts in their projects" ON public.speech_segments;
CREATE POLICY "Users can read speech segments of scripts in their projects" ON public.speech_segments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.scripts
      JOIN public.project_members ON project_members.project_id = scripts.project_id
      WHERE scripts.id = speech_segments.script_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create speech segments in scripts of their projects" ON public.speech_segments;
CREATE POLICY "Users can create speech segments in scripts of their projects" ON public.speech_segments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.scripts
      JOIN public.project_members ON project_members.project_id = scripts.project_id
      WHERE scripts.id = speech_segments.script_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update speech segments in scripts of their projects" ON public.speech_segments;
CREATE POLICY "Users can update speech segments in scripts of their projects" ON public.speech_segments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.scripts
      JOIN public.project_members ON project_members.project_id = scripts.project_id
      WHERE scripts.id = speech_segments.script_id
      AND project_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete speech segments in scripts of their projects" ON public.speech_segments;
CREATE POLICY "Users can delete speech segments in scripts of their projects" ON public.speech_segments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.scripts
      JOIN public.project_members ON project_members.project_id = scripts.project_id
      WHERE scripts.id = speech_segments.script_id
      AND project_members.user_id = auth.uid()
    )
  );
