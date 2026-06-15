"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { makeStars, meteorConfigs } from "@/lib/utils";

/**
 * The quiet night sky behind everything. A fixed, pointer-events-none layer at a
 * negative-ish low z-index. Stars are generated ONCE from a fixed seed (useMemo)
 * so they never jump on re-render. Twinkle/meteor use opacity+transform only.
 *
 * Reduced motion → static stars, no meteors.
 * Light mode → fewer/softer stars, meteors faded out (via --meteor-opacity in CSS).
 */
export function Starfield() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Generate the full set once; slice for mobile so the count drops for perf.
  const allStars = useMemo(() => makeStars(110), []);
  const stars = isMobile ? allStars.slice(0, 55) : allStars;

  // One meteor on mobile (perf), the full staggered set on larger screens.
  const meteors = isMobile ? meteorConfigs.slice(0, 1) : meteorConfigs;

  return (
    <div
      aria-hidden
      className="animate-fade-in pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--star)]"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              "--star-opacity": s.opacity,
              boxShadow: s.glow
                ? `0 0 ${s.size * 3}px ${s.size * 0.9}px rgba(110, 168, 255, 0.4)`
                : undefined,
              animation: reduceMotion
                ? undefined
                : `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {!reduceMotion &&
        meteors.map((m, i) => (
          <span
            key={`meteor-${i}`}
            className="absolute h-[2px] w-[2px] rounded-full bg-white
                       shadow-[0_0_6px_2px_rgba(255,255,255,0.55)]
                       after:absolute after:right-full after:top-1/2 after:h-px
                       after:w-[96px] after:-translate-y-1/2 after:rounded-full
                       after:bg-gradient-to-r after:from-transparent after:to-white/65
                       after:content-['']"
            style={{
              top: m.top,
              left: m.left,
              animation: `meteor ${m.duration}s ease-in ${m.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
    </div>
  );
}
