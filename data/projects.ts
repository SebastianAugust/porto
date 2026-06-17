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
  /** Your role on the project, e.g. "Sole developer — frontend, backend, deployment". */
  role: string;
  /** How it came about: self-initiated / group / course. */
  context: string;
  /** What problem this solved. */
  problem: string;
  /** The solution + key features. */
  whatIBuilt: string;
  /** ONE hard technical challenge + how it was solved (the headline section). */
  hardProblem: string;
  /** The key takeaway — what building it taught you. */
  learned: string;
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
    tagline: "Point-of-sale system for a local small eatery",
    role: "Sole developer - frontend, backend, deployment",
    context: "Self-initiated through a scholarship's UMKM program",
    problem:
      "A small food business still recorded sales manually. The owner, who is dealing with a serious illness, struggled to find time to reconcile daily income accurately, leaving room for errors and employee fraud.",
    whatIBuilt:
      "A full-stack POS with a cashier transaction flow, an owner dashboard, WhatsApp daily reports (Fonnte), thermal receipt printing, and PDF/Excel export.",
    hardProblem:
      "The hardest part wasn't the code — it was understanding what the owner actually needed. She runs the business while dealing with a serious illness, isn't technical, and couldn't spare time to learn a complex tool. I had to translate vague, real-world pain points into a system simple enough that she could use it with no training, while still capturing every transaction for fraud prevention and accurate reporting. Getting that balance — powerful enough to be useful, simple enough to be effortless — was the real challenge.",
    learned:
      "How to turn a real person's pain points into working software, and how to handle messy production-deployment issues (storage paths, CORS, server config) that never show up in tutorials.",
    stack: ["React", "Laravel", "MySQL", "Tailwind", "Vercel", "Hostinger"],
    stats: [
      { value: "17", label: "features" },
      { value: "1mo", label: "timeline" },
      { value: "1", label: "real client" },
    ],
    images: [], // TODO: add screenshots to /public/projects/lawang-sewu-pos/
    liveUrl: undefined, // PLACEHOLDER — add live URL when ready
    sourceUrl: undefined, // PLACEHOLDER — private/owner repo, decide later
    featured: true,
  },
  {
    slug: "ai-orbit-solar",
    name: "AI-ORBIT Solar Monitoring",
    status: "Deployed",
    tagline: "Agentic ML system for solar power plant anomaly detection",
    role: "Fullstack - ML pipeline, dashboard, system integration",
    context: "Group project (3 members) - AI course final",
    problem:
      "Solar power plants need to catch performance anomalies early, but raw sensor data is noisy and hard to interpret manually.",
    whatIBuilt:
      "An agentic system combining 5 ML models with a 3-layer agent architecture, a real-time dashboard, and automated Telegram alerts, containerized with Docker.",
    // REVIEW: The models showed unrealistically high accuracy at first because of data leakage — the scaler was fit on the full dataset before the train/test split. I fixed the pipeline so scaling happens after the split, which gave honest, trustworthy performance.
    hardProblem:
      "The models showed unrealistically high accuracy at first because of data leakage - the scaler was fit on the full dataset before the train/test split. I fixed the pipeline so scaling happens after the split, which gave honest, trustworthy performance.",
    learned:
      "How to integrate multiple ML models into one working system, and that building AI is mostly about the pipeline around the model - not just training it.",
    stack: ["Python", "XGBoost", "LSTM", "Docker", "Railway", "Streamlit"],
    stats: [
      { value: "5", label: "ML models" },
      { value: "3", label: "agent layers" },
      { value: "Live", label: "alerts" },
    ],
    images: [], // TODO: add screenshots to /public/projects/ai-orbit-solar/
    liveUrl: undefined, // PLACEHOLDER — add deployed URL if public
    sourceUrl: "https://github.com/web-shooter-3-6/ai-orbit-solar-power-plant",
  },
  {
    slug: "gor-badminton",
    name: "GOR Badminton Booking System",
    status: "Demo",
    tagline: "Desktop booking system for a badminton sports center",
    role: "Frontend/UI - built login, booking forms, and admin panels",
    context:
      "Group project (2 members) - Object-Oriented Programming course final",
    problem:
      "A sports center recorded court bookings manually, causing schedule clashes (double bookings) and no clear payment tracking.",
    whatIBuilt:
      "A desktop app with role-based authentication (admin/user), an anti-double-booking availability check, payment verification, and an MVC architecture.",
    // REVIEW: Preventing overlapping bookings — I worked on the booking UI and flow that feeds an availability check querying existing bookings by court, date, and time range before allowing a new booking to be confirmed.
    hardProblem:
      "Preventing overlapping bookings - I worked on the booking UI and flow that feeds an availability check querying existing bookings by court, date, and time range before allowing a new booking to be confirmed.",
    learned:
      "How to apply core OOP principles (encapsulation, inheritance, polymorphism, abstraction) and structure a real app with MVC instead of writing everything procedurally.",
    stack: ["Java", "Java Swing", "MySQL", "MVC"],
    stats: [
      { value: "4", label: "DB tables" },
      { value: "RBAC", label: "access" },
      { value: "1", label: "demo video" },
    ],
    images: [], // TODO: add screenshots to /public/projects/gor-badminton/
    liveUrl: "https://bit.ly/ARSIP_PROJECT_GORBADMINTON_PBO", // REVIEW: demo video — confirm you want this public
    sourceUrl: undefined, // PLACEHOLDER — add GitHub repo
  },
  {
    slug: "orbit-ecommerce",
    name: "Orbit E-Commerce",
    status: "Demo",
    tagline: "Electronics e-commerce store",
    role: "Fullstack - frontend, backend, deployment",
    context: "Group project — Web Development course final",
    problem:
      "Needed a full online store flow for electronics (phones, laptops, tablets, smartwatches) with browsing, cart, and checkout.",
    whatIBuilt:
      "A fullstack store deployed live on Railway - product catalog, cart, checkout, promo/discount system, and search autocomplete.",
    // REVIEW: During Railway deployment, duplicate migration pairs from two dev phases caused stub-migration conflicts and foreign-key mismatches. I resolved it by treating the application code as the source of truth and cleaning up the migration history.
    hardProblem:
      "During Railway deployment, duplicate migration pairs from two dev phases caused stub-migration conflicts and foreign-key mismatches. I resolved it by treating the application code as the source of truth and cleaning up the migration history.",
    learned:
      "How to manage many interconnected features and state in a larger app, and how to debug real deployment issues like migration conflicts.",
    stack: ["Laravel", "Blade", "MySQL", "Railway"],
    stats: [
      { value: "Full", label: "shopping flow" },
      { value: "Promo", label: "system" },
      { value: "Railway", label: "deployed" },
    ],
    images: [], // TODO: add screenshots to /public/projects/orbit-ecommerce/
    liveUrl: undefined, // PLACEHOLDER — add Railway URL
    sourceUrl: undefined, // PLACEHOLDER — add GitHub repo
  },
  {
    slug: "healthcare-diagnosis",
    name: "Healthcare Diagnosis System",
    status: "Demo",
    tagline: "Patient diagnosis & routing using core data structures",
    role: "Backend - implemented decision tree traversal & queue logic from scratch",
    context: "Group project (3 members) — Data Structures course final",
    problem:
      "Hospitals need fast, consistent patient triage and scheduling, but doing it manually is slow and error-prone.",
    whatIBuilt:
      "A simulation that diagnoses patients and routes them to the right service using a Decision Tree, manages doctor data with Multi Linked Lists, and handles patient scheduling with a Queue.",
    // REVIEW: Implementing the decision tree traversal and the patient queue from scratch (no libraries), and making the three data structures work together cleanly.
    hardProblem:
      "Implementing the decision tree traversal and the patient queue from scratch (no libraries), and making the three data structures work together cleanly.",
    learned:
      "How abstract data structures map onto a real-world domain like healthcare, and how choosing the right structure makes a system efficient.",
    // REVIEW: confirm language (C++?)
    stack: ["C++", "Decision Tree", "Multi Linked List", "Queue"],
    stats: [
      { value: "3", label: "data structures" },
      { value: "Scratch", label: "no libraries" },
      { value: "3", label: "team size" },
    ],
    images: [], // TODO: add screenshots to /public/projects/healthcare-diagnosis/
    liveUrl: undefined, // console/simulation app — no live URL
    sourceUrl: undefined, // PLACEHOLDER — add GitHub repo
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
