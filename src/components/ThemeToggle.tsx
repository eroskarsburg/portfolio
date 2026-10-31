"use client";

import { useLayoutEffect } from "react";
import { useLang } from "./LangProvider";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle() {
  const { d } = useLang();

  // The inline script in the root layout sets the theme during parsing. React resets
  // <html> attributes on the dev Strict Mode remount, so re-apply it here (no-op in production).
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") document.documentElement.setAttribute("data-theme", stored);
    } catch {}
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  const icon = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={d.nav.theme}
      title={d.nav.theme}
      className="grid h-8 w-8 place-items-center border border-line text-muted transition-colors hover:border-red hover:text-red"
    >
      <svg {...icon} className="icon-sun">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg {...icon} className="icon-moon">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
