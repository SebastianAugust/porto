"use client";

import { useEffect } from "react";

/**
 * On initial load/refresh: disable the browser's scroll restoration, strip any
 * URL hash, and jump to the top (hero). Runs once on mount — in-page nav clicks
 * still smooth-scroll normally.
 */
export default function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
