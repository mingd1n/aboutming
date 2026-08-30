import { notFound } from 'next/navigation';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { getDirection, directions, entrySlug } from '@/data/directions';
import { notesForDirection, noteBySlug, notes, type Note } from '@/lib/content';
import { renderNoteHTML } from '@/lib/markdown';

export function generateStaticParams() {
  return directions.map((d) => ({ direction: d.href }));
}

export default async function DirectionPage({
  params,
}: {
  params: Promise<{ lang: string; direction: string }>;
}) {
  const { lang: raw, direction: href } = await params;
  const lang: Lang = langFromParam(raw);
  const dir = getDirection(href);
  if (!dir) notFound();

  const entry = noteBySlug(entrySlug(dir));

  // 该方向在入口笔记正文之外的相关笔记（去 hub、去正文已链接）
  const bodySlugs = new Set<string>();
  if (entry) {
    for (const m of entry.content.matchAll(/\/notes\/([^")]+)/g)) {
      try {
        bodySlugs.add(decodeURIComponent(m[1]));
      } catch {
        bodySlugs.add(m[1]);
      }
    }
  }
  const seen = new Set<string>();
  const pool: Note[] = [
    ...notesForDirection(dir.id, 'resume'),
    ...notesForDirection(dir.id, 'learning'),
    ...notesForDirection(dir.id, 'output'),
    ...notes.filter((n) => n.direction === dir.id && n.tab === null && !n.isHub),
  ];
  const related = pool.filter(
    (n) =>
      n &&
      entry?.slug !== n.slug &&
      !bodySlugs.has(n.slug) &&
      (seen.has(n.slug) ? false : (seen.add(n.slug), true)),
  );

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] tracking-[0.3em] text-faint">{dir.mark}</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">
            {dir.title[lang]}
          </h1>
          <p className="mt-3 text-[13px] text-muted">{dir.short[lang]}</p>
        </div>
        <span className="hidden md:block text-[10px] tracking-[0.2em] text-faint">
          {t(lang, 'dir.source')}
        </span>
      </div>

      {entry && !entry.isEmpty ? (
        <>
          {lang === 'en' ? (
            <p className="mb-8 text-[12px] tracking-[0.08em] text-muted">{t(lang, 'notes.original')}</p>
          ) : null}
          <div
            className="prose-ming"
            dangerouslySetInnerHTML={{ __html: renderNoteHTML(entry.content, entry.h1Count, lang, false) }}
          />
        </>
      ) : (
        <p className="text-muted">{t(lang, 'plan.empty')}</p>
      )}

      {related.length ? (
        <section className="mt-16">
          <h2 className="text-[11px] tracking-[0.22em] text-muted mb-5">{t(lang, 'dir.related')}</h2>
          <div className="grid gap-4">
            {related.map((n) => (
              <a
                key={n.slug}
                href={`/${lang}/notes/${n.slug.split('/').map(encodeURIComponent).join('/')}`}
                className="p-6 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500 flex items-center justify-between gap-3"
              >
                <span className="text-lg font-semibold">{n.title}</span>
                <span className="text-[11px] tracking-[0.14em] text-faint">
                  {n.isEmpty ? t(lang, 'common.building') : t(lang, 'common.read')} →
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
