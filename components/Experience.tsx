"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { work, education } from "@/data/experience";
import { cn, fadeUp, stagger, inView, spring } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";

type Tab = "work" | "education";

interface Entry {
  period: string;
  title: string;
  org: string;
  bullets: string[];
}

const workEntries: Entry[] = work.map((w) => ({
  period: w.period,
  title: w.role,
  org: w.org,
  bullets: w.bullets,
}));

const eduEntries: Entry[] = education.map((e) => ({
  period: e.period,
  title: e.degree,
  org: e.org,
  bullets: e.bullets,
}));

function EntryRow({ entry, Icon }: { entry: Entry; Icon: typeof Briefcase }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={reduceMotion ? undefined : fadeUp}
      className="flex gap-4 border-t border-line py-6 first:border-t-0 sm:gap-5"
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent sm:h-11 sm:w-11">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-light text-accent">{entry.period}</p>
        <h3 className="mt-0.5 text-base font-medium text-text">{entry.title}</h3>
        <p className="text-sm font-light text-muted">{entry.org}</p>
        <ul className="mt-3 space-y-1.5">
          {entry.bullets.map((b) => (
            <li
              key={b}
              className="flex gap-2 text-sm font-light leading-relaxed text-muted"
            >
              <span className="select-none text-accent">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const [tab, setTab] = useState<Tab>("work");
  const reduceMotion = useReducedMotion();

  const entries = tab === "work" ? workEntries : eduEntries;
  const Icon = tab === "work" ? Briefcase : GraduationCap;

  return (
    <section
      id="experience"
      className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading title="Experience" subtitle="Where I've contributed" />

      {/* Pill toggle. */}
      <div className="mb-8 inline-flex rounded-full border border-line bg-surface p-1">
        {(["work", "education"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative rounded-full px-5 py-1.5 text-sm font-light capitalize transition-colors",
              tab === t ? "text-bg" : "text-muted hover:text-text"
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="exp-pill"
                transition={spring}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
              />
            )}
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={reduceMotion ? undefined : stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          whileInView={undefined}
          viewport={inView}
        >
          {entries.map((entry) => (
            <EntryRow key={`${entry.title}-${entry.org}`} entry={entry} Icon={Icon} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
