"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { makeStars, makeDots, meteorConfigs } from "@/lib/utils";

/**
 * The fixed scenery behind everything. Two layers render at once and cross-fade
 * by theme (handled in CSS via the `.dark` class, so there's no hydration flash):
 *
 *   • Night  → twinkling stars + shooting meteors (the original starfield).
 *   • Dawn   → a rising sun, slow-drifting clouds, and faint static blue accent
 *              dots that quietly echo the night's stars.
 *
 * Stars/dots are generated ONCE from fixed seeds (useMemo) so they never jump on
 * re-render and SSR/CSR match. Reduced motion → static stars/sun/clouds, no
 * meteors. Mobile → fewer elements for performance.
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

  // Generate the full sets once; slice for mobile so counts drop for perf.
  const allStars = useMemo(() => makeStars(110), []);
  const allDots = useMemo(() => makeDots(22), []);
  const stars = isMobile ? allStars.slice(0, 55) : allStars;
  const dots = isMobile ? allDots.slice(0, 12) : allDots;

  // One meteor on mobile (perf), the full staggered set on larger screens.
  const meteors = isMobile ? meteorConfigs.slice(0, 1) : meteorConfigs;

  // Three soft clouds, alternating drift directions and slow speeds; two on mobile.
  const allClouds = [
    { top: "18%", left: "-8%", w: 220, h: 26, opacity: 0.8, dur: 22, dir: "r" },
    { top: "30%", left: "58%", w: 160, h: 20, opacity: 0.6, dur: 18, dir: "l" },
    { top: "9%", left: "26%", w: 130, h: 16, opacity: 0.5, dur: 24, dir: "r" },
  ] as const;
  const clouds = isMobile ? allClouds.slice(0, 2) : allClouds;

  return (
    <div
      aria-hidden
      className="animate-fade-in pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* ---- Night: stars + meteors ---- */}
      <div className="star-sky">
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

      {/* ---- Dawn: sun + clouds + accent dots ---- */}
      <div className="dawn-sky">
        {/* Soft sun, top-right, with a warm halo. Rises on dark→light. */}
        <div
          className="dawn-sun absolute h-[70px] w-[70px] rounded-full"
          style={{
            top: "8%",
            right: "12%",
            background:
              "radial-gradient(circle at 45% 40%, var(--sun-core), var(--sun-edge))",
            boxShadow: "0 0 70px 20px var(--sun-halo)",
          }}
        />

        {/* Thin drifting clouds. */}
        {clouds.map((c, i) => (
          <div
            key={`cloud-${i}`}
            className="dawn-cloud absolute"
            style={{
              top: c.top,
              left: c.left,
              width: `${c.w}px`,
              height: `${c.h}px`,
              opacity: c.opacity,
              animation: reduceMotion
                ? undefined
                : `cloud-drift-${c.dir} ${c.dur}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Faint static blue dots — a quiet callback to the night's stars. */}
        {dots.map((d, i) => (
          <span
            key={`dot-${i}`}
            className="absolute rounded-full bg-[var(--dot)]"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
