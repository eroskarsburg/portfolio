"use client";

import { education, projects, profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Section } from "./Section";

export function Education() {
  const { d, lang } = useLang();
  return (
    <Section id="education" eyebrow={d.education.eyebrow} title={d.education.title} tone="alt">
      <div className="divide-y divide-line border-y border-line">
        {education.map((e) => (
          <div key={e.school} className="grid gap-2 py-6 md:grid-cols-12 md:gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted md:col-span-3 md:pt-1.5">{e.period[lang]}</p>
            <div className="md:col-span-9">
              <h3 className="font-display text-xl font-bold sm:text-2xl">{e.title[lang]}</h3>
              <p className="mt-1 text-muted">
                {e.school} · {e.place}
              </p>
              {e.note && <p className="mt-1 text-sm text-muted/80">{e.note[lang]}</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  const { d, lang } = useLang();
  return (
    <Section id="projects" eyebrow={d.projects.eyebrow} title={d.projects.title}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={`${profile.github}/${p.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col border border-line bg-card p-6 transition-colors hover:border-red/60"
            >
              <span className="font-mono text-lg font-bold group-hover:text-red">{p.name}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc[lang]}</span>
              <span className="mt-5 font-mono text-xs uppercase tracking-widest text-muted">{p.lang}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block font-mono text-sm text-red hover:text-ink">
        {d.projects.all} ↗
      </a>
    </Section>
  );
}
