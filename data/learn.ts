/**
 * 我在想 · 三个话题
 * 对齐 Axel/sections/学习思考/；
 * 话题归属写死在这里（不做 frontmatter 标签聚合）。
 * 播客 · 文章 · 思维（思维 = 学习方法 / 思路总结）。
 * 每个话题可挂多篇笔记（slugs），新增时往对应数组加即可。
 */
import type { Lang } from '@/lib/i18n';

export type ThinkingTopicId = 'podcasts' | 'articles' | 'thinking';

export type ThinkingTopic = {
  id: ThinkingTopicId;
  slugs: string[];
  title: { zh: string; en: string };
};

export const thinkingTopics: ThinkingTopic[] = [
  {
    id: 'podcasts',
    slugs: ['学习思考/播客'],
    title: { zh: '播客', en: 'Podcasts' },
  },
  {
    id: 'articles',
    slugs: ['学习思考/文章'],
    title: { zh: '文章', en: 'Articles' },
  },
  {
    id: 'thinking',
    slugs: ['学习思考/学习方法'],
    title: { zh: '思维', en: 'Thinking' },
  },
];

export function thinkingTopic(id: string): ThinkingTopic | undefined {
  return thinkingTopics.find((t) => t.id === id);
}
