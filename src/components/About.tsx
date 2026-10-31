"use client";

import { useLang } from "./LangProvider";
import { Section } from "./Section";

export function About() {
  const { d } = useLang();
  return (
    <Section id="about" eyebrow={d.about.eyebrow} title={d.about.title}>
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted sm:text-xl">
        {d.about.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
