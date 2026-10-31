export function Section({
  id,
  eyebrow,
  title,
  tone = "base",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  tone?: "base" | "alt";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`border-t border-line py-20 sm:py-28 ${tone === "alt" ? "bg-bg-2" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-red">
          <span className="h-px w-8 bg-red" />
          {eyebrow}
        </p>
        <h2 className="mb-12 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}
