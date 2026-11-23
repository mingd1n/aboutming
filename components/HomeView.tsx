import Link from 'next/link';
import ChapterArt from './ChapterArt';
import ChapterDock from './ChapterDock';
import DirectionDeck from './DirectionDeck';
import ThoughtTimeline from './ThoughtTimeline';
import WorldAbout from './WorldAbout';
import WorldContent from './WorldContent';
import { t, type Lang } from '@/lib/i18n';

export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <div className="home-os">
      <ChapterDock lang={lang} />
      <div className="home-stage">
        <section className="home-block about-block">
          <WorldAbout lang={lang} showLens={false} compact />
        </section>

        <section id="build" tabIndex={-1} className="home-block">
          <ChapterArt variant="build" />
          <div className="home-inner">
            <p className="kicker">01</p>
            <h2 className="chapter-title">{t(lang, 'chapter.build')}</h2>
            <p className="sub">{t(lang, 'nav.build')}</p>
            <DirectionDeck lang={lang} />
          </div>
        </section>

        <section id="learn" tabIndex={-1} className="home-block thoughts-block">
          <ChapterArt variant="learn" />
          <div className="home-inner">
            <p className="kicker">02</p>
            <h2 className="chapter-title">{t(lang, 'chapter.learn')}</h2>
            <p className="sub">{t(lang, 'nav.learn')}</p>
            <ThoughtTimeline lang={lang} />
          </div>
        </section>

        <section id="world" tabIndex={-1} className="home-block">
          <ChapterArt variant="world" />
          <div className="home-inner">
            <p className="kicker">03</p>
            <h2 className="chapter-title">{t(lang, 'chapter.world')}</h2>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6">
              <p className="sub mb-0">{t(lang, 'nav.world')}</p>
              <Link href={`/${lang}/world`} className="interactive-control py-2 text-xs text-muted">
                {t(lang, 'world.more')}
              </Link>
            </div>
            <WorldContent lang={lang} />
          </div>
        </section>
      </div>
    </div>
  );
}
