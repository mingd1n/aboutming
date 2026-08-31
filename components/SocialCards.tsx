import { t, type Lang } from '@/lib/i18n';
import { site, SocialItem } from '@/data/site';

/** 各社交平台线条图标（与站内线描风格一致） */
function BrandIcon({ id }: { id: string }) {
  const cls = 'h-5 w-5 shrink-0 text-muted group-hover:text-accent transition-colors duration-500';
  switch (id) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.1" cy="6.9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls} aria-hidden>
          <path d="M10.2 18.6a3.6 3.6 0 1 1-3.6-3.6" />
          <path d="M10.4 18.6V5.6" />
          <path d="M10.4 5.6c0 2 1.6 3.6 3.6 4" />
          <path d="M14 6.6a4.6 4.6 0 0 1 4.6 4.6" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 19c-2 0-2-1.5-1-2M9 19v-3c0-1 .2-1.4-.4-2M15 19c2 0 2-1.5 1-2M15 19v-3c0-1-.2-1.4.4-2" />
          <path d="M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      );
    case 'xiaohongshu-photo':
    case 'xiaohongshu-tech':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls} aria-hidden>
          <path d="M4 5.5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
          <path d="M2.5 9.5 12 14.5l9.5-5" />
          <path d="M8.5 17.5v-3M15.5 17.5v-3" />
        </svg>
      );
    default:
      // wechat / 公众号
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls} aria-hidden>
          <path d="M4 3.5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.5L9 19v-3.5H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
          <circle cx="8.5" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="12" cy="9.5" r="0.6" fill="currentColor" />
          <circle cx="15.5" cy="9.5" r="0.6" fill="currentColor" />
        </svg>
      );
  }
}

export default function SocialCards({
  lang,
  include,
}: {
  lang: Lang;
  include?: string[];
}) {
  const items: SocialItem[] = site.social.filter((s) => !include || include.includes(s.id));
  const body = (s: SocialItem) => (
    <>
      <div className="social-card-head">
        <BrandIcon id={s.id} />
        <span className="social-card-name">{s.label}</span>
      </div>
      <span className="social-card-note">{s.note[lang]}</span>
      {s.qr ? (
        <span className="social-card-qr">
          <img src={s.qr} alt={s.label} />
        </span>
      ) : null}
      {s.href ? <span className="social-card-link">{t(lang, 'social.open')} →</span> : null}
    </>
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) =>
        s.href ? (
          <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="social-card group">
            {body(s)}
          </a>
        ) : (
          <div key={s.id} className="social-card group">
            {body(s)}
          </div>
        ),
      )}
    </div>
  );
}
