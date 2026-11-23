'use client';

import { useEffect, useRef, useState } from 'react';
import { t, type Lang } from '@/lib/i18n';

const chapters = ['build', 'learn', 'world'] as const;

export default function ChapterDock({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    const links = Array.from(rail.querySelectorAll('a'));
    const sections = chapters.map((id) => document.getElementById(id));
    const mobile = window.matchMedia('(max-width: 767px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const render = () => {
      frame = 0;
      const line = window.innerHeight * 0.34;
      const tops = sections.map((section) => section?.getBoundingClientRect().top ?? Infinity);
      const railBox = rail.getBoundingClientRect();
      const stops = links.map((link) => {
        const box = link.getBoundingClientRect();
        return mobile.matches
          ? box.left + box.width / 2 - railBox.left
          : box.top + box.height / 2 - railBox.top;
      });
      let reached = -1;
      tops.forEach((top, index) => {
        if (top <= line) reached = index;
      });
      const index = Math.max(0, reached);
      const next = tops[index + 1];
      const fraction = reached >= 0 && next !== undefined && !reduced.matches
        ? (line - tops[index]) / Math.max(1, next - tops[index])
        : 0;
      const end = stops.at(-1) ?? 0;
      const position = stops[index] + ((stops[index + 1] ?? stops[index]) - stops[index]) * fraction;

      rail.style.setProperty('--rail-start', `${stops[0]}px`);
      rail.style.setProperty('--rail-length', `${end - stops[0]}px`);
      rail.style.setProperty('--rail-progress', `${position - stops[0]}px`);
      rail.dataset.ready = 'true';
      setActive(index);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(rail);
    for (const section of sections) if (section) observer.observe(section);
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <nav ref={ref} aria-label={lang === 'zh' ? '章节' : 'Chapters'} className="home-rail">
      <span className="home-rail-track" aria-hidden><span className="home-rail-fill" /><span className="home-rail-pointer" /></span>
      {chapters.map((id, index) => (
        <a key={id} href={`#${id}`} aria-current={active === index ? 'location' : undefined}>
          <span className="home-rail-number">0{index + 1}</span>
          <span className="home-rail-label">{t(lang, `nav.${id}`)}</span>
        </a>
      ))}
    </nav>
  );
}
