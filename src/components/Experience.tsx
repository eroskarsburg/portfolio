"use client";

import { roles } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Section } from "./Section";

export function Experience() {
  const { d, lang } = useLang();

  return (
    <Section id="experience" eyebrow={d.experience.eyebrow} title={d.experience.title} tone="alt">
      <div className="mb-12 border-l-2 border-red pl-5">
        <p className="font-display text-2xl font-bold sm:text-3xl">{d.experience.company}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">{d.experience.companyNote}</p>
        <p className="mt-3 max-w-xl text-muted">{d.experience.companySub}</p>
      </div>

      <ol className="space-y-8">
        {roles.map((role) => (
          <li key={role.title.en} className={`border ${role.current ? "border-red/50 bg-card" : "border-line"}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-5 sm:px-8 sm:py-6">
              <h3 className={`font-display font-extrabold tracking-tight ${role.current ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                {role.title[lang]}
                {role.current && (
                  <span className="ml-3 inline-block translate-y-[-0.3em] border border-red px-2 py-0.5 align-middle font-mono text-[10px] font-normal uppercase tracking-widest text-red">
                    {d.experience.current}
                  </span>
                )}
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">{role.period[lang]}</span>
            </div>

            <div className="px-5 py-6 sm:px-8 sm:py-8">
              {role.groups && (
                <dl className="grid gap-x-12 gap-y-7 md:grid-cols-2">
                  {role.groups.map((g) => (
                    <div key={g.title.en} className={g.wide ? "md:col-span-2" : undefined}>
                      <dt className="font-mono text-xs uppercase tracking-widest text-red">{g.title[lang]}</dt>
                      <dd className="mt-2 leading-relaxed text-muted">{g.body[lang]}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {role.bullets && (
                <ul className={`space-y-3 text-muted ${role.groups ? "mt-8 border-t border-line pt-6 text-sm" : ""}`}>
                  {role.bullets.map((b) => (
                    <li key={b.en} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-red" aria-hidden />
                      <span>{b[lang]}</span>
                    </li>
                  ))}
                </ul>
              )}

              {role.tools && (
                <div className="mt-8 border-t border-line pt-6">
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{d.experience.tools}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.tools.map((tool) => (
                      <span key={tool} className="border border-line px-2.5 py-1 font-mono text-xs text-ink/85">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
