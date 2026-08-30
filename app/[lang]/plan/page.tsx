import Link from 'next/link';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { planNotes } from '@/lib/content';

export default async function PlanPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);
  const notes = planNotes().filter((n) => !n.isEmpty);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">PLAN</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">
          {t(lang, 'plan.title')}
        </h1>
        <p className="mt-3 text-[13px] tracking-[0.2em] text-accent">{t(lang, 'plan.sub')}</p>
      </div>

      {notes.length ? (
        <div className="grid gap-4">
          {notes.map((n) => (
            <Link
              key={n.slug}
              href={`/${lang}/notes/${n.slug.split('/').map(encodeURIComponent).join('/')}`}
              className="p-6 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500"
            >
              <h2 className="text-lg font-semibold">{n.title}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted leading-relaxed max-w-xl">{t(lang, 'plan.empty')}</p>
      )}
    </div>
  );
}
