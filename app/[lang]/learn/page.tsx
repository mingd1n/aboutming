import Link from 'next/link';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { learnNotesByDate, topicNotes } from '@/lib/content';
import { thinkingTopics } from '@/data/learn';
import TopicCard from '@/components/TopicCard';

export default async function LearnPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);
  const all = learnNotesByDate();

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">LEARN</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">{t(lang, 'learn.title')}</h1>
        <p className="mt-3 text-[13px] tracking-[0.2em] text-accent">{t(lang, 'learn.sub')}</p>
      </div>

      {/* 三个话题入口 */}
      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {thinkingTopics.map((topic) => {
            const count = topicNotes(topic.slugs).filter((n) => !n.isEmpty).length;
            return (
              <Link
                key={topic.id}
                href={`/${lang}/learn/${topic.id}`}
                className="group p-7 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-4"
              >
                <h2 className="text-2xl font-semibold">{topic.title[lang]}</h2>
                <p className="text-[13px] text-muted">
                  {count
                    ? `${count} note${count > 1 ? 's' : ''}`
                    : t(lang, 'common.building')}
                </p>
                <span className="text-[11px] tracking-[0.14em] text-accent group-hover:translate-x-1 transition-transform duration-500">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 全部笔记时间线 */}
      <section className="mb-16">
        <h2 className="text-[11px] tracking-[0.22em] text-muted mb-5">{t(lang, 'learn.all')}</h2>
        {all.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {all.map((n) => (
              <TopicCard key={n.slug} lang={lang} note={n} />
            ))}
          </div>
        ) : (
          <p className="muted">{t(lang, 'plan.empty')}</p>
        )}
      </section>
    </div>
  );
}
