import { useEffect, useState } from 'react';

/**
 * React hook to listen for a CSS media query.
 * Returns true if the media query matches, false otherwise.
 * @param query - CSS media query string, e.g. "(min-width: 768px)"
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // For newer browsers
    mediaQueryList.addEventListener?.('change', listener);
    // For older browsers
    mediaQueryList.addListener?.(listener);

    // No need to call setMatches synchronously here;
    // The state is initialized from getMatches in useState,
    // and any future change triggers via the event listeners.

    return () => {
      mediaQueryList.removeEventListener?.('change', listener);
      mediaQueryList.removeListener?.(listener);
    };
    // Be careful with dependencies to avoid infinite loops
  }, [query]);

  return matches;
}
