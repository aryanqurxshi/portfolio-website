'use client';

import { useEffect, useRef, useState } from 'react';

interface GlitchNameProps {
  name: string;
  className?: string;
}

type Phase = 'loading' | 'typing' | 'done';

const LOAD_STEPS = 10;
const LOAD_STEP_MS = 75;   // 750ms total load bar
const TYPE_CHAR_MS = 68;
const POST_LOAD_DELAY_MS = 180;
const INITIAL_GLITCH_DELAY_MS = 500;
const GLITCH_DURATION_MS = 220;

export function GlitchName({ name, className = '' }: GlitchNameProps) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [loadStep, setLoadStep] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [glitching, setGlitching] = useState(false);
  const typingDone = useRef(false);

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), GLITCH_DURATION_MS);
  };

  // Boot sequence: fill loading bar, then switch to typing phase
  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step++;
      setLoadStep(step);
      if (step >= LOAD_STEPS) {
        clearInterval(id);
        setTimeout(() => setPhase('typing'), POST_LOAD_DELAY_MS);
      }
    }, LOAD_STEP_MS);
    return () => clearInterval(id);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'typing') return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(id);
        typingDone.current = true;
        setPhase('done');
        setTimeout(triggerGlitch, INITIAL_GLITCH_DELAY_MS);
      }
    }, TYPE_CHAR_MS);
    return () => clearInterval(id);
  }, [phase, name]);

  // Periodic glitch re-trigger once typing is done
  useEffect(() => {
    if (phase !== 'done') return;
    let tid: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 8000 + Math.random() * 4000;
      tid = setTimeout(() => {
        triggerGlitch();
        setTimeout(schedule, GLITCH_DURATION_MS + 50);
      }, delay);
    };
    schedule();
    return () => clearTimeout(tid);
  }, [phase]);

  const filled = loadStep;
  const empty = LOAD_STEPS - loadStep;
  const barText = '▓'.repeat(filled) + '░'.repeat(empty);
  const pct = loadStep * 10;

  return (
    <div className={`glitch-name-wrapper ${className}`}>
      {/* Boot sequence loading bar — visible only during loading/early typing */}
      <div
        className="glitch-boot-bar"
        style={{ opacity: phase === 'loading' ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="glitch-boot-label">LOADING </span>
        <span className="glitch-boot-progress">{barText}</span>
        <span className="glitch-boot-pct"> {pct}%</span>
      </div>

      {/* The name itself */}
      <h1
        className={`name-glitch${glitching ? ' is-glitching' : ''}${phase === 'done' ? ' name-done' : ''}`}
        data-text={displayed || name}
      >
        {phase === 'loading' ? (
          <span className="name-placeholder" aria-hidden="true">&nbsp;</span>
        ) : (
          <>
            {displayed}
            <span className="cursor-blink" aria-hidden="true">█</span>
          </>
        )}
      </h1>
    </div>
  );
}
