"use client";

import { skills } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Section } from "./Section";

export function Skills() {
  const { d, lang } = useLang();
  return (
    <Section id="skills" eyebrow={d.skills.eyebrow} title={d.skills.title}>
      <div className="divide-y divide-line border-y border-line">
        {skills.map((g) => (
          <div key={g.group.en} className="grid gap-3 py-6 md:grid-cols-12">
            <h3 className="font-mono text-xs uppercase tracking-widest text-red md:col-span-3 md:pt-1.5">{g.group[lang]}</h3>
            <ul className="flex flex-wrap gap-2 md:col-span-9">
              {g.items.map((item) => (
                <li key={item} className="border border-line bg-card px-3 py-1.5 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
