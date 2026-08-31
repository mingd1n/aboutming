import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { site } from '@/data/site';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-line/60">
      <div className="flex flex-col gap-1.5 leading-none">
        <span className="text-[12px] tracking-[0.22em] font-semibold text-fg">
          MING / AXEL
        </span>
        <span className="text-[9px] tracking-[0.3em] text-muted">
          {t(lang, 'footer.loc')}
        </span>
      </div>

      <div className="flex flex-col gap-4 md:items-end">
        <Link
          href={`/${lang}/contact`}
          className="text-[12px] tracking-[0.2em] text-fg/70 hover:text-fg hover:-translate-y-0.5 transition-all duration-500"
        >
          {t(lang, 'footer.contact')} →
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.12em]">
          {site.social.map((s) => {
            if (s.href) {
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-fg hover:-translate-y-0.5 transition-all duration-500"
                >
                  {s.label}
                </a>
              );
            }
            return (
              <span key={s.id} className="text-muted">
                {s.label}
              </span>
            );
          })}
          <a
            href={`mailto:${site.email}`}
            className="text-muted hover:text-fg transition-colors"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
