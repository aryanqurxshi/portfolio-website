'use client';

import { useEffect, useState } from 'react';

const START_DELAY = 250;
const PER_CHAR = 85;

/** Types the name out once on load, then leaves a blinking caret. */
export function TypingName({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timer = setTimeout(function tick() {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, PER_CHAR + Math.random() * 60);
    }, START_DELAY);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="type-caret ml-0.5 inline-block h-[0.8em] w-[2px] bg-foreground/70 align-middle" />
        {/* Invisible remainder reserves the full width so nothing shifts while typing. */}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </>
  );
}
