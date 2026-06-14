"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { fadeUp, stagger, spring } from "@/lib/utils";
import { TypingText } from "@/components/TypingText";
import Image from "next/image";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = reduceMotion
    ? {}
    : {
        variants: stagger,
        initial: "hidden" as const,
        animate: "visible" as const,
      };
  const item = reduceMotion ? {} : { variants: fadeUp };

  return (
    <section
      id="home"
      className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left — the pitch. */}
        <motion.div {...container} transition={{ delayChildren: 0.15 }}>
          <motion.p
            {...item}
            className="mb-5 text-sm font-light tracking-wide text-accent"
          >
            Hello World, I&apos;m 👋
          </motion.p>

          <motion.h1
            {...item}
            className="font-bold leading-[1.02] tracking-[-0.03em] text-text"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl">
              Sebastian
            </span>
            <span className="block text-5xl text-accent sm:text-6xl lg:text-7xl">
              Augustino Lie
            </span>
          </motion.h1>

          <motion.p
            {...item}
            className="mt-6 text-xl font-light text-muted sm:text-2xl"
          >
            I build <TypingText />
          </motion.p>

          <motion.p
            {...item}
            id="about"
            className="mt-6 max-w-xl scroll-mt-28 text-pretty text-[15px] font-light leading-relaxed text-muted"
          >
            Informatics Engineering student at Universitas Padjadjaran who ships
            real products — from kasir systems for warung makan to AI-powered
            solar monitoring.
          </motion.p>

          <motion.div
            {...item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-12px_rgba(37,99,235,0.8)] transition-transform hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-light text-text transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          <motion.div
            {...item}
            className="mt-8 flex items-center gap-2.5 text-sm font-light text-muted"
          >
            <span className="relative grid h-2.5 w-2.5 place-items-center">
              <span className="dot-breathe absolute h-2.5 w-2.5 rounded-full bg-signal" />
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Available for work
          </motion.div>
        </motion.div>

        {/* Right — the portrait, ringed by a slow orbital. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.25 }}
          className="relative mx-auto aspect-square w-[clamp(15rem,70vw,22rem)]"
        >
          {/* Orbital ring + riding dot. */}
          <div className="animate-orbit absolute inset-0 rounded-full border border-line-strong">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(110,168,255,0.7)]" />
          </div>

          {/* Portrait inside the ring. */}
          <div className="absolute inset-[7%] overflow-hidden rounded-full border border-line bg-surface shadow-[inset_0_2px_40px_rgba(0,0,0,0.5),0_0_60px_-12px_rgba(110,168,255,0.5)]">
            <Image
              src="/photo.JPG"
              alt="Sebastian Augustino Lie"
              fill
              sizes="(max-width: 1024px) 70vw, 22rem"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue. */}
      <motion.a
        href="#skills"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 flex flex-col items-center gap-2 text-[11px] font-light tracking-[0.2em] text-muted transition-colors hover:text-text"
        aria-label="Scroll to content"
      >
        SCROLL
        <ArrowDown size={16} className="animate-nudge" />
      </motion.a>
    </section>
  );
}
