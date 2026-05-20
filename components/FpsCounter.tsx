'use client';

import { useEffect, useState } from 'react';

export function FpsCounter() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      // Fluctuate around 60 ± 4 for authentic feel
      setFps(60 + Math.round((Math.random() - 0.5) * 8));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fps-counter" aria-hidden="true">
      {fps} FPS
    </div>
  );
}
