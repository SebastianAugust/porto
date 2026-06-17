import type { LucideIcon } from "lucide-react";
import {
  Users,
  CalendarCheck,
  Box,
  Heart,
  HandCoins,
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
      "Oversaw communication between divisions during preparation and implementation",
    ],
  },
  {
    period: "Aug 2025 — Sept 2025",
    role: "Head of Transportation and Logistics",
    org: "Open House KMB Dharmavira",
    icon: Box,
    bullets: [
      "Coordinated transportation and logistics operations for the event",
      "Managed equipment distribution and venue preparation",
      "Ensured operational activities ran effectively during the event",
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
  {
    period: "May 2025 — Oct 2025",
    role: "Staff of Fundraising",
    org: "IFEST UNPAD",
    icon: HandCoins,
    bullets: [
      "Assisted fundraising activities during the event",
      "Managed product sales and customer interactions at the venue",
      "Helped achieve funding targets through team collaboration",
    ],
  },
  {
    period: "Jan 2025 — Dec 2025",
    role: "Staff of Human Resources",
    org: "Himatif FMIPA Unpad",
    icon: Users,
    bullets: [
      "Assisted organizational human resource management and internal coordination",
      "Supported organizational development programs and member engagement activities",
      "Collaborated with teams to maintain effective communication and workflow",
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
