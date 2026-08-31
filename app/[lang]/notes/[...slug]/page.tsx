import Link from 'next/link';
import { notFound } from 'next/navigation';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { noteBySlug, notes } from '@/lib/content';
import { renderNoteHTML } from '@/lib/markdown';

export function generateStaticParams() {
  return notes.map((n) => ({
    slug: n.slug.split('/'),
  }));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang: raw, slug } = await params;
  const lang: Lang = langFromParam(raw);
  const fullSlug = slug.map(decodeURIComponent).join('/');
  const note = noteBySlug(fullSlug);
  if (!note) notFound();

  const backlinkNote = note.backlinks.length ? noteBySlug(note.backlinks[0]) : undefined;

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <header className="mb-12">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-faint mb-6">
          {note.backlinks.length ? (
            <Link href={`/${lang}`} className="hover:text-muted transition-colors">
              ← {t(lang, 'notes.back')}
            </Link>
          ) : null}
          {backlinkNote ? (
            <span>
              {t(lang, 'notes.breadcrumb')}{' '}
              <Link
                href={`/${lang}/notes/${backlinkNote.slug.split('/').map(encodeURIComponent).join('/')}`}
                className="hover:text-accent transition-colors"
              >
                {backlinkNote.title}
              </Link>
            </span>
          ) : null}
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{note.title}</h1>
        {note.tags.length ? (
          <div className="flex flex-wrap gap-2 mt-5">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.12em] text-muted px-2.5 py-1 border border-line/70 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {note.isEmpty ? (
        <div className="py-20 text-center text-muted">
          <span className="text-[12px] tracking-[0.3em]">{t(lang, 'notes.under')}</span>
        </div>
      ) : (
        <div
          className="prose-ming"
          dangerouslySetInnerHTML={{ __html: renderNoteHTML(note.content, note.h1Count, lang) }}
        />
      )}

      <footer className="mt-16 pt-6 border-t border-line/60 text-[10px] tracking-[0.14em] text-faint">
        {t(lang, 'notes.source')}：{note.source}
      </footer>
    </article>
  );
}
