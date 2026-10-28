"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { marquee } from "@/lib/content";
import { useLang } from "./LangProvider";
import { CountUp, Eyebrow } from "./ui";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative -rotate-1 border-y border-red bg-red py-4 text-bg">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
              {item}
              <span className="text-xl text-bg/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { d } = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = d.about.text.split(" ");

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40">
      <Eyebrow>{d.about.eyebrow}</Eyebrow>
      <p ref={ref} className="max-w-5xl font-display text-[clamp(1.7rem,4vw,3.4rem)] font-semibold leading-[1.12] tracking-tight">
        {words.map((word, i) => (
          <Word key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <div className="mt-24 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
        {d.about.stats.map((s) => (
          <div key={s.label} className="group relative overflow-hidden border-b border-r border-line p-6 sm:p-8">
            <div className="absolute inset-0 translate-y-full bg-red transition-transform duration-500 group-hover:translate-y-0" />
            <div className="relative font-display text-6xl font-extrabold tracking-tighter sm:text-7xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div className="relative mt-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-bg">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
