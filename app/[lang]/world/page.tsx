import Link from 'next/link';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { worldItems } from '@/data/world';
import { noteBySlug } from '@/lib/content';
import { excerpt } from '@/lib/markdown';
import WorldAbout from '@/components/WorldAbout';

export default async function WorldPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">WORLD</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">
          {t(lang, 'world.title')}
        </h1>
        <p className="mt-3 text-[13px] tracking-[0.2em] text-accent">{t(lang, 'world.sub')}</p>
        <p className="mt-4 text-[13px] text-muted max-w-xl leading-relaxed">
          {t(lang, 'world.vs.tourguide')}
        </p>
      </div>

      <div className="mb-16">
        <WorldAbout lang={lang} showAbout showLens={false} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {worldItems.map((item) => {
          const note = noteBySlug(item.slug);
          const empty = !note || note.isEmpty;
          return (
            <Link
              key={item.id}
              href={`/${lang}/notes/${item.slug.split('/').map(encodeURIComponent).join('/')}`}
              className="p-7 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-3"
            >
              <span className="text-[10px] tracking-[0.2em] text-faint">
                {lang === 'zh' ? item.title.en.toUpperCase() : item.title.zh}
              </span>
              <h2 className="text-2xl font-semibold">{item.title[lang]}</h2>
              <p className="text-[13px] text-muted">{item.blurb[lang]}</p>
              {!empty && note && (
                <p className="text-[13px] text-muted leading-relaxed line-clamp-3">
                  {excerpt(note.content)}
                </p>
              )}
              <span className="mt-auto text-[11px] tracking-[0.14em] text-accent">
                {empty ? t(lang, 'common.building') : t(lang, 'common.read')} →
              </span>
            </Link>
          );
        })}
      </div>

      <WorldAbout lang={lang} showAbout={false} showLens showLensStrip={false} />
    </div>
  );
}
