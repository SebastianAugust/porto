import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiTailwindcss,
  SiPython,
  SiMysql,
  SiTimescale,
  SiDocker,
  SiRailway,
  SiGit,
  SiStreamlit,
} from "react-icons/si";
import { LuBrainCircuit } from "react-icons/lu";

export interface Skill {
  name: string;
  Icon: IconType;
}

/** The tools I actually build with — a flat grid, brand marks + label. */
export const skills: Skill[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Laravel", Icon: SiLaravel },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Python", Icon: SiPython },
  { name: "MySQL", Icon: SiMysql },
  { name: "TimescaleDB", Icon: SiTimescale },
  { name: "Docker", Icon: SiDocker },
  { name: "Railway", Icon: SiRailway },
  { name: "Git", Icon: SiGit },
  { name: "Streamlit", Icon: SiStreamlit },
  { name: "XGBoost", Icon: LuBrainCircuit },
];
