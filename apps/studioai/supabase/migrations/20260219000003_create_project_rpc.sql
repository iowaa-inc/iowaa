-- ==========================================
--  RPC: create_project (bypasses RLS for Server Action compatibility)
-- ==========================================
-- Server Actions may not always pass the JWT to PostgREST in a way that
-- satisfies RLS. This SECURITY DEFINER function performs the insert with
-- elevated privileges while still verifying auth.uid() for created_by.

CREATE OR REPLACE FUNCTION public.create_project(p_name text, p_description text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_project public.projects;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.projects (name, description, created_by)
  VALUES (trim(p_name), nullif(trim(p_description), ''), v_user_id)
  RETURNING * INTO v_project;

  UPDATE public.user_settings
  SET active_project_id = v_project.id
  WHERE user_id = v_user_id;

  RETURN jsonb_build_object(
    'id', v_project.id,
    'name', v_project.name,
    'description', v_project.description,
    'created_by', v_project.created_by,
    'created_at', v_project.created_at,
    'updated_at', v_project.updated_at
  );
END;
$$;

