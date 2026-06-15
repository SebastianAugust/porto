/**
 * The shipped catalog — each entry is a full case study, not a brochure line.
 * Every project owns a `/projects/[slug]` detail page generated from this data,
 * so adding a project here automatically gives it a page, a sitemap entry, and
 * a card on the homepage.
 *
 * Fields the owner still needs to write are left as empty strings (text) or
 * empty arrays (stats/images) and marked with a `// TODO` comment. The detail
 * page renders a visible muted "Add this later" wherever a field is empty, so
 * the gaps are easy to spot in the browser. Search this file for `TODO` to find
 * everything that needs real content.
 */
export type ProjectStatus = "Live" | "Deployed" | "In Dev" | "Demo";

export interface ProjectStat {
  /** Short caption, e.g. "features", "timeline", "real client". */
  label: string;
  /** The headline number/figure, e.g. "17", "1mo", "1". */
  value: string;
}

export interface Project {
  /** URL-friendly id — the page lives at /projects/[slug]. */
  slug: string;
  name: string;
  status: ProjectStatus;
  /** One line under the title. */
  tagline: string;
  /** What problem this solved. */
  problem: string;
  /** The solution + key features. */
  whatIBuilt: string;
  /** ONE hard technical challenge + how it was solved (the headline section). */
  hardProblem: string;
  /** Tech used, e.g. ["React", "Laravel", "MySQL"]. */
  stack: string[];
  /** Headline figures shown as a 3-up tile row. */
  stats: ProjectStat[];
  /**
   * Screenshot paths under /public/projects/. First image is used as the hero;
   * the rest fill the gallery. Empty for now — drop real PNG/JPGs in
   * /public/projects/<slug>/ and list them here. Example:
   * ["/projects/lawang-sewu-pos/hero.png", "/projects/lawang-sewu-pos/dashboard.png"]
   */
  images: string[];
  /** Live site, when there is one. */
  liveUrl?: string;
  /** Public source, when there is one. */
  sourceUrl?: string;
  /** Featured projects get a subtle blue border glow on their card. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "lawang-sewu-pos",
    name: "Lawang Sewu POS",
    status: "Live",
    tagline: "Point-of-sale system for a warung makan",
    problem:
      "The owner couldn't track cash flow — manual recording meant fraud risk and no real visibility into profit.",
    whatIBuilt:
      "A full POS: a kasir transaction flow, an owner dashboard with auto-generated insights, daily WhatsApp reports via Fonnte, thermal receipt printing, and PDF/Excel export.",
    // TODO: write the specific hard technical challenge + how it was solved.
    // (placeholder idea: "Menu image uploads broke on Hostinger after every
    //  deploy; fixed by symlinking Laravel's storage path so photos persisted.")
    hardProblem: "",
    stack: ["React", "Laravel", "MySQL", "Tailwind"],
    stats: [
      { value: "17", label: "features" },
      { value: "1mo", label: "timeline" },
      { value: "1", label: "real client" },
    ],
    images: [], // TODO: add screenshots to /public/projects/lawang-sewu-pos/
    // TODO: add the live URL once it's public.
    liveUrl: undefined,
    // TODO: add the source repo URL if it'll be public.
    sourceUrl: undefined,
    featured: true,
  },
  {
    slug: "ai-orbit-solar",
    name: "AI-ORBIT Solar",
    status: "Deployed",
    tagline: "Agentic ML system for solar plant anomaly detection",
    // TODO: write the problem this solved.
    problem: "",
    whatIBuilt:
      "Five ML models (XGBoost, LSTM, Autoencoder, Isolation Forest, KMeans), a three-layer agent architecture, a Streamlit dashboard, and Telegram alerts.",
    // TODO: write the hard technical challenge + how it was solved.
    hardProblem: "",
    stack: ["Python", "Docker", "Railway", "Streamlit"],
    stats: [
      { value: "5", label: "ML models" },
      { value: "3", label: "agent layers" },
      { value: "5", label: "dashboard pages" },
    ],
    images: [], // TODO: add screenshots to /public/projects/ai-orbit-solar/
    sourceUrl: "https://github.com/web-shooter-3-6/ai-orbit-solar-power-plant",
  },
  {
    slug: "ps-rental",
    name: "PlayStation Rental",
    status: "In Dev",
    tagline: "Booking system with a visual floor plan",
    // TODO: write the problem this solved.
    problem: "",
    whatIBuilt:
      "An interactive floor plan with clickable seats, a step-based booking wizard, Midtrans payments, WhatsApp notifications, and a live session countdown timer.",
    // TODO: write the hard technical challenge + how it was solved.
    hardProblem: "",
    stack: ["React", "Laravel", "Midtrans", "Fonnte"],
    stats: [], // TODO: add headline stats (e.g. seats, bookings, build time).
    images: [], // TODO: add screenshots to /public/projects/ps-rental/
  },
  {
    slug: "orbit-ecommerce",
    name: "Orbit E-Commerce",
    status: "Demo",
    tagline: "Gadget store with cart and checkout",
    // TODO: write the problem this solved.
    problem: "",
    whatIBuilt:
      "A product catalog, cart, checkout, a promo system, search autocomplete, and dark mode.",
    // TODO: write the hard technical challenge + how it was solved.
    hardProblem: "",
    stack: ["Laravel", "Blade", "MySQL"],
    stats: [], // TODO: add headline stats (e.g. products, conversion, build time).
    images: [], // TODO: add screenshots to /public/projects/orbit-ecommerce/
  },
];

/** Look up a single project by slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * The next project in the catalog (wraps around to the first), used for the
 * "Next: … →" link at the bottom of each detail page.
 */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
