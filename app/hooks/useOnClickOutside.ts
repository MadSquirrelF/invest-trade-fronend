import { useEffect, RefObject, useCallback } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => unknown,
) => {
  const listener = useCallback((event: Event) => {
    const el = ref.current;

    if (!el || el.contains((event.target as Node) || null)) {
      return;
    }

    handler(event);
  }, [ref, handler]);

  useEffect(() => {
    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]);
};
