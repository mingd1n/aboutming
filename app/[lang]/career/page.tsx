import Link from 'next/link';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { site } from '@/data/site';
import { directions } from '@/data/directions';

export default async function CareerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">CAREER</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">{t(lang, 'career.title')}</h1>
        <p className="mt-3 text-[13px] tracking-[0.2em] text-accent">{t(lang, 'career.sub')}</p>
      </div>

      <div className="mb-14 p-6 border border-line/60 text-[13px] leading-relaxed text-muted">
        {site.oneLiner[lang]}
        <br />
        {site.education[lang]}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {directions.map((d, i) => (
          <Link
            key={d.id}
            href={`/${lang}/career/${d.href}`}
            className="group p-7 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-[9px] tracking-[0.1em] font-semibold text-muted group-hover:border-accent group-hover:text-accent group-hover:scale-110 transition-all duration-500">
                {d.mark}
              </span>
              <span className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-faint tabular-nums">
                {String(i + 1).padStart(2, '0')}
                <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
              </span>
            </div>
            <h2 className="text-2xl font-semibold">{d.title[lang]}</h2>
            <p className="text-[13px] text-muted">{d.short[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
