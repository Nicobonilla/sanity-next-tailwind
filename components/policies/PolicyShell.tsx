import Link from 'next/link';

export default function PolicyShell({
  children,
  summary,
  title,
}: {
  children: React.ReactNode;
  summary: string;
  title: string;
}) {
  return (
    <section className="section-shell pt-32">
      <div className="site-container max-w-4xl">
        <div className="space-y-5">
          <p className="eyebrow">Informacion legal y de privacidad</p>
          <h1 className="section-title text-balance">{title}</h1>
          <p className="section-copy max-w-3xl">{summary}</p>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--color-text-soft)]">
            <Link
              className="underline decoration-[color:var(--color-accent)] underline-offset-4"
              href="/politica-de-privacidad"
            >
              Politica de privacidad
            </Link>
            <Link
              className="underline decoration-[color:var(--color-accent)] underline-offset-4"
              href="/politica-de-cookies"
            >
              Politica de cookies
            </Link>
          </div>
        </div>

        <article className="mt-10 space-y-8 rounded-2xl border border-[color:rgba(31,39,51,0.08)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-soft)] md:p-10">
          {children}
        </article>
      </div>
    </section>
  );
}
