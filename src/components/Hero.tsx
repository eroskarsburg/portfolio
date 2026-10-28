"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { AsciiPortrait } from "./AsciiPortrait";
import { useLang } from "./LangProvider";

const ease = [0.22, 1, 0.36, 1] as const;

function LocalClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

function SplitWord({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { d } = useLang();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-red/20 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12">
        <div className="pointer-events-none z-10 flex flex-col justify-center pt-10 lg:col-span-7 lg:py-10 [&_a]:pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <span className="flex items-center gap-2 text-ink">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green" />
              {d.hero.status}
            </span>
            <span>{profile.location}</span>
          </motion.div>

          <h1 className="font-display whitespace-nowrap text-[clamp(3.4rem,14.5vw,7.4rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.04em]">
            <SplitWord text="Eros" delay={0.25} />
            <br />
            <SplitWord text="Karsburg" delay={0.35} className="stroke-text" />
            <SplitWord text="." delay={0.45} className="text-red" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-red"
          >
            {d.hero.role} <span className="text-muted">{"// .NET · C#"}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-7 max-w-xl"
          >
            <p className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {d.hero.line1} <span className="text-red italic">{d.hero.line2}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{d.hero.sub}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="group relative overflow-hidden bg-red px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white"
            >
              <span className="relative z-10">{d.hero.ctaWork} ↓</span>
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 grid -translate-x-full place-items-center text-bg transition-transform duration-500 group-hover:translate-x-0">
                {d.hero.ctaWork} ↓
              </span>
            </a>
            <a
              href="#contact"
              className="border border-line px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:border-red hover:text-red"
            >
              {d.hero.ctaTalk} →
            </a>
          </motion.div>

          <div className="mt-10 hidden gap-10 font-mono text-xs uppercase tracking-widest text-muted lg:flex">
            <div>
              <div className="text-ink/40">{d.hero.local}</div>
              <div className="mt-1 text-ink">
                <LocalClock /> <span className="text-muted">BRT</span>
              </div>
            </div>
            <div>
              <div className="text-ink/40">Stack</div>
              <div className="mt-1 text-ink">C# · .NET · SQL</div>
            </div>
            <div>
              <div className="text-ink/40">Portrait</div>
              <div className="mt-1 text-ink">
                <span className="text-red">●</span> {d.hero.lens}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative h-[62svh] min-h-[380px] lg:absolute lg:inset-y-0 lg:-right-24 lg:h-auto lg:w-[60%]"
        >
          <AsciiPortrait src="/me.png" />
          <div className="pointer-events-none absolute right-0 top-4 font-mono text-[10px] uppercase tracking-widest text-muted lg:hidden">
            <span className="text-red">●</span> {d.hero.lens}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
