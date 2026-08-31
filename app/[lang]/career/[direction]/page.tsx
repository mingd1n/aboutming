import { notFound } from 'next/navigation';
import Link from 'next/link';
import { langFromParam, t, type Lang } from '@/lib/i18n';
import { getDirection, directions, entrySlug } from '@/data/directions';
import { notesForDirection, noteBySlug, notes, type Note } from '@/lib/content';
import { renderNoteHTML, splitSections, type SectionBlock } from '@/lib/markdown';
import SocialCards from '@/components/SocialCards';

export function generateStaticParams() {
  return directions.map((d) => ({ direction: d.href }));
}

/** 小节标题：中文页原样（Obsidian 标题）；英文页对常用小节给英文标签 */
const SECTION_LABEL_EN: Record<string, string> = {
  学习: 'Learning',
  产出: 'Output',
  作品: 'Works',
  项目: 'Projects',
  简历: 'Resume',
};

function sectionLabel(heading: string, lang: Lang): string {
  if (lang === 'zh') return heading;
  return SECTION_LABEL_EN[heading.replace(/[:：\s]+$/, '')] ?? heading;
}

type SectionItem = { slug?: string; label?: string };

/** 提取小节里的站内链接（/notes/...）与「未创建」占位 */
function sectionItems(body: string): SectionItem[] {
  const items: SectionItem[] = [];
  const linkRe = /\[([^\]]*)\]\(\/notes\/([^")]+)\)/g;
  for (const m of body.matchAll(linkRe)) {
    let slug = m[2];
    try {
      slug = decodeURIComponent(m[2]);
    } catch {
      /* keep raw */
    }
    items.push({ slug, label: m[1] });
  }
  const todoRe = /<span class="todo-link"[^>]*>([^<]*)<\/span>/g;
  for (const m of body.matchAll(todoRe)) {
    items.push({ label: m[1] });
  }
  return items;
}

/** 小节是否「纯链接列表」（去掉链接/占位与列表标记后没有正文） */
function isLinkList(body: string): boolean {
  const stripped = body
    .replace(/\[[^\]]*\]\(\/notes\/[^")]+\)/g, '')
    .replace(/<span class="todo-link"[^>]*>[^<]*<\/span>/g, '')
    .replace(/^[\s\d.\-*#|_`>]+$/gm, '')
    .replace(/[—\s]+/g, '');
  return stripped.length === 0;
}

/** 小节是否真的有内容：标题/破折号/链接符号去掉后，链接标签、图片 alt 等算内容 */
function hasRealContent(body: string): boolean {
  const text = body
    .replace(/^#{1,3}\s+.*$/gm, '')
    .replace(/^---+$/gm, '')
    .replace(/[*_`>|]/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<span class="todo-link"[^>]*>([^<]*)<\/span>/g, '$1')
    .replace(/[-—\s\d.]/g, '');
  return text.trim().length > 0;
}

/** 笔记是否有真实内容（只有标题/破折号的空占位不算） */
function noteHasContent(n: Note): boolean {
  return n.content.replace(/^#.*$/gm, '').replace(/[-_*`#>|—\s]+/g, '').trim().length > 0;
}

function NoteLinkCard({ note, lang }: { note: Note; lang: Lang }) {
  return (
    <Link
      href={`/${lang}/notes/${note.slug.split('/').map(encodeURIComponent).join('/')}`}
      className="note-link-card snap-start"
    >
      <span className="note-link-card-title">{note.title}</span>
      <span className="note-link-card-go">{t(lang, 'common.read')} →</span>
    </Link>
  );
}

function TodoCard({ label, lang }: { label: string; lang: Lang }) {
  return (
    <div className="note-link-card note-link-card--todo snap-start">
      <span className="note-link-card-title">{label}</span>
      <span className="note-link-card-go">{t(lang, 'common.building')}</span>
    </div>
  );
}

export default async function DirectionPage({
  params,
}: {
  params: Promise<{ lang: string; direction: string }>;
}) {
  const { lang: raw, direction: href } = await params;
  const lang: Lang = langFromParam(raw);
  const dir = getDirection(href);
  if (!dir) notFound();
  const dirIndex = directions.findIndex((d) => d.id === dir.id) + 1;

  const entry = noteBySlug(entrySlug(dir));

  // 该方向在入口笔记正文之外的相关笔记（去 hub、去空占位、去正文已链接）
  const bodySlugs = new Set<string>();
  if (entry) {
    for (const m of entry.content.matchAll(/\/notes\/([^")]+)/g)) {
      try {
        bodySlugs.add(decodeURIComponent(m[1]));
      } catch {
        bodySlugs.add(m[1]);
      }
    }
  }
  const seen = new Set<string>();
  const pool: Note[] = [
    ...notesForDirection(dir.id, 'resume'),
    ...notesForDirection(dir.id, 'learning'),
    ...notesForDirection(dir.id, 'output'),
    ...notes.filter((n) => n.direction === dir.id && n.tab === null && !n.isHub),
  ];
  const related = pool.filter(
    (n) =>
      n &&
      noteHasContent(n) &&
      entry?.slug !== n.slug &&
      !bodySlugs.has(n.slug) &&
      (seen.has(n.slug) ? false : (seen.add(n.slug), true)),
  );

  const blocks = entry && !entry.isEmpty ? splitSections(entry.content) : [];

  const renderItems = (items: SectionItem[]) => (
    <div>
      {items.length > 1 ? (
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-[0.22em] text-faint">{t(lang, 'hint.scroll')}</span>
          <span className="text-[10px] tracking-[0.22em] text-faint animate-pulse">→</span>
        </div>
      ) : null}
      <div
        className="snap-x-ming grid grid-flow-col grid-rows-2 gap-3 overflow-x-auto pb-3"
        style={{ gridAutoColumns: 'minmax(240px, 270px)' }}
      >
        {items.map((it, j) => {
          if (it.slug) {
            const note = noteBySlug(it.slug);
            return note ? (
              <NoteLinkCard key={note.slug} note={note} lang={lang} />
            ) : (
              <TodoCard key={`${it.slug}-${j}`} label={it.label ?? it.slug} lang={lang} />
            );
          }
          return <TodoCard key={`${it.label}-${j}`} label={it.label ?? ''} lang={lang} />;
        })}
      </div>
    </div>
  );

  const renderBody = (b: SectionBlock) => {
    if (!hasRealContent(b.body)) return null;
    const items = sectionItems(b.body);
    if (items.length && isLinkList(b.body)) return renderItems(items);
    return (
      <div
        className="prose-ming"
        dangerouslySetInnerHTML={{ __html: renderNoteHTML(b.body, 0, lang, false) }}
      />
    );
  };

  /** 自媒体「作品」小节 → 社媒账号卡片（用站内社交数据 + 品牌图标） */
  const renderSectionContent = (b: SectionBlock) => {
    if (
      dir.id === 'media' &&
      b.heading !== null &&
      b.heading.replace(/[:：\s]+$/, '') === '作品'
    ) {
      return (
        <SocialCards
          lang={lang}
          include={['instagram', 'tiktok', 'xiaohongshu-photo', 'xiaohongshu-tech', 'wechat-oa']}
        />
      );
    }
    return renderBody(b);
  };

  let sectionNum = 0;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <header className="mb-14 border-b border-line/60 pb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-[12px] tracking-[0.14em] font-semibold text-accent">
              {dir.mark}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-faint">{t(lang, 'dir.source')}</span>
          </div>
          <span className="text-[11px] tracking-[0.2em] text-faint tabular-nums">
            {String(dirIndex).padStart(2, '0')}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-5">
          {dir.title[lang]}
        </h1>
        <p className="mt-3 text-[13px] text-muted">{dir.short[lang]}</p>
      </header>

      {blocks.length ? (
        <div className="flex flex-col gap-8">
          {blocks.map((b, i) => {
            if (b.heading === null) {
              if (!hasRealContent(b.body)) return null;
              const items = sectionItems(b.body);
              return (
                <div key={i}>
                  {items.length && isLinkList(b.body)
                    ? renderItems(items)
                    : renderBody(b)}
                </div>
              );
            }
            sectionNum += 1;
            return (
              <section key={i} className="dir-section">
                <div className="dir-section-head">
                  <span className="dir-section-num">
                    {String(sectionNum).padStart(2, '0')}
                  </span>
                  <span className="dir-section-label">{sectionLabel(b.heading, lang)}</span>
                  <span className="dir-section-line" aria-hidden />
                </div>
                {renderSectionContent(b) ?? (
                  <p className="text-[12px] tracking-[0.14em] text-faint">
                    {t(lang, 'common.building')}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <p className="text-muted">{t(lang, 'plan.empty')}</p>
      )}

      {related.length ? (
        <section className="mt-16">
          <div className="dir-section-head mb-5">
            <span className="dir-section-label">{t(lang, 'dir.related')}</span>
            <span className="dir-section-line" aria-hidden />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((n) => (
              <NoteLinkCard key={n.slug} note={n} lang={lang} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
