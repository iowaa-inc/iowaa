/**
 * Derives initials from a display name (e.g. "John Doe" -> "JD").
 * Returns up to 2 characters from the first letter of each word.
 */
export function getInitials(name: string | null | undefined): string {
  if (!name || typeof name !== 'string') return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
