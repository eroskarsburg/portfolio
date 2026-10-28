"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const lines = [
  "$ dotnet run --project Eros.Karsburg",
  "  Restoring packages... C#, .NET, ASP.NET Core, Flutter",
  "  Connecting to acquirer........ OK",
  "  Loading 3+ years of production experience... OK",
  "  info: Microsoft.Hosting.Lifetime",
  "        Now listening on: Canoas, RS (UTC-3)",
  "  status: 200 OK",
];

export function Boot() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
      sessionStorage.setItem("booted", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip intro on revisit
      setDone(true);
      return;
    }
    const timers = lines.map((_, i) => setTimeout(() => setShown(i + 1), 140 + i * 170));
    timers.push(setTimeout(() => setDone(true), 140 + lines.length * 170 + 450));
    const skip = () => setDone(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex items-center bg-bg px-6"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto w-full max-w-3xl font-mono text-[13px] leading-7 sm:text-sm">
            {lines.slice(0, shown).map((line, i) => (
              <div
                key={i}
                className={
                  i === 0 ? "text-ink" : line.includes("200 OK") ? "text-green" : line.includes("OK") ? "text-muted" : "text-muted/70"
                }
              >
                {line.replace(/ OK$/, "")}
                {line.endsWith(" OK") && <span className="text-green"> OK</span>}
              </div>
            ))}
            <span className="blink inline-block h-4 w-2 translate-y-0.5 bg-red" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
