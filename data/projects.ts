/**
 * The shipped catalog — each entry carries a real production status so the grid
 * reads like an engineer's ledger, not a brochure.
 */
export type ProjectStatus = "Live" | "Deployed" | "In Dev" | "Demo";

export interface Project {
  name: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  /** Live site, when there is one. */
  website?: string;
  /** Public source, when there is one. */
  source?: string;
  /** Featured projects get a subtle blue border glow. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Lawang Sewu POS",
    description:
      "Kasir system for a warung makan: PWA, role-based auth (owner/kasir), thermal receipt printing (58mm), WhatsApp reports via Fonnte, a Recharts dashboard, and PDF/Excel export.",
    tags: ["React", "Laravel", "MySQL", "Tailwind"],
    status: "Live",
    featured: true,
  },
  {
    name: "AI-ORBIT Solar",
    description:
      "Agentic ML system for solar power plant anomaly detection: five ML models (XGBoost, LSTM, Autoencoder, Isolation Forest, KMeans), a three-layer agent architecture, a Streamlit dashboard, Telegram alerts, and Docker.",
    tags: ["Python", "Docker", "Railway"],
    status: "Deployed",
    source: "https://github.com/web-shooter-3-6/ai-orbit-solar-power-plant",
  },
  {
    name: "PlayStation Rental",
    description:
      "Booking system with an interactive visual floor plan, clickable seats, a step-based wizard, Midtrans payments, WhatsApp notifications, and a session countdown.",
    tags: ["React", "Laravel", "Midtrans"],
    status: "In Dev",
  },
  {
    name: "Orbit E-Commerce",
    description:
      "Gadget store with catalog, cart, checkout, a promo system, search autocomplete, and dark mode.",
    tags: ["Laravel", "Blade", "MySQL"],
    status: "Demo",
  },
];
