"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy via IntersectionObserver (no scroll-position math). Watches the
 * given section ids and returns the id currently crossing a band near the top
 * of the viewport. Returns null when disabled (e.g. off the homepage) or before
 * anything is in view.
 *
 * The asymmetric rootMargin carves a thin band a bit above the vertical centre,
 * so a section becomes "active" as its heading settles under the sticky nav.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Only runs when `enabled` flips (it's a dep), not on every render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(null);
      return;
    }

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Among intersecting sections, the topmost wins.
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
