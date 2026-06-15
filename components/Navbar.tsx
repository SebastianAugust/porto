"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { cn, spring } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Stable id list for the scroll-spy (module scope → stable reference).
const sectionIds = links.map((l) => l.href.slice(1));

const socials = [
  { label: "GitHub", href: "https://github.com/SebastianAugust", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/placeholder", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/placeholder", Icon: InstagramIcon },
  { label: "Email", href: "mailto:placeholder@email.com", Icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Scroll-spy only runs on the homepage (where the sections live). On other
  // routes the links point back to "/#section" instead of a bare hash.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(sectionIds, isHome);

  /** "#projects" on the homepage; "/#projects" everywhere else. */
  const resolveHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.05 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-bg/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
        <Link
          href={resolveHref("#home")}
          className="rounded text-[15px] font-semibold tracking-tight text-text"
          onClick={() => setOpen(false)}
        >
          Sebastian <span className="text-accent">Augustino Lie</span>
        </Link>

        {/* Desktop links — full nav only from lg up; tablet collapses to the menu. */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive = isHome && active === link.href.slice(1);
            const cls = cn(
              "u-draw text-sm font-light transition-colors duration-200",
              isActive ? "is-active text-accent" : "text-muted hover:text-text"
            );
            // On the homepage use a plain anchor so the browser handles the
            // smooth, offset-aware scroll. Elsewhere, Link back to "/#section".
            return isHome ? (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cls}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={resolveHref(link.href)} className={cls}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right cluster — socials (desktop), theme toggle, hamburger (mobile/tablet). */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          <div className="hidden items-center gap-1.5 sm:gap-2.5 lg:flex">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-6 py-4 sm:px-8">
              {links.map((link) => {
                const isActive = isHome && active === link.href.slice(1);
                const cls = cn(
                  "flex min-h-11 items-center rounded-lg px-2 text-sm font-light transition-colors duration-200",
                  isActive
                    ? "bg-surface text-accent"
                    : "text-muted hover:bg-surface hover:text-text"
                );
                return isHome ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cls}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={resolveHref(link.href)}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-3 flex items-center gap-1 border-t border-line pt-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    onClick={() => setOpen(false)}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
