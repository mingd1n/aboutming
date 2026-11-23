'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Wallpaper() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wallpaper = ref.current;
    if (!wallpaper) return;
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('.chapter-art'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const render = () => {
      frame = 0;
      if (reduced.matches) return;
      const scroll = window.scrollY;
      const height = window.innerHeight;
      const offsets = chapters.map((chapter) => {
        const box = chapter.getBoundingClientRect();
        return Math.max(-110, Math.min(110, (height / 2 - (box.top + box.height * 0.44)) * 0.28));
      });
      wallpaper.style.setProperty('--wallpaper-x', `${Math.sin(scroll / 530) * 11}%`);
      wallpaper.style.setProperty('--wallpaper-y', `${Math.sin(scroll / 660) * 12}%`);
      wallpaper.style.setProperty('--wallpaper-grid-y', `${Math.sin(scroll / 490) * -85}px`);
      chapters.forEach((chapter, index) => chapter.style.setProperty('--art-y', `${offsets[index]}px`));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, [pathname]);

  return (
    <div ref={ref} className="site-wallpaper" aria-hidden>
      <div className="wallpaper-wash" />
      <div className="wallpaper-grid" />
    </div>
  );
}
