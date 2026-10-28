'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const LINES = [
  'hey, I’m Aryan 👋',
  'currently building VaultQ',
  'open to internships!',
  'click a project to dig in →',
];

interface CharacterProps {
  // Height utilities (e.g. h-[300px]) plus visibility; the image fills that height.
  className?: string;
  // Where the speech bubble sits: above the head, or beside it ('left') when
  // there is no room above, e.g. on phones.
  bubble?: 'above' | 'left';
}

/** The pixel-art character from the old site, with a speech bubble on hover/tap. */
export function Character({ className = '', bubble = 'above' }: CharacterProps) {
  const [line, setLine] = useState<number | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  // Say hi once, shortly after the name finishes typing.
  useEffect(() => {
    const show = setTimeout(() => setLine((l) => l ?? 0), 1700);
    const hide = setTimeout(() => setLine((l) => (l === 0 ? null : l)), 4800);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (line === null) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setLine(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [line]);

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Say hi"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setLine((l) => l ?? 0)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setLine(null)}
      onClick={() => setLine((l) => ((l ?? -1) + 1) % LINES.length)}
      className={`group relative shrink-0 cursor-pointer select-none ${className}`}
    >
      <span
        role="status"
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-xl border border-divider bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-all duration-200 ${
          bubble === 'left'
            ? 'right-full top-3 mr-2 origin-right'
            : '-top-2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom'
        } ${line === null ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {line !== null && LINES[line]}
        <span
          className={`absolute h-2.5 w-2.5 border-b border-r border-divider bg-background ${
            bubble === 'left'
              ? '-right-[5px] top-1/2 -translate-y-1/2 -rotate-45'
              : '-bottom-[5px] left-1/2 -translate-x-1/2 rotate-45'
          }`}
        />
      </span>
      <span className="char-bob block h-full">
        <Image
          src="/character.png"
          alt="Pixel-art character of Aryan"
          width={480}
          height={1038}
          priority
          className="h-full w-auto max-w-none transition-transform duration-200 group-hover:-rotate-2 group-active:scale-95"
        />
      </span>
    </button>
  );
}
