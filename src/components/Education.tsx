"use client";

import { motion } from "motion/react";
import { education } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

export function Education() {
  const { d, lang } = useLang();
  return (
    <section id="education" className="border-t border-line bg-bg-2 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Eyebrow>{d.edu.eyebrow}</Eyebrow>
        <div className="mt-10 border-t border-line">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <div className="group grid items-center gap-4 border-b border-line py-8 transition-colors hover:bg-bg sm:grid-cols-12 sm:px-4">
                <div className="font-mono text-xs uppercase tracking-widest text-muted sm:col-span-2">
                  {e.period}
                  {e.progress < 1 && (lang === "pt" ? "presente" : "present")}
                </div>
                <div className="sm:col-span-6">
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-red sm:text-4xl">
                    {e.title[lang]}
                  </h3>
                  <p className="mt-1 text-muted">
                    {e.school} · {e.place}
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <div className="flex justify-between font-mono text-xs text-muted">
                    <span>{e.note[lang]}</span>
                    <span className={e.progress < 1 ? "text-red" : "text-green"}>{Math.round(e.progress * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1 bg-line">
                    <motion.div
                      className={`h-full origin-left ${e.progress < 1 ? "bg-red" : "bg-green"}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: e.progress }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
