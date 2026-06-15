import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Shown for any /projects/<slug> that doesn't match a real project. */
export default function ProjectNotFound() {
  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        Project not found
      </h1>
      <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-muted">
        That case study doesn&apos;t exist — it may have been renamed or moved.
      </p>
      <Link
        href="/#projects"
        className="group mt-8 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-sm font-light text-text transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft
          size={15}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back to projects
      </Link>
    </main>
  );
}
