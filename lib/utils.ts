import type { Transition, Variants } from "framer-motion";

/**
 * Tiny classname joiner. Filters falsy values so we can write
 * `cn("base", active && "is-active")` without pulling in clsx.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * The one spring the whole site shares. Firm and quick, never bouncy — the
 * Emil Kowalski brief: stiffness 300, damping 30, no overshoot.
 */
export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/** Entrance: a quiet fade + 8px upward drift. Nothing dramatic. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: spring },
};

/** Parent container that staggers its children by 0.06s, top to bottom. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/** Standard whileInView config — reveal once, a touch before fully on screen. */
export const inView = {
  once: true,
  margin: "-64px",
} as const;

/**
 * Meteor cycle length, in seconds. Every meteor shares it — that is the whole
 * trick. Six independent durations drift against each other and eventually
 * clump (measured: four on screen at once, three-or-more 15% of the time), so
 * instead they run on ONE period at fixed phases. Concurrency then can't drift:
 * it's whatever the phase gaps say it is, forever.
 */
export const METEOR_CYCLE = 30;
export const METEOR_CYCLE_MOBILE = 18;

/**
 * Meteor flight plans — launch point, where it sits in the shared cycle, and
 * how it flies.
 *
 * `phase` is a 0–1 position in the cycle, not a delay in seconds, so the same
 * list re-spreads itself across the shorter mobile cycle. The gaps are
 * deliberately uneven (5.5s, 5.7s, 3.8s, 6.5s, 3.9s, 4.6s) so the sky doesn't
 * tick like a metronome, but no two are close enough to put three meteors up
 * together — the streak only lasts ~3.7s of the 30s cycle.
 *
 * `mobilePhase: null` means that meteor sits out on small screens; the four
 * that remain are re-spread across the whole cycle rather than sliced off the
 * front, which would leave one long dead stretch of sky. Four, not three,
 * because how often a meteor is up is (count x streak fraction) and nothing
 * else — shortening the mobile cycle speeds them up but doesn't make them any
 * more frequent. Three left the phone emptier than the old subtle version was.
 */
export const meteorConfigs = [
  { top: "-4%", left: "58%", phase: 0, mobilePhase: 0.02, angle: 142, distance: 520, tail: 170 },
  { top: "6%", left: "86%", phase: 0.183, mobilePhase: null, angle: 138, distance: 600, tail: 210 },
  { top: "-8%", left: "38%", phase: 0.373, mobilePhase: 0.29, angle: 146, distance: 470, tail: 155 },
  { top: "12%", left: "72%", phase: 0.5, mobilePhase: null, angle: 140, distance: 560, tail: 195 },
  { top: "-3%", left: "96%", phase: 0.717, mobilePhase: 0.51, angle: 144, distance: 640, tail: 220 },
  { top: "20%", left: "48%", phase: 0.847, mobilePhase: 0.76, angle: 137, distance: 500, tail: 180 },
] as const;

/**
 * Deterministic-ish PRNG (mulberry32). Lets the star field be generated once
 * from a fixed seed so positions are stable across re-renders and SSR/CSR.
 */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Star {
  x: number; // %
  y: number; // %
  size: number; // px
  opacity: number;
  duration: number; // s
  delay: number; // s
  /** A handful of larger stars carry a faint blue halo for parallax depth. */
  glow: boolean;
}

/** Round to `p` decimals — short, stable strings so SSR and client inline
 *  styles serialize identically (no hydration mismatch from float precision). */
const r = (n: number, p = 3) => Math.round(n * 10 ** p) / 10 ** p;

/** Build a stable array of stars from a fixed seed. */
export function makeStars(count: number, seed = 1337): Star[] {
  const rand = mulberry32(seed);

  // Bias hard toward tiny "micro" stars (pow curve), with only a few resolving
  // bright — a real sky is mostly dust. Range: 0.3px → 2.5px.
  const stars: Star[] = Array.from({ length: count }, () => {
    const size = 0.3 + Math.pow(rand(), 2.4) * 2.2;
    return {
      x: r(rand() * 100),
      y: r(rand() * 100),
      size: r(size, 2),
      opacity: r(0.18 + rand() * 0.52, 2), // 0.18 – 0.7
      duration: r(2 + rand() * 3, 2), // 2 – 5s
      delay: r(rand() * 5, 2),
      glow: false,
    };
  });

  // Promote the five largest stars to glowing blue beacons — bigger, brighter,
  // and haloed (box-shadow applied in the component) to add depth to the field.
  [...stars]
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .forEach((s) => {
      s.size = r(2 + rand() * 0.5, 2); // 2.0 – 2.5px
      s.opacity = 0.9;
      s.glow = true;
    });

  return stars;
}
