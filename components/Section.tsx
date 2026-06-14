"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, inView } from "@/lib/utils";

/** Shared section header — title + quiet subtitle, with the standard fade-up. */
export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={inView}
      className="mb-10"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm font-light text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
