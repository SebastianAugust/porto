import type { LucideIcon } from "lucide-react";
import {
  Users,
  CalendarCheck,
  Heart,
  Network,
  Sprout,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export interface OrganizationEntry {
  period: string;
  role: string;
  org: string;
  bullets: string[];
  icon: LucideIcon;
}

export interface EducationEntry {
  period: string;
  degree: string;
  org: string;
  bullets: string[];
  icon: LucideIcon;
}

export const organizations: OrganizationEntry[] = [
  {
    period: "Aug 2026 — Present",
    role: "Deputy Head of Internal Development Department",
    org: "KMB Dharmavira",
    icon: Sprout,
    bullets: [
      "Co-leading the Internal Development Department alongside the Department Head, coordinating a team of staff to design and run member development programs, internal evaluation systems, and community-building activities",
      "Overseeing execution of training, mentoring, and bonding initiatives to strengthen member engagement and organizational cohesion throughout the term",
      "Supporting internal evaluation processes to track member growth and inform department strategy alongside leadership",
    ],
  },
  {
    period: "May 2026 — Present",
    role: "Head of Executor",
    org: "Character Building Season",
    icon: Network,
    bullets: [
      "Leading a cross-functional team of 44 staff across 4 divisions to execute direct participant-facing operations throughout the program",
      "Orchestrating real-time coordination between divisions to translate event concepts and plans into on-ground execution, ensuring consistent participant experience and safety",
      "Sustaining seamless synchronization across all four divisions to ensure planned activities are executed on schedule and aligned with program objectives",
    ],
  },
  {
    period: "Feb 2026 — Present",
    role: "Head of Human Resources",
    org: "Himatif FMIPA Unpad",
    icon: Users,
    bullets: [
      "Led human resource management and internal organizational development",
      "Coordinated member development and evaluation programs",
      "Managed internal communication and team coordination within the organization",
    ],
  },
  {
    period: "Sept 2025 — Nov 2025",
    role: "Project Officer",
    org: "Pekan Penghayatan Dharma, KMB Dharmavira",
    icon: CalendarCheck,
    bullets: [
      "Led and coordinated the execution of the event program",
      "Managed team coordination and event planning activities",
      "Oversaw communication between divisions during event preparation and implementation",
    ],
  },
  {
    period: "Jun 2025 — Oct 2025",
    role: "Head of Medical Division",
    org: "Character Building Season",
    icon: Heart,
    bullets: [
      "Led and coordinated the medical division during the event",
      "Managed team responsibilities and medical preparation",
      "Ensured participant health support and event safety procedures",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    period: "Aug 2024 — Aug 2028",
    degree: "Bachelor's Degree, Computer Science (Informatics Engineering)",
    org: "Universitas Padjadjaran",
    icon: BookOpen,
    bullets: [
      "Currently pursuing a Bachelor's degree in Computer Science",
      "Studying software development, databases, algorithms, operating systems, and web development",
      "Actively involved in organizational and committee activities alongside academic studies",
    ],
  },
  {
    period: "Jul 2021 — May 2024",
    degree: "High School Diploma",
    org: "SMA Sutomo 1",
    icon: GraduationCap,
    bullets: [
      "Completed high school education with involvement in academic and extracurricular activities",
    ],
  },
  
];
