'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PixelPortrait() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="pixel-float avatar-glow hero-portrait-container relative mx-auto h-[240px] w-[240px] overflow-visible bg-transparent p-0 sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px]">
      <div className="hero-portrait-environment" />
      <div className="hero-portrait-shell">
        <div className="hero-portrait-grid" />
        <div className="hero-portrait-base" />
        <div className="hero-portrait-shadow" />
        <div className="hero-portrait-deco hero-portrait-deco-1" />
        <div className="hero-portrait-deco hero-portrait-deco-2" />
        <div className="hero-portrait-screen" />
        {hasError ? (
          <div className="grid h-full place-items-center text-gray-400">
            <div className="space-y-2 text-center">
              <p className="text-base font-semibold">Portrait unavailable</p>
              <p className="text-sm text-gray-500">Using retro fallback</p>
            </div>
          </div>
        ) : (
          <Image
            src="/Personal Portfolio/RetroImageSelf-Transparent.png"
            alt="Character portrait of Aryan Qureshi"
            fill
            onError={() => setHasError(true)}
            className="hero-portrait-image"
            sizes="(min-width: 1024px) 340px, 100vw"
          />
        )}
      </div>
    </div>
  );
}
