"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { education, jobs, profile, projects, stack } from "@/lib/content";
import { useLang } from "./LangProvider";

type Out = { kind: "in" | "out" | "err" | "ok"; text: string };

const COMMANDS = ["help", "whoami", "experience", "projects", "stack", "education", "contact", "lang", "goto", "clear", "exit", "sudo"];

export function Terminal() {
  const { lang, setLang, terminalOpen: open, setTerminalOpen: setOpen } = useLang();
  const [history, setHistory] = useState<Out[]>([]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const pt = lang === "pt";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === "INPUT";
      if ((e.key === "`" || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) && !(typing && e.key === "`")) {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    if (history.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- greet on first open
      setHistory([
        { kind: "ok", text: "eros-shell v1.0.0 — .NET 10 runtime" },
        { kind: "out", text: pt ? "Digite 'help' para ver os comandos." : "Type 'help' to list commands." },
      ]);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, history.length, pt]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const out: Out[] = [{ kind: "in", text: raw }];
    const say = (text: string, kind: Out["kind"] = "out") => out.push({ kind, text });

    switch (cmd?.toLowerCase()) {
      case "":
        break;
      case "help":
        say("whoami       " + (pt ? "quem sou eu" : "who am I"));
        say("experience   " + (pt ? "histórico profissional" : "work history"));
        say("projects     " + (pt ? "projetos no GitHub" : "GitHub projects"));
        say("stack        " + (pt ? "tecnologias" : "technologies"));
        say("education    " + (pt ? "formação" : "education"));
        say("contact      " + (pt ? "como falar comigo" : "how to reach me"));
        say("goto <sec>   " + (pt ? "rolar até uma seção" : "scroll to a section"));
        say("lang pt|en   " + (pt ? "trocar idioma" : "switch language"));
        say("clear / exit");
        break;
      case "whoami":
        say(`${profile.fullName}`, "ok");
        say("Full Stack Software Engineer · .NET / C#");
        say(pt ? "3+ anos em web apps, APIs e sistemas de pagamento de missão crítica." : "3+ years in web apps, APIs and mission-critical payment systems.");
        say(profile.location);
        break;
      case "experience":
        jobs.forEach((j) => say(`${j.hash}  ${j.role[lang].padEnd(24)} ${j.period[lang]}`));
        break;
      case "projects":
        projects.forEach((p) => say(`${p.name.padEnd(26)} ${p.lang.padEnd(8)} ${profile.github}/${p.repo}`));
        break;
      case "stack":
        stack.forEach((g) => say(`${g.group}: ${g.items.join(", ")}`));
        break;
      case "education":
        education.forEach((e) => say(`${e.period.padEnd(12)} ${e.title[lang]} — ${e.school}`));
        break;
      case "contact":
        say(`email     ${profile.email}`, "ok");
        say(`github    ${profile.github}`);
        say(`linkedin  ${profile.linkedin}`);
        break;
      case "lang":
        if (args[0] === "pt" || args[0] === "en") {
          setLang(args[0]);
          say(args[0] === "pt" ? "Idioma: português" : "Language: English", "ok");
        } else say("usage: lang pt|en", "err");
        break;
      case "goto": {
        const map: Record<string, string> = {
          about: "about", sobre: "about", flow: "flow", payments: "flow", pagamentos: "flow",
          work: "work", experience: "work", experiencia: "work", projects: "projects", projetos: "projects",
          stack: "stack", education: "education", formacao: "education", contact: "contact", contato: "contact", top: "top",
        };
        const id = map[(args[0] ?? "").toLowerCase()];
        if (id) {
          setOpen(false);
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          say(`→ #${id}`, "ok");
        } else say("usage: goto about|flow|work|projects|stack|education|contact", "err");
        break;
      }
      case "sudo":
        if (args.join(" ").toLowerCase().includes("hire")) {
          say(pt ? "[sudo] senha para recrutador: ********" : "[sudo] password for recruiter: ********");
          say(pt ? "Permissão concedida. Abrindo e-mail..." : "Permission granted. Opening email...", "ok");
          setTimeout(() => (window.location.href = `mailto:${profile.email}?subject=Oportunidade`), 600);
        } else say(pt ? "Boa tentativa. Tente 'sudo hire eros'." : "Nice try. Try 'sudo hire eros'.", "err");
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        setOpen(false);
        break;
      case "rm":
        say(pt ? "Não em produção. 🙂" : "Not in production. 🙂", "err");
        break;
      default:
        say(`${cmd}: command not found. ${pt ? "Tente" : "Try"} 'help'.`, "err");
    }
    setHistory((h) => [...h, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setPast((p) => [input, ...p]);
      setInput("");
      setCursor(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(past.length - 1, cursor + 1);
      if (past[next] !== undefined) {
        setCursor(next);
        setInput(past[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setInput(next >= 0 ? past[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match && input) setInput(match + " ");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Terminal"
            className="w-full max-w-3xl border border-red/50 bg-[#0d0b0b] shadow-[0_40px_120px_-20px_rgba(224,33,58,0.35)]"
            initial={{ y: 40, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-muted">
              <span className="flex gap-1.5">
                <button type="button" aria-label="close" onClick={() => setOpen(false)} className="h-3 w-3 rounded-full bg-red" />
                <span className="h-3 w-3 rounded-full bg-ink/20" />
                <span className="h-3 w-3 rounded-full bg-ink/20" />
              </span>
              <span>guest@eros-karsburg: ~</span>
              <span>esc</span>
            </div>
            <div ref={bodyRef} className="h-[55vh] max-h-[440px] overflow-y-auto p-4 font-mono text-[13px] leading-6">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    h.kind === "in" ? "text-ink" : h.kind === "err" ? "text-red" : h.kind === "ok" ? "text-green" : "text-muted"
                  }`}
                >
                  {h.kind === "in" && <span className="text-red">❯ </span>}
                  {h.text}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-red">❯&nbsp;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="command"
                  className="flex-1 bg-transparent text-ink caret-red outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
