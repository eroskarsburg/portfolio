"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ui, type Dict, type Lang } from "@/lib/content";

const STORAGE_KEY = "portfolio-lang";

type Ctx = {
  lang: Lang;
  d: Dict;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "pt" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
        setLangState(stored);
      } else if (!navigator.language.toLowerCase().startsWith("pt")) {
        setLangState("en");
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, d: ui[lang], setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
