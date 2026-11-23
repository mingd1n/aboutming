import generated from '@/data/generated.json';

export type NoteCategory = 'plan' | 'learn' | 'interest' | 'doing' | 'note';
export type NoteTab = 'resume' | 'learning' | 'output' | null;

export type Note = {
  slug: string;
  title: string;
  date: string | null;
  createdAt?: string;
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

const oldThoughtIndexes = new Set(
  ['播客', '文章', '思维', '学习', '学习方法', '英语'].map((title) => `学习思考/${title}`),
);

export function legacyNotePath(note: Note): '/learn' | '/world#goals' | undefined {
  if (oldThoughtIndexes.has(note.slug)) return '/learn';
  if (note.category === 'plan') return '/world#goals';
}

export function thoughtNotes(): Note[] {
  return notes
    .filter((note) => note.category === 'learn' && !note.isHub && !note.isEmpty && !legacyNotePath(note))
    .sort((a, b) => (b.createdAt ?? b.date ?? '').localeCompare(a.createdAt ?? a.date ?? '')
      || a.slug.localeCompare(b.slug));
}

export function notePath(lang: string, slug: string): string {
  return `/${lang}/notes/${slug.split('/').map(encodeURIComponent).join('/')}`;
}
