export type Lang = 'zh' | 'en';

export const LANGS: Lang[] = ['zh', 'en'];

export const defaultLang: Lang = 'zh';

export function isLang(v: string): v is Lang {
  return v === 'zh' || v === 'en';
}

export function langFromParam(param: string | undefined): Lang {
  return param && isLang(param) ? param : defaultLang;
}

export const ui = {
  zh: {
    'nav.build': '我在做',
    'nav.learn': '我在想',
    'nav.plan': '我的计划',
    'nav.world': '我的世界',
    'chapter.build': 'WHAT I\'M BUILDING',
    'chapter.learn': 'WHAT I\'M THINKING',
    'chapter.plan': 'MY PLAN',
    'chapter.world': 'MY WORLD',
    'header.role': 'BUILDER / EXPLORER',
    'dir.tab.resume': '简历',
    'dir.tab.learning': '学习',
    'dir.tab.output': '产出',
    'dir.source': '来自我的知识库',
    'dir.related': '相关笔记',
    'career.title': '我在做',
    'career.sub': '五条线并行 · 简历 / 学习 / 产出',
    'learn.title': '我在想',
    'learn.sub': '播客 · 文章 · 思维，外加全部笔记',
    'learn.all': '全部笔记',
    'hint.scroll': '向右滑动 →',
    'plan.title': '我的计划',
    'plan.sub': '整理中 · 之后在这里更新我的计划',
    'plan.empty': '还没有内容，正在整理中。',
    'notes.under': '建设中 · 待补充',
    'notes.back': '返回',
    'notes.source': '来源',
    'notes.breadcrumb': '来自',
    'notes.original': '笔记原文为中文，英文页暂不另译。',
    'nav.chapters': '章节',
    'meta.desc': '丁铭（Axel）的个人站 —— 一个人的视觉操作系统。',
    'theme.light': '切换到亮色',
    'theme.dark': '切换到暗色',
    'world.title': '我的世界',
    'world.sub': '音乐 · 电影 · 旅行',
    'world.about': '关于我',
    'world.lens': '镜头 · GUANGZHOU',
    'world.vs.tourguide': '旅行是个人出行。TourGuide 是「我在做」里的入境游方向，二者分开。',
    'world.more': '打开我的世界 →',
    'contact.title': '联系',
    'contact.sub': '邮箱 / 微信 / 社交',
    'contact.email': '邮箱',
    'contact.wechat': '微信',
    'contact.location': '地点',
    'contact.social': '社交账号',
    'footer.contact': 'CONTACT ME',
    'footer.loc': 'GUANGZHOU, CHINA',
    'theme.toggle': '切换主题',
    'lang.switch': '语言',
    'common.building': '建设中',
    'common.read': '阅读',
  },
  en: {
    'nav.build': "I'm Building",
    'nav.learn': "I'm Thinking",
    'nav.plan': 'My Plan',
    'nav.world': 'My World',
    'chapter.build': 'WHAT I\'M BUILDING',
    'chapter.learn': 'WHAT I\'M THINKING',
    'chapter.plan': 'MY PLAN',
    'chapter.world': 'MY WORLD',
    'header.role': 'BUILDER / EXPLORER',
    'dir.tab.resume': 'Resume',
    'dir.tab.learning': 'Learning',
    'dir.tab.output': 'Output',
    'dir.source': 'From my notes',
    'dir.related': 'Related notes',
    'career.title': "What I'm Building",
    'career.sub': 'Five tracks at once · resume / learning / output',
    'learn.title': "What I'm Thinking",
    'learn.sub': 'Podcasts · Articles · Thinking, plus every note',
    'learn.all': 'All notes',
    'hint.scroll': 'Scroll right →',
    'plan.title': 'My Plan',
    'plan.sub': 'In progress — my plan will be updated here',
    'plan.empty': 'Nothing here yet — still organizing.',
    'notes.under': 'Under construction',
    'notes.back': 'Back',
    'notes.source': 'Source',
    'notes.breadcrumb': 'From',
    'notes.original': 'Notes are written in Chinese; this page shows the original.',
    'nav.chapters': 'Chapters',
    'meta.desc': 'Ming (Axel) — a personal visual operating system.',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',
    'world.title': 'My World',
    'world.sub': 'Music · film · travel',
    'world.about': 'About',
    'world.lens': 'Lens · GUANGZHOU',
    'world.vs.tourguide':
      'Travel here is personal. TourGuide is the inbound-hosting career track under What I\'m Building — they are not the same.',
    'world.more': 'Open My World →',
    'contact.title': 'Contact',
    'contact.sub': 'Email / WeChat / social',
    'contact.email': 'Email',
    'contact.wechat': 'WeChat',
    'contact.location': 'Location',
    'contact.social': 'Social',
    'footer.contact': 'CONTACT ME',
    'footer.loc': 'GUANGZHOU, CHINA',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Language',
    'common.building': 'Building',
    'common.read': 'Read',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.zh[key] ?? key;
}

/** 笔记数量：0 用建设中；中文「n 篇」，英文 1 note / n notes */
export function noteCount(lang: Lang, n: number): string {
  if (n <= 0) return t(lang, 'common.building');
  if (lang === 'zh') return `${n} 篇`;
  return n === 1 ? '1 note' : `${n} notes`;
}
