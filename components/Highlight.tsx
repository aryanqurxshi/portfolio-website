'use client';

import { useEffect, useRef, useState } from 'react';

export type HighlightTone = 'blue' | 'teal' | 'green' | 'garnet' | 'purple';

interface HighlightProps {
  children: React.ReactNode;
  // Stagger, in ms, so a list of highlights sweeps in one after another.
  delay?: number;
  // Brand colour of the thing being highlighted; yellow when unset.
  tone?: HighlightTone;
  className?: string;
}

export function Highlight({ children, delay = 0, tone, className = '' }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setOn(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <span ref={ref} data-tone={tone} className={`hl px-1 ${on ? 'hl-on' : ''} ${className}`}>
      {children}
    </span>
  );
}
