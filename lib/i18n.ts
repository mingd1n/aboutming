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
    'nav.world': '我的世界',
    'chapter.build': 'WHAT I\'M BUILDING',
    'chapter.learn': 'WHAT I\'M THINKING',
    'chapter.world': 'MY WORLD',
    'header.role': 'BUILDER / EXPLORER',
    'home.intro': '一个人的视觉操作系统',
    'home.intro.sub': '简历 · 笔记 · 兴趣，全部在一个滚动里。',
    'dir.tab.resume': '简历',
    'dir.tab.learning': '学习',
    'dir.tab.output': '产出',
    'dir.overview': '五方向平权 · 同等面积',
    'dir.source': '来自我的知识库',
    'dir.related': '相关笔记',
    'career.title': '我在做',
    'career.sub': '五条线并行 · 简历 / 学习 / 产出',
    'learn.title': '我在想',
    'learn.empty': '还没有发布想法。',
    'learn.older': '往右看更早的想法',
    'learn.timeline': '想法时间轴，最新在左',
    'notes.title': '笔记',
    'notes.under': '建设中 · 待补充',
    'notes.back': '返回',
    'notes.source': '来源',
    'notes.breadcrumb': '来自',
    'world.title': '我的世界',
    'world.about': '关于我',
    'world.lens': '摄影作品',
    'world.goals': '我的目标',
    'world.more': '打开我的世界 →',
    'contact.title': '联系',
    'contact.sub': '邮箱 / 微信 / 社交',
    'contact.email': '邮箱',
    'contact.wechat': '微信',
    'contact.location': '地点',
    'contact.social': '社交账号',
    'social.open': '打开',
    'footer.contact': 'CONTACT ME',
    'footer.loc': 'GUANGZHOU, CHINA',
    'theme.toggle': '切换主题',
    'lang.switch': '语言',
    'common.building': '建设中',
    'common.empty': '还没有内容，正在整理中。',
    'common.read': '阅读',
  },
  en: {
    'nav.build': "I'm Building",
    'nav.learn': "I'm Thinking",
    'nav.world': 'My World',
    'chapter.build': 'WHAT I\'M BUILDING',
    'chapter.learn': 'WHAT I\'M THINKING',
    'chapter.world': 'MY WORLD',
    'header.role': 'BUILDER / EXPLORER',
    'home.intro': 'A visual operating system for one person',
    'home.intro.sub': 'Resume · notes · interests, in a single scroll.',
    'dir.tab.resume': 'Resume',
    'dir.tab.learning': 'Learning',
    'dir.tab.output': 'Output',
    'dir.overview': 'Five directions · equal weight',
    'dir.source': 'From my notes',
    'dir.related': 'Related notes',
    'career.title': "What I'm Building",
    'career.sub': 'Five tracks at once · resume / learning / output',
    'learn.title': "What I'm Thinking",
    'learn.empty': 'No thoughts published yet.',
    'learn.older': 'Scroll right for earlier thoughts',
    'learn.timeline': 'Thought timeline, newest on the left',
    'notes.title': 'Note',
    'notes.under': 'Under construction',
    'notes.back': 'Back',
    'notes.source': 'Source',
    'notes.breadcrumb': 'From',
    'world.title': 'My World',
    'world.about': 'About',
    'world.lens': 'Photography',
    'world.goals': 'My Goals',
    'world.more': 'Open My World →',
    'contact.title': 'Contact',
    'contact.sub': 'Email / WeChat / social',
    'contact.email': 'Email',
    'contact.wechat': 'WeChat',
    'contact.location': 'Location',
    'contact.social': 'Social',
    'social.open': 'Open',
    'footer.contact': 'CONTACT ME',
    'footer.loc': 'GUANGZHOU, CHINA',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Language',
    'common.building': 'Building',
    'common.empty': 'No content yet.',
    'common.read': 'Read',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.zh[key] ?? key;
}
