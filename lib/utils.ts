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
 * Meteor timings — staggered so they never fire simultaneously. Positions are
 * the launch points (top/right %), kept up high so each has room to fall.
 */
export const meteorConfigs = [
  { top: "-2%", left: "62%", delay: 1, duration: 5 },
  { top: "8%", left: "88%", delay: 3.2, duration: 4.6 },
  { top: "-6%", left: "40%", delay: 6, duration: 5.6 },
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
