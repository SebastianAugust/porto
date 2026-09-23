"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * One wheel gesture = one slide change. With a mouse or trackpad this is the
 * whole snap: there is no CSS snap under it on desktop (globals.css), because
 * `mandatory` snap pulled every small, slow trackpad scroll inside a long
 * section back to its top. Touch is left to the browser's `proximity` snap.
 *
 *   • on a short slide (Hero, Skills, Achievements, Contact) → next/prev section
 *   • at the bottom edge of a long section (Projects, Experience) → next section
 *   • at the top edge of a long section, scrolling up → previous section
 *   • anywhere INSIDE a long section → inert, the browser scrolls natively
 *
 * Each gesture advances at most once: the rest of the flick that fired a
 * slide (finger still moving, then momentum) is swallowed, so a flick can
 * never skip a section — but a fresh swipe or another wheel notch goes
 * through at once instead of being eaten until the wheel pauses. Touch and
 * keyboard are left to the browser — touch uses `proximity` snap, keys
 * scroll freely.
 *
 * Snap is a first-pass guide only. The first time the reader reaches the very
 * bottom, `snap-done` goes on <html>: the CSS snap turns off and this assist
 * goes inert, so every later scroll is free. <html> survives client-side
 * navigation, so a trip to a project page and back keeps it off; a reload
 * starts a fresh document and snaps again.
 */

/** Matches `scroll-margin-top: 5rem` on `section[id]`, which clears the navbar. */
const NAV_OFFSET = 80;
/** Smaller deltas are trackpad jitter: swallowed on a slide, never a trigger. */
const MIN_DELTA = 4;
/** Slack when comparing scroll positions. */
const EPS = 8;
/** A pause this long between wheel events starts a new gesture. */
const GESTURE_GAP_MS = 180;
/** Hard ceiling on the locked window, so a missed scrollend can never trap the page. */
const UNLOCK_MS = 900;

/** Marks the first full pass as done — see the comment above. */
const DONE = "snap-done";

/** Where one wheel step in `dir` should land, or null to let the browser scroll. */
function targetFor(dir: 1 | -1): number | null {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section")).map(
    (el) => {
      const top = el.getBoundingClientRect().top + y;
      return {
        start: Math.max(0, Math.round(top - NAV_OFFSET)),
        // Scroll position where the section's bottom meets the viewport bottom.
        end: Math.round(top + el.offsetHeight - vh),
        long: el.classList.contains("snap-long"),
      };
    }
  );

  let i = sections.length - 1;
  while (i >= 0 && sections[i].start > y + EPS) i--;
  if (i < 0) return null;
  const cur = sections[i];

  if (dir > 0) {
    // Still reading inside a long section. The last NAV_OFFSET before `end`
    // already counts as the bottom, so the next section never needs an
    // extra, pixel-perfect nudge to reach.
    if (cur.long && y < cur.end - NAV_OFFSET - EPS) return null;
    // Past the last section is the footer: the bottom of the page.
    const next = sections[i + 1]?.start ?? document.documentElement.scrollHeight - vh;
    return next > y + EPS ? next : null;
  }

  if (y > cur.start + EPS) return cur.long ? null : cur.start;
  const prev = sections[i - 1];
  if (!prev) return null;
  // Coming back up into a long section lands on its bottom, not its top.
  return prev.long ? Math.max(prev.start, prev.end) : prev.start;
}

export default function SectionSnap() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const html = document.documentElement;
    let locked = false;
    let spent = false;
    let lastWheel = 0;
    let lastAbs = 0;
    let lastDir = 0;
    // Shape of the gesture since the last slide: its peak delta, and the
    // lowest delta seen after that peak.
    let peak = 0;
    let trough = 0;
    let unlockTimer: ReturnType<typeof setTimeout>;

    const unlock = () => {
      locked = false;
      clearTimeout(unlockTimer);
      window.removeEventListener("scrollend", unlock);
    };

    const onScroll = () => {
      // 2px of slack for fractional scroll positions.
      if (window.scrollY + window.innerHeight < html.scrollHeight - 2) return;
      html.classList.add(DONE);
      window.removeEventListener("scroll", onScroll);
    };

    const onWheel = (e: WheelEvent) => {
      if (html.classList.contains(DONE)) return;
      if (e.ctrlKey) return; // pinch / ctrl+wheel zoom
      const abs = Math.abs(e.deltaY);
      // The rest of the flick that fired the last slide — finger still moving,
      // then momentum — is swallowed. The reader is asking to move again on a
      // pause, a reversal, a repeated fixed step (a mouse notch), or a new
      // swipe: deltas that had died down to under half the peak and rise again.
      const dir = Math.sign(e.deltaY);
      if (trough === peak && abs >= peak) peak = trough = abs;
      else trough = Math.min(trough, abs);
      const notch = abs >= 50 && abs === lastAbs;
      const newSwipe = trough < peak * 0.5 && abs > trough * 2 + 4;
      const momentum =
        e.timeStamp - lastWheel <= GESTURE_GAP_MS && dir === lastDir && !notch && !newSwipe;
      lastWheel = e.timeStamp;
      lastAbs = abs;
      lastDir = dir;

      if (locked || (spent && momentum)) {
        e.preventDefault();
        return;
      }
      spent = false;

      const target = targetFor(e.deltaY > 0 ? 1 : -1);
      if (target === null) return;

      e.preventDefault();
      // Jitter on a slide must not creep the page off its section top.
      if (abs < MIN_DELTA) return;
      spent = true;
      peak = trough = abs;
      locked = true;
      window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
      // `scrollend` is the accurate signal; the timer is the safety net.
      window.addEventListener("scrollend", unlock, { once: true });
      unlockTimer = setTimeout(unlock, UNLOCK_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    if (!html.classList.contains(DONE)) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      unlock();
    };
  }, [reduceMotion]);

  return null;
}
