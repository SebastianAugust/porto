export interface WorkEntry {
  period: string;
  role: string;
  org: string;
  bullets: string[];
}

export interface EducationEntry {
  period: string;
  degree: string;
  org: string;
  bullets: string[];
}

export const work: WorkEntry[] = [
  {
    period: "2024 — Present",
    role: "Freelance Fullstack Developer",
    org: "Lawang Sewu Client",
    bullets: [
      "Built an end-to-end POS system used daily by a real warung makan",
      "Shipped PWA, WhatsApp reporting, and an owner dashboard from scratch",
      "Handled full deployment: Vercel frontend + Hostinger Laravel backend",
    ],
  },
  {
    period: "2024 — Present",
    role: "HR Staff",
    org: "Student Organization (BE), Universitas Padjadjaran",
    bullets: [
      "Designed staff performance & welfare evaluation matrices",
      "Created structured interview frameworks per evaluation category",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    period: "2024 — Present",
    degree: "S1 Teknik Informatika",
    org: "FMIPA, Universitas Padjadjaran",
    bullets: ["Semester 4", "Focus on full-stack engineering and applied ML"],
  },
];
