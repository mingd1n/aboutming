/**
 * 我在做五方向 — 唯一对齐源：Axel/sections/我在做：/我在做.md
 * 顺序与 vault 一致：web3 · ai-dev · 自媒体 · 跨境 · TourGuide
 * 这里只放 UI 元数据（标题/摘要，手写双语，标注 source）。
 * 正文内容由 scripts/sync-content.mjs 从 vault 导出到 data/generated.json。
 */
import type { Lang } from '@/lib/i18n';

export type DirectionId = 'web3' | 'ai-dev' | 'media' | 'ecommerce' | 'tourguide';

export type Direction = {
  id: DirectionId;
  /** URL 段 */
  href: string;
  /** vault 目录（相对 Axel/） */
  source: string;
  title: { zh: string; en: string };
  short: { zh: string; en: string };
  mark: string;
};

export const directions: Direction[] = [
  {
    id: 'web3',
    href: 'web3',
    source: 'sections/我在做：/web3',
    title: { zh: 'Web3', en: 'Web3' },
    short: { zh: '爱好者 · 社区建设', en: 'Enthusiast · Community builder' },
    mark: 'W3',
  },
  {
    id: 'ai-dev',
    href: 'ai-dev',
    source: 'sections/我在做：/ai-dev',
    title: { zh: 'AI 应用开发', en: 'AI Development' },
    short: { zh: 'RAG · Agent · 落地', en: 'RAG · Agents · shipping' },
    mark: 'AI',
  },
  {
    id: 'media',
    href: 'media',
    source: 'sections/我在做：/自媒体',
    title: { zh: '自媒体', en: 'Media' },
    short: { zh: '摄影 · 科技 · AI 视频', en: 'Photo · Tech · AI video' },
    mark: 'MD',
  },
  {
    id: 'ecommerce',
    href: 'ecommerce',
    source: 'sections/我在做：/跨境',
    title: { zh: '跨境', en: 'Commerce' },
    short: { zh: '外贸 · 选品 · 出海', en: 'Trade · sourcing · export' },
    mark: 'CB',
  },
  {
    id: 'tourguide',
    href: 'tourguide',
    source: 'sections/我在做：/TourGuide',
    title: { zh: 'TourGuide', en: 'TourGuide' },
    short: { zh: '入境游 · 体验师', en: 'Inbound · Tour host' },
    mark: 'TG',
  },
];

export function getDirection(href: string): Direction | undefined {
  return directions.find((d) => d.href === href);
}

/** 方向入口笔记的 slug（= 入口笔记路径，如 我在做：/ai-dev/ai-dev） */
export function entrySlug(d: Direction): string {
  const base = d.source.replace(/^sections\//, '');
  return `${base}/${base.split('/').pop()}`;
}

export function dirLabel(d: Direction, lang: Lang): string {
  return d.title[lang];
}
