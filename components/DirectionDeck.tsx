import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { directions, Direction } from '@/data/directions';
import { notesForDirection, directionDangling } from '@/lib/content';

function DirectionMark({ mark }: { mark: string }) {
  // 极简线描图标：用方向标记字母 + 细框
  return (
    <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center transition-all duration-500 group-hover:border-accent group-hover:scale-110">
      <span className="text-[11px] tracking-[0.14em] font-semibold text-muted transition-colors duration-500 group-hover:text-accent">
        {mark}
      </span>
    </div>
  );
}

function DirectionCard({ d, index, lang }: { d: Direction; index: number; lang: Lang }) {
  const resume = notesForDirection(d.id, 'resume');
  const learning = notesForDirection(d.id, 'learning');
  const output = notesForDirection(d.id, 'output');
  const dangling = directionDangling[d.id] ?? { resume: [], learning: [], output: [] };

  const allCounts: { key: 'resume' | 'learning' | 'output'; label: string; n: number }[] = [
    { key: 'resume', label: t(lang, 'dir.tab.resume'), n: resume.length + dangling.resume.length },
    { key: 'learning', label: t(lang, 'dir.tab.learning'), n: learning.length + dangling.learning.length },
    { key: 'output', label: t(lang, 'dir.tab.output'), n: output.length + dangling.output.length },
  ];
  const counts = allCounts.filter((c) => c.n > 0);

  return (
    <Link
      href={`/${lang}/career/${d.href}`}
      className="group flex flex-col justify-between gap-8 min-w-[320px] md:min-w-[360px] snap-start p-8 border border-line/70 hover:border-accent/50 hover:scale-[1.02] transition-all duration-500 bg-bg/40 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <DirectionMark mark={d.mark} />
        <span className="text-[11px] tracking-[0.2em] text-faint tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
          {d.title[lang]}
        </h3>
        <p className="text-[13px] text-muted">{d.short[lang]}</p>
      </div>

      {counts.length ? (
        <div className="pt-4 border-t border-line/60 flex gap-6 text-[11px] tracking-[0.12em] text-faint">
          {counts.map((c) => (
            <span key={c.key} className="flex items-baseline gap-1.5">
              <span className="text-muted">{c.label}</span>
              <span className="text-fg/70 tabular-nums">{c.n}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="pt-4 border-t border-line/60 text-[11px] tracking-[0.14em] text-faint">
          {t(lang, 'common.building')}
        </p>
      )}
    </Link>
  );
}

export default function DirectionDeck({ lang }: { lang: Lang }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-[0.22em] text-faint">{t(lang, 'hint.scroll')}</span>
        <span className="text-[10px] tracking-[0.22em] text-faint animate-pulse">→</span>
      </div>
      <div className="snap-x-ming flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
        {directions.map((d, i) => (
          <DirectionCard key={d.id} d={d} index={i} lang={lang} />
        ))}
      </div>
    </div>
  );
}
