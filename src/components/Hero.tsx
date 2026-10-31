"use client";

import Image from "next/image";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";

export function Hero() {
  const { d } = useLang();

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-red/15 blur-[130px]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:pt-24">
        <div className="lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{profile.location}</p>

          <h1 className="mt-5 font-display text-[clamp(3.2rem,10vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Eros
            <br />
            <span className="stroke-text">Karsburg</span>
            <span className="text-red">.</span>
          </h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-red sm:text-sm">{d.hero.title}</p>

          <p className="mt-8 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">{d.hero.headline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{d.hero.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#experience"
              className="bg-red px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ink hover:text-bg"
            >
              {d.hero.ctaExperience} ↓
            </a>
            <a
              href="#contact"
              className="border border-line px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:border-red hover:text-red"
            >
              {d.hero.ctaContact}
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[18rem] lg:col-span-4 lg:max-w-none">
          <div className="relative aspect-square overflow-hidden border border-line bg-gradient-to-b from-red to-red-deep">
            <Image src="/me.png" alt="Eros Karsburg" fill priority sizes="(min-width: 1024px) 28vw, 18rem" className="object-contain object-bottom" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <dl className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
          {d.hero.facts.map((f) => (
            <div key={f.label} className="border-b border-r border-line p-5">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-red">{f.label}</dt>
              <dd className="mt-2 text-sm font-medium leading-snug sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
