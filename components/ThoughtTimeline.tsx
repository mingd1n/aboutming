import Link from 'next/link';
import ThoughtScroll from './ThoughtScroll';
import { noteTitle } from '@/data/note-titles';
import { notePath, thoughtNotes } from '@/lib/content';
import { t, type Lang } from '@/lib/i18n';
import { excerpt } from '@/lib/markdown';

export default function ThoughtTimeline({ lang }: { lang: Lang }) {
  const thoughts = thoughtNotes();
  const dates = new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  });

  if (!thoughts.length) {
    return <p className="thought-empty text-sm text-muted">{t(lang, 'learn.empty')}</p>;
  }

  return (
    <ThoughtScroll label={t(lang, 'learn.timeline')} hint={t(lang, 'learn.older')}>
      <ol className="thought-track">
        {thoughts.map((note) => {
          const preview = excerpt(note.content, 135);
          return (
            <li key={note.slug} className="thought-stop">
              <span className="thought-date">
                {note.date && <time dateTime={note.date}>{dates.format(new Date(note.date))}</time>}
              </span>
              <Link href={notePath(lang, note.slug)} className="interactive-card thought-card">
                <h3>{noteTitle(note, lang)}</h3>
                {preview && <p className="line-clamp-3">{preview}</p>}
                <span className="interactive-arrow" aria-hidden>↗</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </ThoughtScroll>
  );
}
