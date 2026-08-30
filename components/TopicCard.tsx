import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import type { Note } from '@/lib/content';

export default function TopicCard({ lang, note }: { lang: Lang; note: Note }) {
  return (
    <Link
      href={`/${lang}/notes/${note.slug.split('/').map(encodeURIComponent).join('/')}`}
      className="h-card"
    >
      <span className="meta">{note.date ?? '—'}</span>
      <h3>{note.title}</h3>
      <span className="go">
        {note.isEmpty ? t(lang, 'common.building') : t(lang, 'common.read')} →
      </span>
    </Link>
  );
}
