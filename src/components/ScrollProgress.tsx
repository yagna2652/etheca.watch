'use client';
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Background track */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'var(--color-border)',
          zIndex: 999,
        }}
      />
      {/* Progress indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent-foreground) 100%)',
          transformOrigin: '0%',
          transform: `scaleX(${scrollProgress})`,
          zIndex: 1000,
          boxShadow: '0 0 10px rgba(42, 42, 50, 0.3)',
          transition: 'transform 0.1s ease-out',
        }}
      />
    </>
  );
};

export default ScrollProgress;