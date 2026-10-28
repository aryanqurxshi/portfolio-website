'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  image?: string;
  caption?: string;
  href?: string;
}

const EDGE = 8;

/**
 * Inline trigger that pops a small preview card above the text: on hover for
 * mouse users, on tap for touch users (tap again or tap elsewhere to close).
 */
export function HoverCard({ children, image, caption, href }: HoverCardProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);

  // Keep the card inside the viewport when the trigger sits near an edge.
  useLayoutEffect(() => {
    if (!open || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const base = rect.left - shift;
    const width = rect.width;
    let next = 0;
    if (base < EDGE) next = EDGE - base;
    else if (base + width > window.innerWidth - EDGE) next = window.innerWidth - EDGE - (base + width);
    if (next !== shift) setShift(next);
  }, [open, shift]);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const trigger = href ? (
    <a href={href} target={href.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    children
  );

  return (
    <span
      ref={wrapRef}
      className="relative inline-block cursor-pointer"
      tabIndex={href ? undefined : 0}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onPointerUp={(e) => {
        if (e.pointerType !== 'mouse' && !href) setOpen((v) => !v);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {trigger}
      <span
        ref={cardRef}
        role="tooltip"
        style={{ transform: `translateX(calc(-50% + ${shift}px)) scale(${open ? 1 : 0.9})` }}
        className={`hover-card pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 block w-[min(60vw,220px)] origin-bottom overflow-hidden shadow-xl transition-all duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {image && (
          <Image
            src={image}
            alt=""
            width={440}
            height={248}
            className="block h-auto w-full rounded-[3px]"
          />
        )}
        {caption && (
          <span className={`block px-1 text-xs leading-snug text-white/80 ${image ? 'pt-1.5' : 'py-0.5'}`}>
            {caption}
          </span>
        )}
      </span>
    </span>
  );
}
