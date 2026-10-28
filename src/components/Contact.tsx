"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

export function Contact() {
  const { d } = useLang();
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- current year is client-only
    setYear(new Date().getFullYear());
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["E-mail", `mailto:${profile.email}`],
  ] as const;

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-red/25 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
        <Eyebrow>{d.contact.eyebrow}</Eyebrow>
        <Reveal>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
            {d.contact.title1}
            <br />
            <span className="stroke-text">{d.contact.title2}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-muted">{d.contact.sub}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={copy}
            className="group mt-14 flex w-full flex-col items-start gap-2 border-y border-line py-8 text-left"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {copied ? <span className="text-green">✓ {d.contact.copied}</span> : d.contact.copy}
            </span>
            <span className="flex w-full items-center justify-between gap-4">
              <span className="break-all font-display text-[clamp(1.6rem,5.5vw,4.5rem)] font-bold tracking-tight transition-colors group-hover:text-red">
                {profile.email}
              </span>
              <motion.span
                className="hidden text-5xl text-red sm:block"
                animate={{ rotate: copied ? 0 : -45 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                →
              </motion.span>
            </span>
          </button>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="border border-line bg-bg/60 px-5 py-3 font-mono text-sm uppercase tracking-wider backdrop-blur transition-colors hover:border-red hover:bg-red hover:text-bg"
            >
              {label} ↗
            </a>
          ))}
        </div>

        <footer className="mt-28 flex flex-col justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row">
          <span>© {year} {profile.fullName}</span>
          <span>{d.footer}</span>
          <a href="#top" className="hover:text-red">
            ↑ top
          </a>
        </footer>
      </div>
    </section>
  );
}
