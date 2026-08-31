import Link from 'next/link';
import { notFound } from 'next/navigation';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { thinkingTopic, thinkingTopics } from '@/data/learn';
import { topicNotes } from '@/lib/content';
import TopicCard from '@/components/TopicCard';

export function generateStaticParams() {
  return thinkingTopics.map((topic) => ({ topic: topic.id }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ lang: string; topic: string }>;
}) {
  const { lang: raw, topic: id } = await params;
  const lang: Lang = langFromParam(raw);
  const topic = thinkingTopic(id);
  if (!topic) notFound();
  const notes = topicNotes(topic.slugs);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">LEARN</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">
          {topic.title[lang]}
        </h1>
        <Link
          href={`/${lang}/learn`}
          className="mt-4 inline-block text-[12px] tracking-[0.18em] text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-500"
        >
          ← {t(lang, 'nav.learn')}
        </Link>
      </div>

      {notes.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {notes.map((n) => (
            <TopicCard key={n.slug} lang={lang} note={n} />
          ))}
        </div>
      ) : (
        <p className="muted">{t(lang, 'plan.empty')}</p>
      )}
    </div>
  );
}
