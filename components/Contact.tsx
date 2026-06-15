"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { fadeUp, stagger, inView, spring } from "@/lib/utils";

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

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] font-light text-text placeholder:text-muted/80 transition-colors duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60";

export function Contact() {
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — hidden from real users; bots tend to fill every field.
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async () => {
    if (status === "sending") return;

    // Lightweight client-side guard; the server validates authoritatively.
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setError("Please fill in your name, email, and a message.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setError("That email address doesn't look right.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong, try again."
      );
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28">
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

      {/* Contact form — controlled inputs + onClick submit (no native form POST). */}
      <motion.div
        variants={reduceMotion ? undefined : fadeUp}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="mt-12"
      >
        <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Send a message
        </h3>

        <div className="mt-5 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "sending"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              Your message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="What would you like to build?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "sending"}
              className={`${fieldClass} resize-y`}
            />
          </div>

          {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-company">Company (leave this empty)</label>
            <input
              id="contact-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending"}
              className="inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-12px_rgba(37,99,235,0.8)] transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : status === "success" ? (
                <>
                  <Check size={16} />
                  Message sent
                </>
              ) : (
                <>
                  Get in touch <ArrowUpRight size={16} />
                </>
              )}
            </button>

            {/* Animated status line. */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  key="success"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={spring}
                  role="status"
                  className="inline-flex items-center gap-1.5 text-sm font-light text-signal"
                >
                  <Check size={15} /> Message sent ✓
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  key="error"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={spring}
                  role="alert"
                  className="text-sm font-light text-amber"
                >
                  {error || "Something went wrong, try again."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
