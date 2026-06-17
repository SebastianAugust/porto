import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/projects";

/**
 * Production-status pill. "Live" gets the green signal + breathing dot ("real
 * people use this, now"); the rest are quiet outlines toned per status.
 * No hooks, so it renders fine in both server and client components.
 */
export function StatusBadge({
  status,
  size = "sm",
}: {
  status: ProjectStatus;
  /** "sm" for cards, "md" for the detail-page header. */
  size?: "sm" | "md";
}) {
  const pad =
    size === "md" ? "px-3 py-1.5 text-xs" : "px-2.5 py-1 text-[11px]";

  if (status === "Live") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-bg/60 font-medium text-[var(--signal-text)] backdrop-blur-sm",
          pad
        )}
      >
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
        "inline-flex items-center rounded-full border bg-bg/60 font-medium backdrop-blur-sm",
        pad,
        tone
      )}
    >
      {status}
    </span>
  );
}
