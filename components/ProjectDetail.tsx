"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { fadeUp, inView, spring } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { GithubIcon } from "@/components/icons";

/** A section that fades + drifts up once it scrolls into view. */
function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={inView}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/** Small uppercase section label. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
      {children}
    </h2>
  );
}

/** Body copy, or a visible muted placeholder when the field is still empty. */
function Body({ text }: { text: string }) {
  if (!text.trim()) {
    return (
      <p className="mt-3 text-[15px] font-light italic leading-relaxed text-muted">
        Add this later
      </p>
    );
  }
  return (
    <p className="mt-3 text-[15px] font-light leading-relaxed text-text/90">
      {text}
    </p>
  );
}

/** A styled "screenshot" placeholder box, on-brand with the starry theme. */
function ImagePlaceholder({
  label = "screenshot",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={
        "relative grid place-items-center overflow-hidden rounded-2xl border border-line bg-[image:var(--cover-grad)] " +
        (className ?? "")
      }
    >
      {/* faint grid sheen so the empty box still reads as "intentional" */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
      <span className="text-xs font-light tracking-wide text-muted">{label}</span>
    </div>
  );
}

export function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const reduceMotion = useReducedMotion();
  const [hero, ...gallery] = project.images;

  return (
    <main className="relative mx-auto max-w-[720px] px-6 pb-24 pt-28 sm:px-8 sm:pt-32">
      {/* 1 — Back link */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={spring}
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm font-light text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to projects
        </Link>
      </motion.div>

      {/* 2 — Header */}
      <motion.header
        variants={reduceMotion ? undefined : fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        className="mt-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {project.name}
          </h1>
          <StatusBadge status={project.status} size="md" />
        </div>
        <p className="mt-3 text-base font-light text-muted sm:text-lg">
          {project.tagline}
        </p>
        <p className="mt-2 text-sm font-light text-muted/80">
          {project.role} · {project.context}
        </p>
      </motion.header>

      {/* 3 — Hero image */}
      <motion.div
        variants={reduceMotion ? undefined : fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        className="mt-8"
      >
        {hero ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src={hero}
              alt={`${project.name} — main screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <ImagePlaceholder className="aspect-[16/9]" />
        )}
      </motion.div>

      {/* 4 — Tech stack */}
      <Reveal className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs font-light text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* 5 — The Problem */}
      <Reveal className="mt-12">
        <Label>The Problem</Label>
        <Body text={project.problem} />
      </Reveal>

      {/* 6 — What I Built */}
      <Reveal className="mt-12">
        <Label>What I Built</Label>
        <Body text={project.whatIBuilt} />
      </Reveal>

      {/* 7 — Hard Problem I Solved (extra visual weight) */}
      <Reveal className="mt-12">
        <div className="surface-card relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.04] p-6 shadow-[var(--shadow-panel)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <Label>Hard Problem I Solved</Label>
          <Body text={project.hardProblem} />
        </div>
      </Reveal>

      {/* 7.5 — What I Learned */}
      <Reveal className="mt-12">
        <Label>What I Learned</Label>
        <Body text={project.learned} />
      </Reveal>

      {/* 8 — Stats row */}
      {project.stats.length > 0 ? (
        <Reveal className="mt-12">
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-surface px-3 py-5 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-accent sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] font-light uppercase tracking-wide text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : (
        <Reveal className="mt-12">
          <Label>By the numbers</Label>
          <Body text="" />
        </Reveal>
      )}

      {/* 9 — Image gallery */}
      <Reveal className="mt-12">
        <Label>More shots</Label>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gallery.length > 0
            ? gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <Image
                    src={src}
                    alt={`${project.name} — screenshot ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                  />
                </div>
              ))
            : // Placeholder grid — drop more shots in /public/projects/<slug>/ later.
              [0, 1].map((i) => (
                <ImagePlaceholder key={i} className="aspect-[16/10]" />
              ))}
        </div>
      </Reveal>

      {/* 10 — CTA buttons (each only renders when its URL exists) */}
      {(project.liveUrl || project.sourceUrl) && (
        <Reveal className="mt-12">
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5"
              >
                Visit Live Site <ArrowUpRight size={16} />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-light text-text transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon size={16} /> Source Code
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </Reveal>
      )}

      {/* 11 — Next project */}
      <Reveal className="mt-16 border-t border-line pt-8">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-4"
        >
          <span className="flex flex-col">
            <span className="text-xs font-light uppercase tracking-[0.18em] text-muted">
              Next project
            </span>
            <span className="mt-1 text-lg font-medium text-text transition-colors group-hover:text-accent">
              {nextProject.name}
            </span>
          </span>
          <ArrowRight
            size={20}
            className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </Reveal>
    </main>
  );
}
