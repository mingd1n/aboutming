/**
 * 站点公开信息 — 对齐：
 * - Axel/Ming.md
 * - Axel/简历-Ming.md
 * - 仓库 README.md（社交账号）
 * 不展示电话。
 */

export const site = {
  name: {
    zh: '丁铭',
    en: 'Ming',
  },
  alias: 'Axel',
  /** Ming.md */
  oneLiner: {
    zh: '我是丁铭（Axel），21 岁，广州。\n正在成为一个超级个体。',
    en: "I'm Ming (Axel), 21, Guangzhou.\nBecoming a super-individual.",
  },
  /** 简历-Ming.md */
  tagline: {
    zh: '探索 · 未知 · 灵活',
    en: 'Explore · Unknown · Agile',
  },
  email: 'mingd1n.tech@proton.me',
  wechat: 'DMdmding',
  location: {
    zh: '广州 / 深圳',
    en: 'Guangzhou / Shenzhen',
  },
  education: {
    zh: '华南师范大学，信息管理与信息系统专业，大三（预计 2027 年毕业）',
    en: 'South China Normal University · Information Management & Information Systems · Junior (expected 2027)',
  },
  courses: {
    zh: [
      '会计学原理',
      '经济学原理',
      '前端开发',
      '软件工程',
      '市场营销',
      '数据科学',
      '网络安全',
      '人工智能',
    ],
    en: [
      'Principles of Accounting',
      'Principles of Economics',
      'Frontend Development',
      'Software Engineering',
      'Marketing',
      'Data Science',
      'Network Security',
      'Artificial Intelligence',
    ],
  },
  /** web3简历.md 备注（公开可用） */
  availability: {
    zh: '可接受远程实习，任何时间开始。也可接受广州/深圳的现场实习，可于 2026 年 7 月开始。',
    en: 'Open to remote internships anytime. On-site in Guangzhou/Shenzhen from July 2026.',
  },
  /** README.md 社交 */
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/minslens_/',
      note: { zh: 'minslens_（摄影）', en: 'minslens_ (photography)' },
    },
    {
      id: 'xiaohongshu',
      label: { zh: '小红书', en: 'Xiaohongshu' },
      href: '#',
      note: {
        zh: '铭影（摄影）/ 火星经济（科技）',
        en: '铭影 (photo) / 火星经济 (tech)',
      },
    },
    {
      id: 'douyin',
      label: { zh: '抖音', en: 'Douyin' },
      href: '#',
      note: { zh: 'Magia / 火星经济', en: 'Magia / 火星经济' },
    },
    {
      id: 'wechat-oa',
      label: { zh: '微信公众号', en: 'WeChat OA' },
      href: '#',
      note: { zh: '火星经济 Elonomy', en: '火星经济 Elonomy' },
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:mingd1n.tech@proton.me',
      note: { zh: 'mingd1n.tech@proton.me', en: 'mingd1n.tech@proton.me' },
    },
  ],
} as const;
