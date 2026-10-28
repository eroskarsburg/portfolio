import { About, Marquee } from "@/components/About";
import { Boot } from "@/components/Boot";
import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { LangProvider } from "@/components/LangProvider";
import { Nav } from "@/components/Nav";
import { PaymentFlow } from "@/components/PaymentFlow";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <LangProvider>
      <Boot />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <PaymentFlow />
        <Experience />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>
      <Terminal />
    </LangProvider>
  );
}
