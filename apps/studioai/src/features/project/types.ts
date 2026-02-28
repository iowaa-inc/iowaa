import { Enums, Tables } from '@/types/supabase';

export type Project = Tables<'projects'>;
export type ProjectMember = Tables<'project_members'>;
export type ProjectRole = Enums<'project_role'>;

export interface ProjectWithMembership extends Project {
  role: ProjectRole;
}
