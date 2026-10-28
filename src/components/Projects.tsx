"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { profile, projects, type Project } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

type Repo = { name: string; html_url: string; language: string | null; pushed_at: string; fork: boolean };

function timeAgo(iso: string, lang: "pt" | "en") {
  const rtf = new Intl.RelativeTimeFormat(lang === "pt" ? "pt-BR" : "en", { numeric: "auto" });
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return rtf.format(Math.round(diff), "second");
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { d, lang } = useLang();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  return (
    <Reveal delay={(index % 3) * 0.08} className="[perspective:1000px]">
      <motion.a
        href={`${profile.github}/${p.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX: rx, rotateY: ry, "--gx": glowX, "--gy": glowY } as never}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group relative flex h-full min-h-[300px] flex-col overflow-hidden border border-line bg-card p-6 transition-colors hover:border-red/60 sm:p-7"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(400px circle at var(--gx) var(--gy), rgba(224,33,58,0.18), transparent 60%)" }}
        />
        <div className="relative flex items-start justify-between">
          <span className="font-display text-6xl font-extrabold leading-none text-ink/10 transition-colors group-hover:text-red">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">{p.kind[lang]}</span>
        </div>
        <h3 className="relative mt-auto pt-10 font-mono text-xl font-bold tracking-tight break-all">{p.name}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-muted">{p.desc[lang]}</p>
        <div className="relative mt-6 flex items-center justify-between font-mono text-xs">
          <span className="flex items-center gap-2 text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
            {p.lang}
          </span>
          <span className="text-red transition-transform group-hover:translate-x-1">{d.projects.open} ↗</span>
        </div>
      </motion.a>
    </Reveal>
  );
}

function LiveActivity() {
  const { d, lang } = useLang();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=8`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => setRepos(data.filter((r) => !r.fork).slice(0, 5)))
      .catch((e) => e?.name !== "AbortError" && setFailed(true));
    return () => ctrl.abort();
  }, []);

  if (failed) return null;

  return (
    <Reveal className="mt-10 border border-line bg-bg font-mono text-xs">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="uppercase tracking-widest text-muted">
          <span className="text-green">●</span> {d.projects.live}
        </span>
        <span className="text-muted">api.github.com/users/{profile.githubUser}</span>
      </div>
      <div className="divide-y divide-line">
        {!repos && <div className="px-4 py-4 text-muted">{d.projects.loading}</div>}
        {repos?.map((r) => (
          <a
            key={r.name}
            href={r.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-card"
          >
            <span className="truncate">
              <span className="text-muted">{profile.githubUser}/</span>
              <span className="text-ink">{r.name}</span>
            </span>
            <span className="flex shrink-0 gap-4 text-muted">
              <span className="hidden sm:inline">{r.language ?? "—"}</span>
              <span>{timeAgo(r.pushed_at, lang)}</span>
            </span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}

export function Projects() {
  const { d } = useLang();
  return (
    <section id="projects" className="border-t border-line bg-bg-2 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{d.projects.eyebrow}</Eyebrow>
            <Reveal>
              <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tighter">
                {d.projects.title}
              </h2>
            </Reveal>
          </div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-muted hover:text-red">
            {d.projects.all} ↗
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.repo} p={p} index={i} />
          ))}
        </div>

        <LiveActivity />
      </div>
    </section>
  );
}
