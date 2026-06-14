import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Organizations } from "@/components/Organizations";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Organizations />
      <Achievements />
      <Contact />
    </main>
  );
}
