import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

const socials = [
  { label: "GitHub", href: "https://github.com/SebastianAugust", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/placeholder", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/placeholder", Icon: InstagramIcon },
  { label: "Email", href: "mailto:placeholder@email.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-light text-muted">
            © 2025 Sebastian August
          </p>
          <p className="mt-1 text-[11px] font-light text-muted/70">
            Built with Next.js
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-muted transition-colors hover:text-text"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
