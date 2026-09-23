import SectionSnap from "@/components/SectionSnap";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    /* `snap-page` switches scroll snap on for <html> — home only. */
    <main className="snap-page">
      <SectionSnap />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
