'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';

const CHAPTERS = [
  { id: 'build', num: '01', zh: '我在做', en: "I'm Building" },
  { id: 'learn', num: '02', zh: '我在想', en: "I'm Thinking" },
  { id: 'plan', num: '03', zh: '我的计划', en: 'My Plan' },
  { id: 'world', num: '04', zh: '我的世界', en: 'My World' },
] as const;

function currentChapter() {
  const line = window.innerHeight * 0.35;
  let current = 'build';
  for (const c of CHAPTERS) {
    const el = document.getElementById(c.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) current = c.id;
  }
  return current;
}

export default function ChapterDock({ lang }: { lang: Lang }) {
  const [active, setActive] = useState('build');

  useEffect(() => {
    const sync = () => setActive(currentChapter());
    sync();

    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (n): n is HTMLElement => !!n,
    );
    const io = new IntersectionObserver(() => sync(), {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    nodes.forEach((n) => io.observe(n));

    window.addEventListener('scroll', sync, { passive: true });
    document.addEventListener('scroll', sync, { passive: true, capture: true });
    window.addEventListener('resize', sync);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', sync);
      document.removeEventListener('scroll', sync, true);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="章节" className="home-rail">
      <span className="home-rail-line" aria-hidden />
      {CHAPTERS.map((c) => {
        const on = active === c.id;
        return (
          <button
            key={c.id}
            type="button"
            className={on ? 'on' : undefined}
            aria-current={on ? 'true' : undefined}
            onClick={() => go(c.id)}
          >
            <span className="n">{c.num}</span>
            <span className="tick" aria-hidden />
            <span className="l">{lang === 'zh' ? c.zh : c.en}</span>
            <span className="dot" aria-hidden />
          </button>
        );
      })}
    </nav>
  );
}
