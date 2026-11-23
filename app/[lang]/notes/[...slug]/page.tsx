import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { langFromParam, t, LANGS, type Lang } from '@/lib/i18n';
import { noteTitle } from '@/data/note-titles';
import { legacyNotePath, noteBySlug, notePath, notes } from '@/lib/content';
import { renderNoteHTML } from '@/lib/markdown';
import { directions } from '@/data/directions';

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    notes.map((n) => ({
      lang,
      slug: n.slug.split('/'),
    })),
  );
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
  const legacy = legacyNotePath(note);
  if (legacy) redirect(`/${lang}${legacy}`);

  const direction = directions.find((item) => item.id === note.direction);
  const parent = direction
    ? { href: `/${lang}/career/${direction.href}`, title: direction.title[lang] }
    : note.category === 'learn'
      ? { href: `/${lang}/learn`, title: t(lang, 'learn.title') }
      : note.category === 'interest'
        ? { href: `/${lang}/world`, title: t(lang, 'world.title') }
        : { href: `/${lang}`, title: t(lang, 'notes.back') };
  const parents = [...new Set(note.backlinks)]
    .map(noteBySlug)
    .filter((entry) => entry && entry !== note && !legacyNotePath(entry));

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <header className="mb-12">
        <nav aria-label={t(lang, 'notes.breadcrumb')} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted mb-6">
          <Link href={parent.href} className="interactive-control hover:text-accent">← {parent.title}</Link>
          {parents.map((entry) => entry && (
            <Link key={entry.slug} href={notePath(lang, entry.slug)} className="interactive-control hover:text-accent">
              {noteTitle(entry, lang)}
            </Link>
          ))}
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {noteTitle(note, lang)}
        </h1>
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

    </article>
  );
}
