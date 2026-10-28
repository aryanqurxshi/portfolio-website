'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMode } from '@/lib/mode';

const LINES = [
  'hi! I’m Aryan',
  'thanks for stopping by',
  'currently building VaultQ',
  'open to internships!',
  'psst, press / to search',
  'try the game mode ↗',
];

/**
 * Normal-mode companion: the pixel character standing in the bottom-right
 * corner, waving hi. Hover for a line, click to make him hop.
 * In game mode he leaves the corner and becomes the arcade player instead.
 */
export function Buddy() {
  const mode = useMode();
  const [line, setLine] = useState<string | null>(null);
  const [hopping, setHopping] = useState(false);
  const idx = useRef(1);
  const hide = useRef<ReturnType<typeof setTimeout>>();

  const say = (text: string, ms = 3000) => {
    setLine(text);
    clearTimeout(hide.current);
    hide.current = setTimeout(() => setLine(null), ms);
  };
  const next = () => say(LINES[idx.current++ % LINES.length]);
  const jump = () => {
    setHopping(true);
    next();
  };

  useEffect(() => {
    const t = setTimeout(() => say(LINES[0], 4200), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (mode !== 'normal') return;
    const onJump = () => jump();
    window.addEventListener('avatar-jump', onJump);
    return () => window.removeEventListener('avatar-jump', onJump);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (mode === 'game') return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-[45] flex items-end gap-1 sm:bottom-6 sm:right-6">
      <div
        role="status"
        className={`mb-12 flex sm:mb-20 origin-bottom-right items-center gap-1.5 whitespace-nowrap rounded-2xl rounded-br-sm border border-divider bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-all duration-200 ${
          line ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-1 scale-95 opacity-0'
        }`}
      >
        {line}
      </div>
      <button
        type="button"
        aria-label="Aryan's pixel character: click to make him hop"
        onPointerEnter={(e) => e.pointerType === 'mouse' && !line && next()}
        onClick={jump}
        className="pointer-events-auto relative h-20 shrink-0 sm:h-[120px]"
      >
        {/* Waving hand next to the head */}
        <span className="wave absolute -right-2 top-[6%] text-base sm:-right-3 sm:text-xl" aria-hidden="true">
          👋
        </span>
        <span
          className={`block h-full ${hopping ? 'buddy-hop' : 'char-bob'}`}
          onAnimationEnd={(e) => e.animationName === 'buddy-hop' && setHopping(false)}
        >
          <Image
            src="/character.png"
            alt=""
            width={480}
            height={1038}
            priority
            draggable={false}
            className="h-full w-auto max-w-none drop-shadow-md"
          />
        </span>
      </button>
    </div>
  );
}
