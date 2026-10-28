"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { jobs } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

export function Experience() {
  const { d, lang } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{d.work.eyebrow}</Eyebrow>
            <Reveal>
              <h2 className="whitespace-nowrap font-mono text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-tight tracking-tight">
                <span className="text-red">$</span> {d.work.title}
                <span className="blink ml-1 inline-block h-[0.8em] w-[0.45em] translate-y-1 bg-red" />
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-display text-2xl font-bold">{d.work.company}</p>
              <p className="mt-2 max-w-sm text-muted">{d.work.note}</p>
            </Reveal>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          {/* git graph rail */}
          <div className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-red via-red/40 to-line" />

          {jobs.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={job.hash} delay={i * 0.08} className="relative pb-6 pl-12">
                <span
                  className={`absolute left-0 top-7 grid h-6 w-6 place-items-center rounded-full border-2 transition-colors ${
                    isOpen ? "border-red bg-red" : "border-red bg-bg"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isOpen ? "bg-bg" : "bg-red"}`} />
                </span>

                <div
                  className={`border transition-colors ${isOpen ? "border-red/50 bg-card" : "border-line hover:border-ink/20"}`}
                >
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} className="w-full p-5 text-left sm:p-7">
                    <div className="font-mono text-xs">
                      <span className="text-[#e3b341]">commit {job.hash}</span>{" "}
                      <span className="text-muted">(</span>
                      <span className={i === 0 ? "text-green" : "text-red"}>{job.branch}</span>
                      <span className="text-muted">)</span>
                    </div>
                    <div className="mt-1 font-mono text-xs text-muted">Date: {job.period[lang]}</div>
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{job.role[lang]}</h3>
                      <span className={`font-mono text-2xl text-red transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-line px-5 pb-7 pt-5 sm:px-7">
                          <ul className="grid gap-5 sm:grid-cols-2">
                            {job.bullets[lang].map((b) => (
                              <li key={b.title}>
                                <div className="font-mono text-xs uppercase tracking-widest text-green">+ {b.title}</div>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <span key={tag} className="border border-line px-2.5 py-1 font-mono text-[11px] text-ink/80">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
