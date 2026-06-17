"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn, fadeUp, stagger, inView, spring } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";

function Card({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeUp}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={spring}
      className={cn(
        "surface-card group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--card-bg)] transition-colors",
        project.featured
          ? "border-accent/40 shadow-[var(--shadow-card-featured)] hover:border-accent/70"
          : "border-[var(--card-border)] shadow-[var(--shadow-card)] hover:border-line-strong"
      )}
    >
      {/* The whole card links to the case study. The stretched-link pattern: an
          absolutely-positioned overlay link makes the entire card clickable
          while keeping the markup semantic. */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read the ${project.name} case study`}
      />

      {/* Cover — gradient placeholder; first image in project.images becomes the
          real screenshot later. */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-[image:var(--cover-grad)]">
        <div className="absolute inset-0 grid place-items-center text-xs font-light tracking-wide text-muted">
          screenshot
        </div>
        <div className="absolute right-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-medium text-text">{project.name}</h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-muted">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] font-light text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Affordance — a quiet "case study" cue that brightens with the card. */}
        <span className="mt-5 inline-flex items-center gap-1 pt-1 text-xs font-medium text-muted transition-colors group-hover:text-accent">
          Read case study
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <SectionHeading title="Projects" subtitle="Things I've shipped" />

      <motion.div
        variants={reduceMotion ? undefined : stagger}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={inView}
        className="grid gap-5 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <Card key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
