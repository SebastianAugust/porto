"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import { fadeUp, stagger, inView } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";

interface Org {
  name: string;
  role: string;
  period: string;
  description: string;
}

const orgs: Org[] = [
  {
    name: "Badan Eksekutif (BE)",
    role: "HR Staff",
    period: "2024 — Present",
    description:
      "Student organization at Universitas Padjadjaran. Designed staff performance & welfare evaluation matrices and built structured interview frameworks for recruitment.",
  },
];

export function Organizations() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="organizations"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading title="Organizations" />

      <motion.div
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="grid gap-5 sm:grid-cols-2"
      >
        {orgs.map((org) => (
          <motion.article
            key={org.name}
            variants={reduceMotion ? undefined : fadeUp}
            className="flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-base font-medium text-text">{org.name}</h3>
              <p className="text-sm font-light text-accent">{org.role}</p>
              <p className="text-xs font-light text-muted">{org.period}</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                {org.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
