"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps every route's page content. Because a template remounts on navigation
 * (unlike a layout), this gives a quiet fade + drift on each page change — so
 * moving to a project detail page feels like a transition, not a hard reload.
 * Kept short (0.32s) and disabled under reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
