'use client';

import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import ChapterArt from '@/components/ChapterArt';
import DirectionDeck from '@/components/DirectionDeck';
import WorldAbout from '@/components/WorldAbout';
import { planNotes, noteBySlug } from '@/lib/content';
import { worldItems } from '@/data/world';
import { thinkingTopics } from '@/data/learn';
import ChapterDock from '@/components/ChapterDock';

function noteHref(lang: Lang, slug: string) {
  return `/${lang}/notes/${slug.split('/').map(encodeURIComponent).join('/')}`;
}

/* 话题线描图标 */
function TopicGlyph({ id }: { id: string }) {
  const cls =
    'h-10 w-10 text-muted group-hover:text-accent transition-colors duration-500';
  if (id === 'podcasts') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={cls}>
        <circle cx="12" cy="12" r="3" />
        <path d="M9 16.5a5.5 5.5 0 0 0 0-9M15 16.5a5.5 5.5 0 0 1 0-9M6.5 19a9.5 9.5 0 0 1 0-14M17.5 19a9.5 9.5 0 0 0 0-14" />
      </svg>
    );
  }
  if (id === 'articles') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={cls}>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4M10 12h5M10 16h5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={cls}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
      <path d="M9 4.5a8 8 0 0 1 6 0" />
    </svg>
  );
}

export default function HomeView({ lang }: { lang: Lang }) {
  const plan = planNotes().filter((n) => !n.isEmpty);

  return (
    <div className="home-os">
      <ChapterDock lang={lang} />

      <div className="home-stage">
      {/* 关于我 */}
      <section className="home-block about-block">
        <WorldAbout lang={lang} showAbout showLens={false} compact />
      </section>

      {/* 01 */}
      <section id="build" className="home-block">
        <ChapterArt variant={0} />
        <div className="home-inner">
          <p className="kicker">01</p>
          <h2 className="chapter-title">{t(lang, 'chapter.build')}</h2>
          <p className="sub">{t(lang, 'nav.build')}</p>
          <DirectionDeck lang={lang} />
        </div>
      </section>

      {/* 02 我在想 */}
      <section id="learn" className="home-block">
        <ChapterArt variant={1} />
        <div className="home-inner">
          <p className="kicker">02</p>
          <h2 className="chapter-title">{t(lang, 'chapter.learn')}</h2>
          <p className="sub">{t(lang, 'nav.learn')}</p>

          {/* 三个话题标签 → 独立子页 */}
          <div className="flex flex-wrap gap-5">
            {thinkingTopics.map((topic, i) => (
              <Link
                key={topic.id}
                href={`/${lang}/learn/${topic.id}`}
                className="group relative w-full sm:w-[240px] p-7 overflow-hidden border border-line text-fg hover:text-fg hover:border-accent/60 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_var(--accent)] transition-all duration-500"
              >
                {/* 背景装饰：右上角大编号 */}
                <span
                  aria-hidden
                  className="absolute -top-3 right-3 text-[64px] leading-none font-semibold text-fg/6 group-hover:text-accent/12 transition-colors duration-500 select-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* 线描图标 */}
                <TopicGlyph id={topic.id} />

                <span className="mt-7 block text-[10px] tracking-[0.3em] text-faint group-hover:text-accent transition-colors duration-500">
                  {lang === 'zh' ? topic.title.en.toUpperCase() : topic.title.zh}
                </span>
                <span className="mt-2 block text-2xl font-semibold tracking-tight">
                  {topic.title[lang]}
                </span>

                {/* 底部细线 → 提示 */}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-line group-hover:bg-accent transition-colors duration-500" />
                <span className="absolute bottom-3 right-4 text-[11px] text-faint opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-500">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 */}
      <section id="plan" className="home-block">
        <ChapterArt variant={2} />
        <div className="home-inner">
          <p className="kicker">03</p>
          <h2 className="chapter-title">{t(lang, 'chapter.plan')}</h2>
          <p className="sub">{t(lang, 'nav.plan')}</p>
          {plan.length ? (
            <div className="v-stack">
              {plan.map((n) => (
                <Link key={n.slug} href={noteHref(lang, n.slug)} className="h-card">
                  <h3>{n.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="muted">{t(lang, 'plan.empty')}</p>
          )}
        </div>
      </section>

      {/* 04 */}
      <section id="world" className="home-block">
        <ChapterArt variant={3} />
        <div className="home-inner">
          <p className="kicker">04</p>
          <h2 className="chapter-title">{t(lang, 'chapter.world')}</h2>
          <p className="sub">{t(lang, 'nav.world')}</p>
          <p className="think-label">{t(lang, 'world.sub')}</p>
          <div className="h-row h-row--lift">
            {worldItems.map((item) => {
              const note = noteBySlug(item.slug);
              const empty = !note || note.isEmpty;
              return (
                <Link key={item.id} href={noteHref(lang, item.slug)} className="h-card h-card--lift">
                  <span className="meta">
                    {lang === 'zh' ? item.title.en.toUpperCase() : item.title.zh}
                  </span>
                  <h3>{item.title[lang]}</h3>
                  <p>{item.blurb[lang]}</p>
                  <span className="go">{empty ? t(lang, 'common.building') : t(lang, 'common.read')} →</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <WorldAbout lang={lang} showAbout={false} showLens showLensStrip />
          </div>
          <Link href={`/${lang}/world`} className="more">
            {t(lang, 'world.more')}
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
