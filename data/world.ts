/**
 * 我的世界 · 个人兴趣
 * 唯一对齐：Axel/sections/兴趣/
 * 音乐 · 电影 · 旅行。旅行 ≠ TourGuide（入境游职业方向）。
 */
import type { Lang } from '@/lib/i18n';

export type WorldItem = {
  id: 'music' | 'film' | 'travel';
  slug: string;
  source: string;
  title: { zh: string; en: string };
  blurb: { zh: string; en: string };
};

export const worldItems: WorldItem[] = [
  {
    id: 'music',
    slug: '兴趣/音乐',
    source: 'sections/兴趣/音乐.md',
    title: { zh: '音乐', en: 'Music' },
    blurb: { zh: '在听 · 现场', en: 'Listening · live' },
  },
  {
    id: 'film',
    slug: '兴趣/电影',
    source: 'sections/兴趣/电影.md',
    title: { zh: '电影', en: 'Film' },
    blurb: { zh: '看过 · 想看', en: 'Seen · to watch' },
  },
  {
    id: 'travel',
    slug: '兴趣/旅行',
    source: 'sections/兴趣/旅行.md',
    title: { zh: '旅行', en: 'Travel' },
    blurb: { zh: '自己走、自己看', en: 'Going, looking' },
  },
];

export function worldLabel(item: WorldItem, lang: Lang): string {
  return item.title[lang];
}
