"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/skills";
import { fadeUp, stagger, inView } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <SectionHeading title="Skills" subtitle="Tools I build with" />

      <motion.ul
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {skills.map(({ name, Icon }) => (
          <motion.li
            key={name}
            variants={reduceMotion ? undefined : fadeUp}
            className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
          >
            <Icon
              size={20}
              className="shrink-0 text-muted transition-colors group-hover:text-accent"
            />
            <span className="truncate text-sm font-light text-text">{name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
