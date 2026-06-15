"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fadeUp, stagger, spring } from "@/lib/utils";

/**
 * App-wide 404. The starfield + nav + footer come from the root layout, so this
 * just paints the message over the night sky — with a small drifting planet and
 * ring echoing the hero's orbital motif.
 */
export default function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative mx-auto flex min-h-[78vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        className="flex flex-col items-center"
      >
        {/* Drifting planet + orbital ring. */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="relative mb-10 h-28 w-28"
        >
          <div className="animate-orbit absolute inset-0 rounded-full border border-line-strong">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(110,168,255,0.7)]" />
          </div>
          <div className="absolute inset-[18%] grid place-items-center rounded-full border border-line bg-surface text-sm font-semibold tracking-tight text-accent shadow-[inset_0_2px_30px_rgba(0,0,0,0.5),0_0_50px_-12px_rgba(110,168,255,0.5)]">
            404
          </div>
        </motion.div>

        <motion.h1
          variants={reduceMotion ? undefined : fadeUp}
          className="text-3xl font-semibold tracking-tight text-text sm:text-4xl"
        >
          Lost in space?
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-muted"
        >
          This page drifted off into the void. Let&apos;s get you back to
          familiar stars.
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : fadeUp} className="mt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-12px_rgba(37,99,235,0.8)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back home
          </Link>
        </motion.div>
      </motion.div>

      {/* A single tasteful meteor streaking behind the message. */}
      {!reduceMotion && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: 0.4 }}
          aria-hidden
          className="animate-nudge pointer-events-none absolute right-[18%] top-[24%] h-[2px] w-[2px] rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.55)] after:absolute after:right-full after:top-1/2 after:h-px after:w-[70px] after:-translate-y-1/2 after:rounded-full after:bg-gradient-to-r after:from-transparent after:to-white/60 after:content-['']"
        />
      )}
    </main>
  );
}
