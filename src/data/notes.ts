/**
 * 笔记分类 — 对齐 Axel 真实目录，不另起名字。
 * - 事业下学习：web3学习 / ai-dev·学习 / 跨境电商·学习
 * - 学习思考：英语 · 阅读 · 播客 · 电影 · 学习方法
 * 计划（每日计划）偏私人，默认不进公开笔记列表。
 */

export type NoteCategory = {
  id: string;
  source: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  topics: { zh: string[]; en: string[] };
};

export const noteCategories: NoteCategory[] = [
  {
    id: 'web3-learning',
    source: 'sections/事业/web3/web3学习/',
    title: { zh: 'web3 学习', en: 'Web3 learning' },
    description: {
      zh: '来自 Axel web3学习.md 的链接树。',
      en: 'From Axel web3学习.md link tree.',
    },
    topics: {
      zh: ['Web3 总览', 'Web3 Concepts', 'Bitcoin concept', 'ETH concept'],
      en: ['Web3 总览', 'Web3 Concepts', 'Bitcoin concept', 'ETH concept'],
    },
  },
  {
    id: 'ai-dev-learning',
    source: 'sections/事业/ai-dev/学习/',
    title: { zh: 'ai-dev 学习', en: 'ai-dev learning' },
    description: {
      zh: '来自 Axel ai-dev/学习。',
      en: 'From Axel ai-dev/学习.',
    },
    topics: {
      zh: ['ai学习', 'AI 基础概念和各角色认识', '开发基础概念'],
      en: ['ai学习', 'AI 基础概念和各角色认识', '开发基础概念'],
    },
  },
  {
    id: 'ecommerce-learning',
    source: 'sections/事业/跨境电商/学习/',
    title: { zh: '跨境电商学习', en: 'Cross-border learning' },
    description: {
      zh: '来自 Axel 跨境电商/学习。',
      en: 'From Axel 跨境电商/学习.',
    },
    topics: {
      zh: ['跨境电商'],
      en: ['跨境电商'],
    },
  },
  {
    id: 'learning-thinking',
    source: 'sections/学习思考/',
    title: { zh: '学习思考', en: 'Learning & thinking' },
    description: {
      zh: '来自 Axel 学习.md 链接：英语、阅读、播客、电影、学习方法。',
      en: 'From Axel 学习.md: English, reading, podcasts, films, methods.',
    },
    topics: {
      zh: ['英语', '阅读', '播客', '电影', '学习方法'],
      en: ['英语', '阅读', '播客', '电影', '学习方法'],
    },
  },
];
