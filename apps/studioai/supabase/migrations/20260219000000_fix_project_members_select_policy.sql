-- ==========================================
--  Fix: Add SELECT policy for project_members
-- ==========================================
-- The previous recursive policy caused infinite recursion and was removed.
-- Users need to read their own membership rows to fetch their projects.
-- This policy allows exactly that without recursion.

CREATE POLICY "Users can read own membership rows" ON public.project_members
  FOR SELECT
  USING (user_id = auth.uid());

