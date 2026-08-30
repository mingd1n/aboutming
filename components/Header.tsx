'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t, type Lang } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const other: Lang = lang === 'zh' ? 'en' : 'zh';
  const switchLabel = lang === 'zh' ? 'EN' : '中';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 保留当前路径，只换语言前缀：/zh/career/web3 → /en/career/web3
  const switched = (() => {
    const parts = (pathname || `/${lang}`).split('/');
    if (parts[1] === 'zh' || parts[1] === 'en') {
      parts[1] = other;
      return parts.join('/') || `/${other}`;
    }
    return `/${other}`;
  })();

  return (
    <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
      <Link
        href={`/${lang}`}
        className="pointer-events-auto flex flex-col leading-none gap-1.5 group"
      >
        <span className="text-[13px] tracking-[0.22em] font-semibold text-fg">
          MING / AXEL
        </span>
        <span className="text-[9px] tracking-[0.3em] text-muted">{t(lang, 'header.role')}</span>
      </Link>

      <div className="pointer-events-auto flex items-center gap-5 text-[13px]">
        <Link
          href={switched}
          className="text-fg/60 hover:text-fg hover:scale-[1.06] tracking-[0.14em] transition-all duration-500"
          title={t(lang, 'lang.switch')}
          hrefLang={other}
        >
          {switchLabel}
        </Link>
        <ThemeToggle lang={lang} />
      </div>
    </header>
  );
}
