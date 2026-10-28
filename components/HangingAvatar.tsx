'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMode } from '@/lib/mode';

const LINES = {
  normal: [
    'hey, I’m Aryan 👋',
    'drag me around!',
    'currently building VaultQ',
    'open to internships!',
    'try pressing  /',
    'wheee 🎢',
  ],
  game: ['PLAYER 1 READY', '+1UP!', 'combo x3!', 'press / for the menu', 'GG 🎮', 'boss level: internships'],
};
const DIZZY = ['whoa 😵‍💫', 'easy there!', 'I’m gonna be sick', 'ok that was fun'];

// Character art is 480×1038; it hangs from a rope tied to the top of its head.
const ART_RATIO = 480 / 1038;

interface Vec {
  x: number;
  y: number;
}

/**
 * The pixel-art character hanging from a rope in the top-right corner.
 * A tiny rope + gravity sim: drag to swing or fling it, click to make it jump
 * and flip, and it sways a little on its own and when you scroll.
 */
export function HangingAvatar() {
  const mode = useMode();
  const anchorRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<string | null>(null);
  const [size, setSize] = useState({ h: 112, rope: 92 });

  // Mutable sim state lives in refs so the 60fps loop never re-renders React.
  const sim = useRef({
    pos: { x: 0, y: 92 } as Vec,
    vel: { x: 0, y: 0 } as Vec,
    spin: 0,
    spinVel: 0,
    dragging: false,
    grab: { x: 0, y: 0 } as Vec,
    last: { x: 0, y: 0, t: 0 },
    down: null as null | { x: number; y: number },
  });
  const lineIdx = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const say = (text: string, ms = 2600) => {
    setLine(text);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setLine(null), ms);
  };
  const nextLine = () => {
    const lines = LINES[modeRef.current];
    say(lines[lineIdx.current++ % lines.length]);
  };

  const jump = () => {
    const s = sim.current;
    s.vel.y -= 420 + Math.random() * 100;
    s.vel.x += (Math.random() - 0.5) * 320;
    s.spinVel = (Math.random() > 0.5 ? 1 : -1) * 900;
    nextLine();
  };

  // Responsive size: smaller and on a short rope on phones.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setSize(mq.matches ? { h: 112, rope: 92 } : { h: 64, rope: 26 });
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const s = sim.current;
    s.pos = { x: 0, y: size.rope };
    s.vel = { x: 0, y: 0 };
  }, [size.rope]);

  // Physics loop
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = sim.current;
    const L = size.rope;
    const width = size.h * ART_RATIO;
    const G = 2200;
    const K = 260; // rope stiffness once taut
    let raf = 0;
    let prev = performance.now();
    let idleAt = prev + 4000;

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;

      if (!s.dragging) {
        s.vel.y += G * dt;
        const len = Math.hypot(s.pos.x, s.pos.y) || 1;
        if (len > L) {
          // Rope only pulls when stretched; slack lets the jump arc freely.
          const nx = s.pos.x / len;
          const ny = s.pos.y / len;
          const stretch = len - L;
          s.vel.x -= nx * K * stretch * dt * 10;
          s.vel.y -= ny * K * stretch * dt * 10;
          const radial = s.vel.x * nx + s.vel.y * ny;
          if (radial > 0) {
            s.vel.x -= nx * radial * 0.35;
            s.vel.y -= ny * radial * 0.35;
          }
        }
        const damp = Math.pow(0.55, dt);
        s.vel.x *= damp;
        s.vel.y *= damp;
        s.pos.x += s.vel.x * dt;
        s.pos.y += s.vel.y * dt;
        // Soft ceiling so a big jump never leaves the screen.
        if (s.pos.y < 12) {
          s.pos.y = 12;
          if (s.vel.y < 0) s.vel.y *= -0.3;
        }

        // Spin settles back to upright, snapping to whole turns.
        if (s.spinVel !== 0) {
          s.spin += s.spinVel * dt;
          s.spinVel *= Math.pow(0.2, dt);
          if (Math.abs(s.spinVel) < 30) s.spinVel = 0;
        } else {
          const target = Math.round(s.spin / 360) * 360;
          s.spin += (target - s.spin) * Math.min(1, dt * 8);
        }

        if (!reduce && now > idleAt) {
          s.vel.x += (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 80);
          idleAt = now + 5000 + Math.random() * 4000;
        }
      }

      const { x, y } = s.pos;
      const angle = (-Math.atan2(x, Math.max(y, 1)) * 180) / Math.PI;
      if (ropeRef.current) {
        ropeRef.current.setAttribute('x2', String(x));
        ropeRef.current.setAttribute('y2', String(y));
      }
      if (bodyRef.current) {
        bodyRef.current.style.transform = `translate(${x - width / 2}px, ${y - 4}px) rotate(${angle + s.spin}deg)`;
      }
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${x - width / 2 - 10}px, ${y + 6}px) translateX(-100%)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Scrolling gives it a little jiggle.
    let lastY = window.scrollY;
    const onScroll = () => {
      const d = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!reduce && !s.dragging) s.vel.x += Math.max(-220, Math.min(220, d * 2.2));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onJump = () => jump();
    window.addEventListener('avatar-jump', onJump);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('avatar-jump', onJump);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // Say hi once after the name finishes typing.
  useEffect(() => {
    const t = setTimeout(() => say(LINES.normal[0], 3200), 1800);
    lineIdx.current = 1;
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode === 'game') say('PLAYER 1 READY', 2200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const local = (e: React.PointerEvent) => {
    const a = anchorRef.current!.getBoundingClientRect();
    return { x: e.clientX - a.left, y: e.clientY - a.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const s = sim.current;
    const p = local(e);
    s.down = p;
    s.grab = { x: p.x - s.pos.x, y: p.y - s.pos.y };
    s.last = { x: p.x, y: p.y, t: performance.now() };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = sim.current;
    if (!s.down) return;
    const p = local(e);
    if (!s.dragging && Math.hypot(p.x - s.down.x, p.y - s.down.y) > 5) s.dragging = true;
    if (!s.dragging) return;
    // Keep it on a (very stretchy) leash.
    let x = p.x - s.grab.x;
    let y = p.y - s.grab.y;
    const max = Math.max(size.rope * 3.2, 180);
    const len = Math.hypot(x, y);
    if (len > max) {
      x = (x / len) * max;
      y = (y / len) * max;
    }
    const now = performance.now();
    const dt = Math.max((now - s.last.t) / 1000, 1 / 120);
    s.vel = { x: (x - s.pos.x) / dt, y: (y - s.pos.y) / dt };
    s.pos = { x, y };
    s.last = { x: p.x, y: p.y, t: now };
  };

  const onPointerUp = () => {
    const s = sim.current;
    if (!s.down) return;
    if (s.dragging) {
      s.dragging = false;
      const speed = Math.hypot(s.vel.x, s.vel.y);
      s.vel.x = Math.max(-2400, Math.min(2400, s.vel.x));
      s.vel.y = Math.max(-2400, Math.min(2400, s.vel.y));
      if (speed > 1600) {
        s.spinVel = Math.sign(s.vel.x || 1) * 1100;
        say(DIZZY[Math.floor(Math.random() * DIZZY.length)]);
      }
    } else {
      jump();
    }
    s.down = null;
  };

  const width = size.h * ART_RATIO;

  return (
    <div
      ref={anchorRef}
      className="pointer-events-none fixed right-[34px] top-0 z-[45] h-0 w-0 lg:right-[200px]"
      aria-hidden="false"
    >
      <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden="true">
        <line
          ref={ropeRef}
          x1="0"
          y1="-2"
          x2="0"
          y2={size.rope}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/40 game:text-accent"
          strokeDasharray={mode === 'game' ? '3 3' : undefined}
        />
      </svg>

      <div
        ref={bubbleRef}
        role="status"
        className={`absolute left-0 top-0 whitespace-nowrap rounded-xl border border-divider bg-background px-3 py-1.5 text-xs font-medium shadow-lg transition-opacity duration-200 game:font-pixel game:text-[0.55rem] ${
          line ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {line}
      </div>

      <div
        ref={bodyRef}
        className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ width, height: size.h, transformOrigin: '50% 4px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="button"
        tabIndex={0}
        aria-label="Aryan's pixel character: click to make it jump, drag to swing it"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            jump();
          }
        }}
      >
        <Image
          src="/character.png"
          alt=""
          width={480}
          height={1038}
          priority
          draggable={false}
          className="pointer-events-none h-full w-full drop-shadow-md"
        />
      </div>
    </div>
  );
}
