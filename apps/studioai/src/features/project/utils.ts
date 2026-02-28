/**
 * Extracts the project ID from a workspace path (e.g. /workspace/<project-id>).
 * Returns undefined if the path is null or does not match the pattern.
 */
export function getProjectIdFromPath(path: string | null): string | undefined {
  if (!path) return undefined;
  const match = path.match(/\/workspace\/([a-zA-Z0-9-]+)/);
  return match?.[1];
}

