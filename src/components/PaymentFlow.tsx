"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { Eyebrow, Reveal } from "./ui";

type Tx = {
  id: string;
  amount: number;
  method: "CREDIT" | "DEBIT" | "PIX";
  approved: boolean;
  latency: number;
  at: string;
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const STEP_MS = 420;
const NODES = 5;

function randomTx(): Tx {
  const approved = Math.random() > 0.12;
  const methods: Tx["method"][] = ["CREDIT", "DEBIT", "PIX"];
  return {
    id: Math.random().toString(16).slice(2, 10).toUpperCase(),
    amount: Math.round((Math.random() * 480 + 4.9) * 100) / 100,
    method: methods[(Math.random() * methods.length) | 0],
    approved,
    latency: Math.round(80 + Math.random() * 260),
    at: new Date().toLocaleTimeString("pt-BR"),
  };
}

export function PaymentFlow() {
  const { d } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [log, setLog] = useState<Tx[]>([]);
  const [active, setActive] = useState<{ tx: Tx; step: number; back: boolean } | null>(null);
  const busy = useRef(false);

  const fire = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const tx = randomTx();
    // forward to issuer, then response back to the client
    const path = [0, 1, 2, 3, 4, 3, 2, 1, 0];
    path.forEach((step, i) => {
      setTimeout(() => setActive({ tx, step, back: i >= 4 }), i * STEP_MS);
    });
    setTimeout(() => {
      setActive(null);
      setLog((prev) => [tx, ...prev].slice(0, 7));
      busy.current = false;
    }, path.length * STEP_MS);
  }, []);

  useEffect(() => {
    if (!inView) return;
    fire();
    const id = setInterval(fire, STEP_MS * 9 + 900);
    return () => clearInterval(id);
  }, [inView, fire]);

  const total = log.length;
  const approvedCount = log.filter((t) => t.approved).length;
  const avg = total ? Math.round(log.reduce((s, t) => s + t.latency, 0) / total) : 0;
  const stepIndex = active?.step ?? -1;

  return (
    <section id="flow" ref={ref} className="relative border-y border-line bg-bg-2 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{d.flow.eyebrow}</Eyebrow>
            <Reveal>
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[0.95] tracking-tight">
                {d.flow.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{d.flow.sub}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <button
                type="button"
                onClick={fire}
                className="mt-8 border border-red px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-red transition-colors hover:bg-red hover:text-bg"
              >
                ⚡ {d.flow.fire}
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {/* pipeline */}
            <div className="relative border border-line bg-bg p-5 sm:p-8">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-line" />
                <motion.div
                  className={`absolute top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    !active?.back
                      ? "bg-ink shadow-[0_0_18px_var(--ink)]"
                      : active.tx.approved
                        ? "bg-green shadow-[0_0_18px_var(--green)]"
                        : "bg-red shadow-[0_0_18px_var(--red)]"
                  }`}
                  initial={{ left: "10%", opacity: 0 }}
                  animate={{ left: `${10 + (Math.max(0, stepIndex) / (NODES - 1)) * 80}%`, opacity: active ? 1 : 0 }}
                  transition={{ duration: STEP_MS / 1000, ease: "easeInOut" }}
                />
                {d.flow.nodes.map((node, i) => {
                  const lit = stepIndex === i;
                  return (
                    <div key={node} className="relative z-10 flex w-[20%] flex-col items-center gap-3">
                      <div
                        className={`grid h-12 w-12 place-items-center border font-mono text-xs transition-all duration-300 sm:h-16 sm:w-16 ${
                          lit ? "scale-110 border-red bg-red text-bg" : "border-line bg-card text-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="text-center font-mono text-[10px] uppercase tracking-wider text-muted sm:text-xs">{node}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-px border border-line bg-line font-mono">
                <div className="bg-bg p-4">
                  <div className="text-2xl font-bold tabular-nums sm:text-3xl">{total}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">{d.flow.tps}</div>
                </div>
                <div className="bg-bg p-4">
                  <div className="text-2xl font-bold tabular-nums text-green sm:text-3xl">
                    {total ? Math.round((approvedCount / total) * 100) : 0}%
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">{d.flow.rate}</div>
                </div>
                <div className="bg-bg p-4">
                  <div className="text-2xl font-bold tabular-nums sm:text-3xl">{avg}ms</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">{d.flow.latency}</div>
                </div>
              </div>
            </div>

            {/* log */}
            <div className="mt-4 border border-line bg-bg font-mono text-xs">
              <div className="flex items-center justify-between border-b border-line px-4 py-2 text-muted">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                </span>
                <span>{d.flow.log}</span>
                <span className="text-green">● live</span>
              </div>
              <div className="h-[236px] overflow-hidden px-4 py-3">
                <AnimatePresence initial={false}>
                  {log.map((tx) => (
                    <motion.div
                      key={tx.id}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-[auto_1fr_auto] gap-3 py-1 sm:grid-cols-[auto_auto_1fr_auto_auto]"
                    >
                      <span className="text-muted/60">{tx.at}</span>
                      <span className="hidden text-muted sm:inline">tx_{tx.id}</span>
                      <span className="truncate">
                        {tx.method} <span className="text-ink">{brl.format(tx.amount)}</span>
                      </span>
                      <span className="hidden text-muted sm:inline">{tx.latency}ms</span>
                      <span className={tx.approved ? "text-green" : "text-red"}>
                        {tx.approved ? `00 ${d.flow.approved}` : `51 ${d.flow.declined}`}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
