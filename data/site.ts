/**
 * 站点公开信息 — 对齐：
 * - Axel/Ming.md（身份 / 教育）
 * - materials/links.md（社交，主人 2026-08-18 提供）
 * 不展示电话。社交矩阵：GitHub / Instagram / TikTok / 小红书×2 / 公众号（无 X、无抖音）。
 */

export type SocialItem = {
  id: string;
  label: { zh: string; en: string };
  href: string | null;
  qr?: string;
  note: { zh: string; en: string };
};

export const site = {
  name: { zh: '丁铭', en: 'Ming' },
  alias: 'Axel',
  oneLiner: {
    zh: '21 岁，广州。正在成为一个超级个体。',
    en: '21, Guangzhou. Becoming a super-individual.',
  },
  tagline: { zh: '探索 · 未知 · 灵活', en: 'Explore · Unknown · Agile' },
  email: 'mingd1n.tech@proton.me',
  wechat: 'DMdmding',
  location: { zh: '广州 / 深圳', en: 'Guangzhou / Shenzhen' },
  education: {
    zh: '华南师范大学 · 信息管理与信息系统 · 大三（预计 2027 毕业）',
    en: 'South China Normal University · Information Management & IS · Junior (2027)',
  },
  social: [
    {
      id: 'github',
      label: { zh: 'GitHub', en: 'GitHub' },
      href: 'https://github.com/mingd1n',
      note: { zh: 'mingd1n', en: 'mingd1n' },
    },
    {
      id: 'instagram',
      label: { zh: 'Instagram', en: 'Instagram' },
      href: 'https://www.instagram.com/minslens_',
      note: { zh: 'minslens_（摄影）', en: 'minslens_ (photography)' },
    },
    {
      id: 'tiktok',
      label: { zh: 'TikTok', en: 'TikTok' },
      href: 'https://www.tiktok.com/@minslens',
      note: { zh: '@minslens（摄影）', en: '@minslens (photography)' },
    },
    {
      id: 'xiaohongshu-photo',
      label: { zh: '小红书 · 摄影', en: 'Xiaohongshu · Photo' },
      href: 'https://xhslink.cn/m/38t3ZtNKKLh',
      note: { zh: '@哇哈哈哈哈', en: '@哇哈哈哈哈' },
    },
    {
      id: 'xiaohongshu-tech',
      label: { zh: '小红书 · 科技', en: 'Xiaohongshu · Tech' },
      href: 'https://xhslink.cn/m/2pCoILjWruf',
      note: { zh: '@火星派ai', en: '@火星派ai' },
    },
    {
      id: 'wechat-oa',
      label: { zh: '公众号', en: 'WeChat Official Account' },
      href: null,
      qr: '/media/QRcode/IMG_5061.JPG',
      note: { zh: '扫码关注', en: 'Scan to follow' },
    },
  ] as SocialItem[],
} as const;
