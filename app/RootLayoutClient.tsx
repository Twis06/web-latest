'use client';

import { useState, useEffect, ReactNode } from 'react';
import Preloader from './components/Preloader';

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setShowPreloader(false);
    } else {
      // Mark as visited for this session
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {children}
    </>
  );
}
