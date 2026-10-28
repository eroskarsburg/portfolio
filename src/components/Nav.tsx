"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "./LangProvider";

export function Nav() {
  const { d, lang, setLang, setTerminalOpen } = useLang();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const links = [
    ["#about", d.nav.about],
    ["#flow", d.nav.flow],
    ["#work", d.nav.work],
    ["#projects", d.nav.projects],
    ["#stack", d.nav.stack],
    ["#contact", d.nav.contact],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <motion.div className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-red" style={{ scaleX: progress }} />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center border border-red font-display text-base font-extrabold text-red transition-colors group-hover:bg-red group-hover:text-bg">
            E
          </span>
          <span className="hidden sm:inline">
            eros<span className="text-red">.</span>karsburg
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([href, label], i) => (
            <a key={href} href={href} className="group font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink">
              <span className="text-red/70">0{i + 1}</span> {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            className="flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-red hover:text-ink"
          >
            <span className="text-red">&gt;_</span>
            <span className="hidden sm:inline">{d.terminalHint}</span>
            <kbd className="hidden border border-line px-1 text-[10px] sm:inline">`</kbd>
          </button>
          <div className="flex font-mono text-xs">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2 py-1.5 uppercase transition-colors ${lang === l ? "bg-red text-bg" : "text-muted hover:text-ink"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
