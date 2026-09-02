import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: site.instagram, Icon: InstagramIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-light text-muted">
            © 2026 Sebastian Augustino Lie
          </p>
          <p className="mt-1 text-[11px] font-light text-muted">
            Built with Next.js
          </p>
        </div>

        <div className="-ml-2.5 flex items-center gap-1 sm:ml-0 sm:gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-accent sm:h-auto sm:w-auto"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
