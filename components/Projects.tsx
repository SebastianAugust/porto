"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn, fadeUp, stagger, inView, spring } from "@/lib/utils";
import { SectionHeading } from "@/components/Section";
import { GithubIcon } from "@/components/icons";

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "Live") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-signal/30 bg-bg/60 px-2.5 py-1 text-[11px] font-medium text-signal backdrop-blur-sm">
        <span className="relative grid h-1.5 w-1.5 place-items-center">
          <span className="dot-breathe absolute h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="h-1 w-1 rounded-full bg-signal" />
        </span>
        Live
      </span>
    );
  }
  const tone =
    status === "In Dev"
      ? "border-amber/30 text-amber"
      : "border-line-strong text-grey";
  return (
    <span
      className={cn(
        "rounded-full border bg-bg/60 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm",
        tone
      )}
    >
      {status}
    </span>
  );
}

function Card({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={reduceMotion ? undefined : fadeUp}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={spring}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-surface transition-colors",
        project.featured
          ? "border-accent/40 shadow-[0_0_40px_-16px_rgba(110,168,255,0.6)] hover:border-accent/70"
          : "border-line hover:border-line-strong"
      )}
    >
      {/* Cover — gradient placeholder; user adds a real screenshot later. */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-gradient-to-br from-[#101830] to-[#0a0f20]">
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
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] font-light text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {(project.website || project.source) && (
          <div className="mt-5 flex flex-wrap gap-2 pt-1">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-cta px-4 py-2 text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Website <ArrowUpRight size={14} />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-xs font-light text-text transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon size={14} /> Source Code
              </a>
            )}
          </div>
        )}
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
          <Card key={project.name} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
