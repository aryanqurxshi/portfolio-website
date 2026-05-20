'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Constants ─────────────────────────────────────────────────────────────────
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const SECTION_KEYS: Record<string, string> = {
  '1': '#status',
  '2': '#quests',
  '3': '#inventory',
  '4': '#trophies',
  '5': '#skills',
  'b': '#bonus',
  '6': '#contact',
};

const ORIGINAL_TITLE = typeof document !== 'undefined' ? document.title : '';
const MARQUEE_TEXT = '  >  COME BACK...  ';

const SHORTCUTS = [
  { key: '1', action: 'Jump to STATUS'    },
  { key: '2', action: 'Jump to QUESTS'    },
  { key: '3', action: 'Jump to INVENTORY' },
  { key: '4', action: 'Jump to TROPHIES'  },
  { key: '5', action: 'Jump to SKILLS'    },
  { key: 'B', action: 'Jump to BONUS LEVEL' },
  { key: '6', action: 'Jump to CONTACT'   },
  { key: '?', action: 'Show this screen'  },
  { key: '↑↑↓↓←→←→BA', action: 'Konami code — secret palette' },
];

// ── EasterEggs component ──────────────────────────────────────────────────────
export function EasterEggs() {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const konamiRef = useRef<number>(0);
  const marqueeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const titlePosRef = useRef(0);

  // Konami code detection + terminal mode toggle
  const handleKonami = useCallback(() => {
    const active = document.documentElement.classList.toggle('terminal-mode');
    localStorage.setItem('terminal-mode', active ? '1' : '0');
  }, []);

  // Apply persisted terminal mode on mount
  useEffect(() => {
    if (localStorage.getItem('terminal-mode') === '1') {
      document.documentElement.classList.add('terminal-mode');
    }
  }, []);

  // Tab title marquee when hidden
  useEffect(() => {
    const startMarquee = () => {
      const full = MARQUEE_TEXT.repeat(3);
      marqueeRef.current = setInterval(() => {
        titlePosRef.current = (titlePosRef.current + 1) % MARQUEE_TEXT.length;
        document.title = full.slice(titlePosRef.current, titlePosRef.current + 28);
      }, 200);
    };

    const stopMarquee = () => {
      if (marqueeRef.current) {
        clearInterval(marqueeRef.current);
        marqueeRef.current = null;
      }
      document.title = ORIGINAL_TITLE;
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') startMarquee();
      else stopMarquee();
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stopMarquee();
    };
  }, []);

  // Keyboard handler: section jumps, Konami, shortcuts overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack input fields
      if ((e.target as HTMLElement).tagName === 'INPUT' ||
          (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      // Konami sequence
      if (e.key === KONAMI[konamiRef.current]) {
        konamiRef.current++;
        if (konamiRef.current >= KONAMI.length) {
          konamiRef.current = 0;
          handleKonami();
        }
      } else {
        konamiRef.current = 0;
      }

      // Shortcuts overlay
      if (e.key === '?') {
        setShowShortcuts((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        return;
      }

      // Section jump
      const href = SECTION_KEYS[e.key.toLowerCase()];
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleKonami]);

  if (!showShortcuts) return null;

  return (
    <div
      className="shortcuts-overlay"
      onClick={() => setShowShortcuts(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="shortcuts-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="shortcuts-title">KEYBOARD SHORTCUTS</p>
        <p className="shortcuts-subtitle">// controller help screen</p>
        <div className="shortcuts-list">
          {SHORTCUTS.map(({ key, action }) => (
            <div key={key} className="shortcut-row">
              <span className="shortcut-key">[{key}]</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
        <p className="shortcuts-close-hint">ESC or click outside to close</p>
      </div>
    </div>
  );
}
