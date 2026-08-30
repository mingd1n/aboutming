import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { site } from '@/data/site';

const CITY_SHOTS = ['night-01', 'day-01', 'day-02', 'night-02', 'night-03'] as const;

/**
 * 我的世界 · 人设 + 镜头
 * 头像在「关于我」，城市图在「镜头 · GUANGZHOU」，二者可拆开渲染。
 */
export default function WorldAbout({
  lang,
  showLensStrip = true,
  showAbout = true,
  showLens = true,
  compact = false,
}: {
  lang: Lang;
  showLensStrip?: boolean;
  showAbout?: boolean;
  showLens?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col ${compact ? 'gap-8' : 'gap-10'}`}>
      {showAbout && (
        <div>
          <p className="text-[10px] tracking-[0.22em] text-faint mb-4">{t(lang, 'world.about')}</p>
          <div className="flex items-center gap-5 md:gap-8">
            <div
              className={`relative shrink-0 overflow-hidden border border-line/70 ${
                compact ? 'h-20 w-20 md:h-24 md:w-24' : 'h-28 w-28 md:h-32 md:w-32'
              }`}
            >
              <img
                src="/media/portrait/pfp.jpg"
                alt={`${site.name[lang]} / ${site.alias}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
                {site.name[lang]}
                <span className="text-muted"> / {site.alias}</span>
              </h3>
              <p className="text-[14px] md:text-[15px] leading-snug text-fg/90 max-w-xl">
                {site.oneLiner[lang]}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-[11px] tracking-[0.22em] text-accent">
                  {site.tagline[lang]}
                </span>
                <span aria-hidden className="h-3 w-px bg-line" />
                <span className="text-[11px] tracking-[0.14em] text-faint">
                  {site.location[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLens && (
        <div>
          <p className="text-[10px] tracking-[0.22em] text-faint mb-4">{t(lang, 'world.lens')}</p>
          {showLensStrip ? (
            <div className="snap-x-ming flex items-center gap-4 overflow-x-auto py-5 -mx-6 px-6">
              {CITY_SHOTS.map((k) => (
                <div
                  key={k}
                  className="group relative snap-start min-w-[180px] md:min-w-[220px] aspect-[4/3] overflow-hidden border border-line/70 origin-center transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.08] hover:border-accent/50"
                >
                  <img
                    src={`/media/city/${k}.jpg`}
                    alt={k}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] text-bg/80 mix-blend-difference">
                    {k.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
              {CITY_SHOTS.map((k) => (
                <div
                  key={k}
                  className="group relative overflow-hidden border border-line/70 aspect-[4/3] origin-center transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.06] hover:border-accent/50"
                >
                  <img
                    src={`/media/city/${k}.jpg`}
                    alt={k}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.2em] text-bg/80 mix-blend-difference">
                    {k.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
