import Link from 'next/link';
import WorldAbout from './WorldAbout';
import { worldItems } from '@/data/world';
import { noteBySlug, notePath } from '@/lib/content';
import { t, type Lang } from '@/lib/i18n';
import { renderNoteHTML } from '@/lib/markdown';

export default function WorldContent({ lang, headingLevel = 3 }: { lang: Lang; headingLevel?: 2 | 3 }) {
  const goals = noteBySlug('兴趣/我的目标');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worldItems.map((item) => {
          const note = noteBySlug(item.slug);
          return (
            <Link key={item.id} href={notePath(lang, item.slug)} className="h-card">
              <Heading className="text-lg font-semibold">{item.title[lang]}</Heading>
              <p>{item.blurb[lang]}</p>
              <span className="go">{note && !note.isEmpty ? t(lang, 'common.read') : t(lang, 'common.building')} →</span>
            </Link>
          );
        })}
      </div>
      <section id="goals" className="world-goals">
        <Heading className="world-subheading">{t(lang, 'world.goals')}</Heading>
        {goals && !goals.isEmpty ? (
          <div
            className="prose-ming mt-4"
            dangerouslySetInnerHTML={{ __html: renderNoteHTML(goals.content, goals.h1Count, lang) }}
          />
        ) : null}
      </section>
      <WorldAbout lang={lang} showAbout={false} headingLevel={headingLevel} />
    </div>
  );
}
