import { useState, useEffect, useCallback } from 'react';

export function useScrollTop(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback((): void => {
    if (window.scrollY > threshold) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrolled;
}
