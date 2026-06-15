"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, inView } from "@/lib/utils";

interface ContactLink {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const links: ContactLink[] = [
  {
    label: "GitHub",
    value: "SebastianAugust",
    href: "https://github.com/SebastianAugust",
    external: true,
  },
  {
    label: "Email",
    value: "placeholder@email.com",
    href: "mailto:placeholder@email.com",
  },
  { label: "LinkedIn", value: "placeholder", href: "#", external: true },
  { label: "Location", value: "Bandung, West Java" },
];

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28"
    >
      <motion.h2
        variants={reduceMotion ? undefined : fadeUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="text-3xl font-semibold tracking-tight text-text sm:text-4xl"
      >
        Let&apos;s build <span className="text-accent">something.</span>
      </motion.h2>

      <motion.ul
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="mt-10"
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={reduceMotion ? undefined : fadeUp}
            className="grid grid-cols-1 gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="text-xs font-light uppercase tracking-wide text-muted">
              {link.label}
            </span>
            {link.href ? (
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="u-draw inline-flex min-h-11 w-fit items-center text-[15px] font-light text-text transition-colors hover:text-accent sm:min-h-0"
              >
                {link.value}
              </a>
            ) : (
              <span className="text-[15px] font-light text-text">{link.value}</span>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.a
        variants={reduceMotion ? undefined : fadeUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        href="mailto:placeholder@email.com"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
      >
        Get in touch <ArrowUpRight size={16} />
      </motion.a>
    </section>
  );
}
