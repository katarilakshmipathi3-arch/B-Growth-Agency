'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export default function BlurReveal({
  children,
  className = '',
  delayMs = 0,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity,filter] ${
        isVisible
          ? 'opacity-100 blur-0 translate-y-0 scale-100'
          : 'opacity-0 blur-md translate-y-6 scale-[0.98]'
      } ${className}`}
    >
      {children}
    </div>
  );
}
