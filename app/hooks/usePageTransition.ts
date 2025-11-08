import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const usePageTransition = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return pathname;
};
