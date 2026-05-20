'use client';

import { useState } from 'react';
import { BossBattle } from '../BossBattle';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="rpg-section-header">
      <h2 className="rpg-section-title">▼ {children}</h2>
      <div className="rpg-section-divider" />
    </div>
  );
}

export function BonusLevelSection() {
  const [started, setStarted] = useState(false);

  return (
    <section id="bonus" className="rpg-section px-6 sm:px-8 lg:px-8 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading>BONUS LEVEL</SectionHeading>

        <div className="rpg-panel p-4 sm:p-6 space-y-4">
          <p className="bonus-subhead">// if you&apos;re bored or something</p>
          <p className="text-gray-300 text-sm sm:text-base">
            A wild IMPOSTER SYNDROME appeared!
          </p>

          {!started ? (
            <button
              type="button"
              className="rpg-stats-button"
              onClick={() => setStarted(true)}
            >
              <span className="rpg-stats-arrow">▶</span>
              START BATTLE
            </button>
          ) : (
            <BossBattle />
          )}
        </div>
      </div>
    </section>
  );
}
