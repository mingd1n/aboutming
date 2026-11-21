'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t, type Lang } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const other: Lang = lang === 'zh' ? 'en' : 'zh';
  const switchLabel = lang === 'zh' ? 'EN' : '中';

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
    <header className="site-header fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-3.5 pointer-events-none">
      <Link
        href={`/${lang}`}
        className="interactive-control pointer-events-auto flex flex-col leading-none gap-1.5 group"
      >
        <span className="text-[13px] tracking-[0.22em] font-semibold text-fg">
          MING / AXEL
        </span>
        <span className="text-[9px] tracking-[0.3em] text-muted">{t(lang, 'header.role')}</span>
      </Link>

      <div className="pointer-events-auto flex items-center gap-2 text-[13px]">
        <Link
          href={switched}
          className="interactive-control header-control text-fg/80 tracking-[0.14em]"
          aria-label={other === 'en' ? 'Switch to English' : '切换到中文'}
          hrefLang={other}
        >
          {switchLabel}
        </Link>
        <ThemeToggle lang={lang} />
      </div>
    </header>
  );
}
