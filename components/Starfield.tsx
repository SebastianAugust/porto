"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import {
  makeStars,
  meteorConfigs,
  METEOR_CYCLE,
  METEOR_CYCLE_MOBILE,
} from "@/lib/utils";

/**
 * The fixed scenery behind everything. ONE sky serves both themes; the theme
 * only re-skins it through CSS variables (the `.dark` class, set before paint,
 * so there's no hydration flash):
 *
 *   • Night     → deep-blue sky, full starfield, meteors, the altitude zones.
 *   • Blue Hour → (light) the same scene just before sunrise: a violet-to-cream
 *                 gradient and a pale moon underneath (`.dawn-sky`), a handful
 *                 of the stars still out up top, softer meteors, city lights
 *                 still on, dusk-blue skyline and birds.
 *
 * Each sky is split into DEPTH PLANES that travel at different rates while the
 * Hero snaps into Skills — see `ALTITUDE`. Stars are generated ONCE from
 * fixed seeds (useMemo) so they never jump on re-render and SSR/CSR match.
 * Reduced motion → static stars, no meteors, no altitude shift.
 * Mobile → fewer elements and a shorter shift.
 *
 * On top of that, the night sky descends through ALTITUDE ZONES as you scroll
 * the home page: wisps, then birds, then city lights, a skyline and finally a
 * warm horizon glow. The scroll-spy writes `data-zone`; CSS does the fades.
 */

/** Home sections, top to bottom — each one is an altitude zone (globals.css). */
const ZONES = ["home", "skills", "projects", "experience", "achievements", "contact"] as const;

/** A distant skyline over low hills, drawn once at 1440×120 and stretched. */
const SKYLINE =
  "M0 120V84L90 70L180 80L260 62L340 76H380V58H400V50H414V58H432V72H470V64H492V40H506V64H530V70L620 60L720 74H760V54H778V46H792V54H812V66H850V36H862V30H874V36H886V66H920V72L1010 58L1100 72L1180 64L1260 78L1340 68L1440 80V120Z";

/** Mid-atmosphere cloud wisps, hugging the edges so they never sit behind text. */
const WISPS = [
  { top: "14%", left: "-6%", w: 340, h: 60, dur: 38, dir: "r" },
  { top: "46%", left: "80%", w: 300, h: 50, dur: 44, dir: "l" },
  { top: "72%", left: "-4%", w: 260, h: 44, dur: 34, dir: "r" },
  { top: "26%", left: "86%", w: 220, h: 38, dur: 40, dir: "l" },
] as const;

/**
 * Gull flocks crossing slowly. Negative delays start some mid-flight so the sky
 * is never empty on arrival. The first three are the mobile set, spread high,
 * mid and low. `birds` are [x, y, wingspan] inside the flock's 100×50 box.
 */
const FLOCKS = [
  { top: "20%", left: "40%", dur: 48, delay: 0, scale: 1.2, birds: [[36, 18, 16], [8, 32, 12], [66, 34, 12]] },
  { top: "44%", left: "20%", dur: 62, delay: -26, scale: 0.9, birds: [[30, 16, 14], [4, 28, 11], [58, 26, 12], [80, 40, 10]] },
  { top: "64%", left: "55%", dur: 56, delay: -40, scale: 1, birds: [[40, 14, 15], [14, 28, 12], [68, 30, 12]] },
  { top: "30%", left: "10%", dur: 70, delay: -12, scale: 0.8, birds: [[20, 20, 13], [52, 12, 14], [78, 28, 11]] },
  { top: "12%", left: "70%", dur: 52, delay: -34, scale: 1.3, birds: [[34, 20, 16], [6, 34, 12], [64, 36, 13], [86, 18, 10]] },
] as const;

/**
 * One bird, drawn at a 16-unit wingspan around its body at (0, 0) and placed
 * with `translate(x y) scale(span / 16)`. Three filled shapes: a tapered body
 * and two curved, pointed wings. Each wing pivots at its root beside the body
 * (see `.bird-wing-*` in globals.css) on mirrored keyframes that share one
 * duration and delay, so the pair always beats together.
 */
function Bird({ x, y, span, dur, delay, opacity, alt }: {
  x: number; y: number; span: number; dur: number; delay: number; opacity: number;
  /** Second bird tone — the same as the first at night, a violet shade at dawn. */
  alt: boolean;
}) {
  const beat = (side: "l" | "r") => ({ animation: `wing-${side} ${dur}s ${delay}s infinite` });
  return (
    <g
      transform={`translate(${x} ${y}) scale(${span / 16})`}
      // Whole-bird opacity: the group fades as one, so the solid-filled wings
      // and body never stack into a brighter overlap.
      style={{
        opacity: `calc(var(--bird-opacity) * ${opacity})`,
        fill: alt ? "var(--bird-alt)" : undefined,
      }}
    >
      <path className="bird-wing-l" style={beat("l")} d="M-0.6 -0.2Q-3.8 -2.4 -8 -1.4Q-5 -0.7 -3.4 0Q-2 0.5 -0.6 0.6Z" />
      <path className="bird-wing-r" style={beat("r")} d="M0.6 -0.2Q3.8 -2.4 8 -1.4Q5 -0.7 3.4 0Q2 0.5 0.6 0.6Z" />
      <path d="M2.6 0Q2 -0.8 0 -0.7Q-1.4 -0.6 -2.6 0Q-1.4 0.6 0 0.7Q2 0.8 2.6 0Z" />
    </g>
  );
}

/**
 * Altitude shift — how far each depth plane travels while the Hero snaps into
 * Skills. The RATIO is what sells it: the far nebula barely moves, the near
 * meteors move nearly 4x as much, and the eye reads that difference as a camera
 * descending through layers of sky rather than one background sliding.
 *
 * `budget` is an absolute pixel distance, not a fraction of the viewport, and
 * that is deliberate. Scaling these against the full scroll distance (so "near"
 * travelled ~45vh) lifts the meteors' launch points far above the viewport and
 * leaves the sky visibly thinner everywhere below the Hero. ~120px of near-plane
 * travel keeps every meteor's flight path intact and is still plainly readable
 * against a ~900px scroll.
 */
const ALTITUDE = {
  budget: 260,
  budgetMobile: 150,
  /* fraction of the budget each plane travels */
  far: 0.12,
  mid: 0.28,
  near: 0.45,
  /* the far plane swells slightly, the near plane recedes — depth, not a slide */
  farScale: 1.05,
  nearScale: 0.97,
} as const;

export function Starfield() {
  const reduceMotion = useReducedMotion();
  const zone = useActiveSection(ZONES, usePathname() === "/");
  const [isMobile, setIsMobile] = useState(false);
  // The scroll distance the shift runs over: the Hero's real height, so the
  // sky arrives at its new altitude exactly as Skills does. On mobile the Hero
  // is taller than the viewport (min-h-screen + content), so innerHeight would
  // finish the shift early.
  const [heroSpan, setHeroSpan] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => {
      setIsMobile(mq.matches);
      const hero = document.getElementById("home");
      setHeroSpan(hero?.offsetHeight || window.innerHeight);
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Generate the full sets once; slice for mobile so counts drop for perf.
  const allStars = useMemo(() => makeStars(110), []);
  const stars = isMobile ? allStars.slice(0, 55) : allStars;
  // Zone extras — reuse the seeded star generator for stable SSR/CSR output.
  const allZoneStars = useMemo(() => makeStars(50, 4242), []);
  const allLights = useMemo(() => makeStars(40, 2024), []);
  const allDenseLights = useMemo(() => makeStars(36, 4048), []);
  const zoneStars = isMobile ? allZoneStars.slice(0, 25) : allZoneStars;
  const lights = isMobile ? allLights.slice(0, 18) : allLights;
  const denseLights = isMobile ? allDenseLights.slice(0, 14) : allDenseLights;
  const wisps = isMobile ? WISPS.slice(0, 2) : WISPS;
  const flocks = isMobile ? FLOCKS.slice(0, 3) : FLOCKS;

  // The glowing beacons are the biggest, brightest stars, so they read as the
  // closest — they ride the near plane with the meteors. The rest are the mid
  // plane. Splitting on the existing `glow` flag, so no star changes appearance.
  const midStars = stars.filter((s) => !s.glow);
  const nearStars = stars.filter((s) => s.glow);
  // Blue Hour keeps only a handful of stars, all high in the still-dark top of
  // the sky; CSS hides every other `.star` in light mode.
  const dawnStars = new Set(midStars.filter((s) => s.y < 22).slice(0, 8));

  // Four meteors on mobile (perf), the full set of six on larger screens.
  // Mobile also flies them shorter — a 640px streak overshoots a 390px-wide
  // phone long before the tail has cleared the launch point — and on a shorter
  // cycle, so four meteors still keep the sky busy enough.
  const cycle = isMobile ? METEOR_CYCLE_MOBILE : METEOR_CYCLE;
  const meteorScale = isMobile ? 0.7 : 1;
  const meteors = isMobile
    ? meteorConfigs.filter((m) => m.mobilePhase !== null)
    : meteorConfigs;

  // useTransform clamps past its input range, and that clamp is what parks the
  // sky at its new resting altitude for the rest of the page.
  const { scrollY } = useScroll();
  const span = Math.max(heroSpan, 1);
  const budget = isMobile ? ALTITUDE.budgetMobile : ALTITUDE.budget;

  const farY = useTransform(scrollY, [0, span], [0, -budget * ALTITUDE.far]);
  const midY = useTransform(scrollY, [0, span], [0, -budget * ALTITUDE.mid]);
  const nearY = useTransform(scrollY, [0, span], [0, -budget * ALTITUDE.near]);
  const farScale = useTransform(scrollY, [0, span], [1, ALTITUDE.farScale]);
  const nearScale = useTransform(scrollY, [0, span], [1, ALTITUDE.nearScale]);

  // The far plane is the nebula wash, which lives on `body::before`. That paints
  // ABOVE the starfield (z-index -2 vs -10), so moving it into this tree would
  // change the paint order and therefore the look. It stays exactly where it is
  // and reads its transform from two custom properties on :root, driven here.
  useMotionValueEvent(farY, "change", (v) => {
    if (!reduceMotion) {
      document.documentElement.style.setProperty("--sky-far-y", `${v}px`);
    }
  });
  useMotionValueEvent(farScale, "change", (v) => {
    if (!reduceMotion) {
      document.documentElement.style.setProperty("--sky-far-scale", `${v}`);
    }
  });
  useEffect(() => {
    // Reduced motion → hand the nebula back its resting transform and leave it.
    if (!reduceMotion) return;
    document.documentElement.style.setProperty("--sky-far-y", "0px");
    document.documentElement.style.setProperty("--sky-far-scale", "1");
  }, [reduceMotion]);

  // With reduced motion the planes render as plain, unmoving layers.
  const plane = (y: typeof midY, scale?: typeof nearScale) =>
    reduceMotion ? undefined : scale ? { y, scale } : { y };


  return (
    <div
      aria-hidden
      className="animate-fade-in pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* ---- Blue Hour base (light only): the dawn gradient and a pale moon.
          Painted first, so the shared sky below draws on top of it. ---- */}
      <div className="dawn-sky">
        <motion.div className="sky-layer" style={plane(midY)}>
          <div className="dawn-moon" />
        </motion.div>
      </div>

      {/* ---- The shared sky: stars, meteors, altitude zones ---- */}
      <div className="star-sky">
        {/* Mid plane — the main star field. */}
        <motion.div className="sky-layer" style={plane(midY)}>
          {midStars.map((s, i) => (
            <span
              key={i}
              className={`star${dawnStars.has(s) ? " dawn-star" : ""} absolute rounded-full bg-[var(--star)]`}
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  // --star-dim is 1 at night and lower at dawn (globals.css).
                  opacity: `calc(${s.opacity} * var(--star-dim))`,
                  "--star-opacity": `calc(${s.opacity} * var(--star-dim))`,
                  animation: reduceMotion
                    ? undefined
                    : `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                } as React.CSSProperties
              }
            />
          ))}
        </motion.div>

        {/* Near plane — the glowing beacon stars and the meteors, fastest of all. */}
        <motion.div className="sky-layer" style={plane(nearY, nearScale)}>
          {nearStars.map((s, i) => (
            <span
              key={`glow-${i}`}
              className="star absolute rounded-full bg-[var(--star)]"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  opacity: s.opacity,
                  "--star-opacity": s.opacity,
                  boxShadow: `0 0 ${s.size * 3}px ${s.size * 0.9}px var(--star-glow)`,
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
                className="meteor"
                style={
                  {
                    top: m.top,
                    left: m.left,
                    "--meteor-angle": `${m.angle}deg`,
                    "--meteor-distance": `${Math.round(m.distance * meteorScale)}px`,
                    "--meteor-tail-length": `${Math.round(m.tail * meteorScale)}px`,
                    animationDuration: `${cycle}s`,
                    // Phase → delay. One shared cycle with fixed phases is what
                    // keeps concurrency from drifting into a meteor shower.
                    animationDelay: `${((isMobile ? m.mobilePhase! : m.phase) * cycle).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            ))}
        </motion.div>

        {/* ---- Altitude zones, fixed to the viewport (see globals.css) ---- */}
        <div data-zone={zone ?? "home"} className="absolute inset-0">
          {/* Contact: warm glow rising off the horizon. */}
          <div className="zone-layer zone-glow">
            <div className="horizon-glow" />
          </div>

          {/* Achievements → Contact: a distant skyline. */}
          <svg
            className="zone-layer zone-horizon"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ inset: "auto 0 0 0", width: "100%", height: "clamp(100px, 18vh, 190px)" }}
          >
            <defs>
              <linearGradient id="skyline-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--horizon-fill-top)" }} />
                <stop offset="0.5" style={{ stopColor: "var(--horizon-fill-mid)" }} />
                <stop offset="1" style={{ stopColor: "var(--horizon-fill-bottom)" }} />
              </linearGradient>
            </defs>
            <path
              d={SKYLINE}
              fill="url(#skyline-fill)"
              stroke="var(--horizon-rim)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Experience → Contact: city lights far below, denser nearer the ground. */}
          {[
            { set: lights, cls: "zone-lights" },
            { set: denseLights, cls: "zone-lights-dense" },
          ].map(({ set, cls }) => (
            <div key={cls} className={`zone-layer ${cls}`}>
              {set.map((s, i) => (
                <span
                  key={i}
                  className="city-light"
                  style={
                    {
                      left: `${s.x}%`,
                      top: `${(88 + s.y * 0.1).toFixed(2)}%`,
                      width: `${(2 + s.size * 0.8).toFixed(2)}px`,
                      height: `${(2 + s.size * 0.8).toFixed(2)}px`,
                      opacity: s.opacity + 0.2,
                      "--star-opacity": s.opacity + 0.2,
                      animation: `twinkle ${(s.duration * 1.6).toFixed(2)}s ease-in-out ${s.delay}s infinite`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          ))}

          {/* Skills: a slightly denser star field in the upper atmosphere. */}
          <div className="zone-layer zone-stars">
            {zoneStars.map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[var(--star)]"
                style={
                  {
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${Math.min(s.size, 1.6)}px`,
                    height: `${Math.min(s.size, 1.6)}px`,
                    opacity: s.opacity,
                    "--star-opacity": s.opacity,
                    animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Skills → Projects: cloud wisps at the edges, thicker at Projects. */}
          <div className="zone-layer zone-clouds">
            {wisps.map((c, i) => (
              <div
                key={i}
                className="night-wisp"
                style={{
                  top: c.top,
                  left: c.left,
                  width: `${c.w}px`,
                  height: `${c.h}px`,
                  animation: `cloud-drift-${c.dir} ${c.dur}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Projects: gull flocks drifting across, each bird beating its wings. */}
          <div className="zone-layer zone-birds">
            {flocks.map((f, i) => (
              <svg
                key={i}
                className="absolute"
                viewBox="0 0 100 50"
                width={160 * f.scale}
                height={80 * f.scale}
                style={{
                  top: f.top,
                  left: f.left,
                  animation: `bird-cross ${f.dur}s linear ${f.delay}s infinite`,
                }}
              >
                <g fill="var(--bird)">
                  {f.birds.map(([x, y, span], j) => (
                    <Bird
                      key={j}
                      x={x}
                      y={y}
                      span={span}
                      // Deterministic spread (SSR-safe): 0.6–1.0s per beat, scattered
                      // phases, 0.6–1 opacity, so no two neighbours move alike.
                      dur={0.6 + ((i * 3 + j * 7) % 5) * 0.1}
                      delay={-((i * 5 + j * 3) % 7) * 0.13}
                      opacity={0.6 + ((i + j * 2) % 5) * 0.1}
                      alt={j % 2 === 1}
                    />
                  ))}
                </g>
              </svg>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
