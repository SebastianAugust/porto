"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { fadeUp, stagger, inView } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";

interface Achievement {
  title: string;
  issuer: string;
  year: string;
}

// Placeholders — edit data/achievements here as real ones land.
const achievements: Achievement[] = [
  { title: "Awardee of Bakti BCA Scholarship", issuer: "Bank Central Asia (BCA)", year: "2026" },
  
];

export function Achievements() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="achievements"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading title="Achievements" />

      <motion.ul
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="grid gap-4 sm:grid-cols-2"
      >
        {achievements.map((a, i) => (
          <motion.li
            key={i}
            variants={reduceMotion ? undefined : fadeUp}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
              <Trophy size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium text-text">
                {a.title}
              </h3>
              <p className="text-xs font-light text-muted">
                {a.issuer} · {a.year}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
