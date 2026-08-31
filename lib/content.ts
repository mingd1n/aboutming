import generated from '@/data/generated.json';

export type NoteCategory = 'plan' | 'learn' | 'interest' | 'doing' | 'note';
export type NoteTab = 'resume' | 'learning' | 'output' | null;

export type Note = {
  slug: string;
  title: string;
  date: string | null;
  source: string;
  category: NoteCategory;
  direction: string | null;
  tab: NoteTab;
  isHub: boolean;
  isEmpty: boolean;
  h1Count: number;
  tags: string[];
  backlinks: string[];
  content: string;
};

export type DirectionSets = Record<
  string,
  { resume: string[]; learning: string[]; output: string[] }
>;

/** 各方向 Tab 内「未创建」占位（悬空链接标签） */
export type DirectionDangling = Record<
  string,
  { resume: string[]; learning: string[]; output: string[] }
>;

const data = generated as {
  generatedAt: string;
  notes: Note[];
  directions: DirectionSets;
  directionDangling?: DirectionDangling;
};

export const notes: Note[] = data.notes;
export const directionSets: DirectionSets = data.directions;
export const directionDangling: DirectionDangling = data.directionDangling ?? {};
export const generatedAt: string = data.generatedAt;

export function noteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

/** 某方向的非 hub 笔记（按 tab） */
export function notesForDirection(dirId: string, tab: NoteTab): Note[] {
  const set = directionSets[dirId];
  if (!set || !tab) return [];
  const slugs = set[tab] || [];
  return slugs
    .map((s) => noteBySlug(s))
    .filter((n): n is Note => !!n && !n.isHub);
}

/** 学习思考分类（英语/文章/播客/学习方法 等） */
export function learnNotes(): Note[] {
  return notes.filter((n) => n.category === 'learn' && !n.isHub);
}

/** 学习思考笔记，按日期降序（最新在左） */
export function learnNotesByDate(): Note[] {
  return learnNotes().sort((a, b) => {
    const da = a.date ?? '';
    const db = b.date ?? '';
    return db.localeCompare(da);
  });
}

/** 某话题（播客/文章/思维）对应笔记，按日期降序（最新在左） */
export function topicNotes(slugs: string[]): Note[] {
  const set = new Set(slugs);
  return learnNotes()
    .filter((n) => set.has(n.slug))
    .sort((a, b) => {
      const da = a.date ?? '';
      const db = b.date ?? '';
      return db.localeCompare(da);
    });
}

/** 兴趣分类（音乐 / 电影 / 旅行；不含 TourGuide） */
export function interestNotes(): Note[] {
  return notes.filter((n) => n.category === 'interest' && !n.isHub);
}

/** 计划分类 */
export function planNotes(): Note[] {
  return notes.filter((n) => n.category === 'plan' && !n.isHub);
}
