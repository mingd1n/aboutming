'use client';

import { useEffect, useState } from 'react';
import { t, type Lang } from '@/lib/i18n';

const preferenceKey = 'theme';

function storedTheme() {
  try {
    const value = localStorage.getItem(preferenceKey);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

export default function ThemeToggle({ lang }: { lang: Lang }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const theme = storedTheme();
      const active = theme === null ? system.matches : theme === 'dark';
      setDark(active);
      document.documentElement.classList.toggle('dark', active);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === preferenceKey || event.key === null) sync();
    };

    sync();
    system.addEventListener('change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      system.removeEventListener('change', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(preferenceKey, next ? 'dark' : 'light');
    } catch {
      // Storage may be disabled; the current page can still switch themes.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(lang, 'theme.toggle')}
      aria-pressed={dark}
      title={t(lang, 'theme.toggle')}
      className="interactive-control header-control text-fg/80"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.55 1.55M17.4 17.4l1.55 1.55M18.95 5.05l-1.55 1.55M6.6 17.4l-1.55 1.55"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 3.5A8.7 8.7 0 1 0 20.5 14.2 7 7 0 0 1 16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
