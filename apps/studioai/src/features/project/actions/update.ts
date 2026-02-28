// const updateProject = useCallback(
//   async (
//     projectId: string,
//     updates: Partial<Pick<Project, 'name' | 'description'>>,
//   ) => {
//     if (!userId) throw new Error('User not authenticated');

//     // Optimistic update
//     const updatedProjects = data?.map((p) =>
//       p.id === projectId ? { ...p, ...updates } : p,
//     );
//     await mutate(updatedProjects, false);

//     const { error } = await supabase
//       .from('projects')
//       .update(updates)
//       .eq('id', projectId);

//     if (error) {
//       await mutate();
//       throw error;
//     }

//     await mutate();
//   },
//   [userId, data, mutate, supabase],
// );
