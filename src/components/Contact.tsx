"use client";

import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Section } from "./Section";

export function Contact() {
  const { d } = useLang();

  const links = [
    ["E-mail", profile.email, `mailto:${profile.email}`],
    ["LinkedIn", "eros-karsburg", profile.linkedin],
    ["GitHub", "eroskarsburg", profile.github],
  ] as const;

  return (
    <>
      <Section id="contact" eyebrow={d.contact.eyebrow} title={d.contact.title} tone="alt">
        <p className="mb-10 max-w-xl text-lg text-muted">{d.contact.sub}</p>
        <ul className="divide-y divide-line border-y border-line">
          {links.map(([label, text, href]) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-5 transition-colors hover:text-red sm:flex-nowrap"
              >
                <span className="w-full shrink-0 font-mono sm:w-28 text-xs uppercase tracking-widest text-muted">{label}</span>
                <span className="min-w-0 flex-1 font-display [overflow-wrap:anywhere] text-xl font-semibold sm:text-3xl">{text}</span>
                <span className="text-red transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <footer className="border-t border-line bg-bg-2 py-8">
        <p className="mx-auto max-w-6xl px-4 font-mono text-xs text-muted sm:px-6">© {profile.fullName}</p>
      </footer>
    </>
  );
}
