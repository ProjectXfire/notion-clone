import { useState, useEffect } from 'react';

function useOrigin(): string {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== 'undefined' && window.location.origin.length > 0
      ? window.location.origin
      : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return '';

  return origin;
}
export default useOrigin;
