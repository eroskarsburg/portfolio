import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education, Projects } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { LangProvider } from "@/components/LangProvider";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
    </LangProvider>
  );
}
