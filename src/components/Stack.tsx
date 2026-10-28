"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { stack } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

export function Stack() {
  const { d } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const tag = (s: string) => <span className="text-red">{s}</span>;
  const attr = (s: string) => <span className="text-[#e3b341]">{s}</span>;
  const val = (s: string) => <span className="text-green">&quot;{s}&quot;</span>;

  const lines: [number, React.ReactNode][] = [
    [0, <>{tag("<Project")} {attr("Sdk")}={val("Eros.NET.Sdk.FullStack")}{tag(">")}</>],
    [1, tag("<PropertyGroup>")],
    [2, <>{tag("<TargetFramework>")}net10.0{tag("</TargetFramework>")}</>],
    [2, <>{tag("<Experience>")}3+ years{tag("</Experience>")}</>],
    [2, <>{tag("<Domain>")}payments; web; mobile{tag("</Domain>")}</>],
    [2, <>{tag("<Nullable>")}disable-bugs{tag("</Nullable>")}</>],
    [1, tag("</PropertyGroup>")],
    [0, " "],
    ...stack.flatMap((g): [number, React.ReactNode][] => [
      [1, <span key="c" className="text-ink/30">{`<!-- ${g.group} -->`}</span>],
      [1, tag("<ItemGroup>")],
      ...g.items.slice(0, 5).map((item): [number, React.ReactNode] => [
        2,
        <>{tag("<PackageReference")} {attr("Include")}={val(item)} {tag("/>")}</>,
      ]),
      [1, tag("</ItemGroup>")],
    ]),
    [0, tag("</Project>")],
  ];

  return (
    <section id="stack" className="mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{d.stack.eyebrow}</Eyebrow>
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[0.95] tracking-tight">{d.stack.title}</h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {stack.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 0.06}>
                <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{g.group}</div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="border border-line bg-card px-3 py-1.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-red hover:text-red"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={ref} className="lg:col-span-7">
          <div className="border border-line bg-bg-2 font-mono text-[12px] leading-6 sm:text-[13px]">
            <div className="flex items-center gap-4 border-b border-line px-4 py-2.5 text-muted">
              <span className="border-b-2 border-red pb-1 text-ink">Eros.Karsburg.csproj</span>
              <span className="hidden sm:inline">Program.cs</span>
              <span className="hidden sm:inline">appsettings.json</span>
            </div>
            <div className="overflow-x-auto py-4 pr-4">
              {lines.map(([indent, content], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.035, duration: 0.3 }}
                  className="flex"
                >
                  <span className="w-10 shrink-0 select-none pr-4 text-right text-ink/20">{i + 1}</span>
                  <span style={{ paddingLeft: `${indent * 1.25}rem` }} className="whitespace-pre-wrap break-all">
                    {content}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-line px-4 py-3 text-muted">
              <span className="text-red">$</span> {d.stack.restore}{" "}
              <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.4 }} className="text-green">
                → {d.stack.restored} (0 warnings, 0 errors)
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
