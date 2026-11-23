'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function ThoughtScroll({
  label, hint, children,
}: { label: string; hint: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const updateOverflow = () => setOverflow(track.scrollWidth - track.clientWidth > 1);
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(track);
    if (track.firstElementChild) observer.observe(track.firstElementChild);
    updateOverflow();

    const onWheel = (event: WheelEvent) => {
      if (event.shiftKey || event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const max = track.scrollWidth - track.clientWidth;
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
      const next = Math.min(max, Math.max(0, track.scrollLeft + event.deltaY * multiplier));
      if (max <= 1 || Math.abs(next - track.scrollLeft) < 1) return;
      event.preventDefault();
      track.scrollLeft = next;
    };
    track.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      observer.disconnect();
      track.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div className="thought-timeline">
      <p className="thought-hint" aria-hidden hidden={!overflow}>{hint} <span>→</span></p>
      <div ref={ref} className="thought-scroll" role="region" aria-label={label} tabIndex={overflow ? 0 : undefined}>
        {children}
      </div>
    </div>
  );
}
