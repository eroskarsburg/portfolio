"use client";

import { useLang } from "./LangProvider";

export function Nav() {
  const { d, lang, setLang } = useLang();

  const links = [
    ["#about", d.nav.about],
    ["#experience", d.nav.experience],
    ["#skills", d.nav.skills],
    ["#education", d.nav.education],
    ["#contact", d.nav.contact],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center border border-red font-display text-base font-extrabold text-red">E</span>
          <span className="hidden sm:inline">
            eros<span className="text-red">.</span>karsburg
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex font-mono text-xs">
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-2.5 py-1.5 uppercase transition-colors ${lang === l ? "bg-red text-bg" : "text-muted hover:text-ink"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
