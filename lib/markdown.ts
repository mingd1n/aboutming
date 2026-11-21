import { marked, type Token } from 'marked';
import type { Lang } from './i18n';

marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * 渲染 vault 笔记 markdown → HTML。
 * 多 H1（h1Count > 1）默认按「可折叠块」处理：每个 H1 一块 <details>。
 * collapsible=false 时不折叠，直接按顺序全部展开（方向入口页用）。
 */
export function renderNoteHTML(content: string, h1Count: number, lang: Lang, collapsible = true): string {
  let html: string;

  if (collapsible && h1Count > 1) {
    html = renderCollapsible(content);
  } else {
    html = marked.parse(content) as string;
  }

  // 站内链接补语言前缀（内容里已是 /notes/...）
  html = html.replace(/(href=")\/notes\//g, `$1/${lang}/notes/`);

  return html;
}

function markdownSections(tokens: Token[]) {
  const blocks: { heading: string | null; tokens: Token[] }[] = [];
  let current: (typeof blocks)[number] = { heading: null, tokens: [] };
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      if (current.heading !== null || current.tokens.length) blocks.push(current);
      current = { heading: token.text, tokens: [] };
    } else {
      current.tokens.push(token);
    }
  }
  blocks.push(current);
  return blocks;
}

/** 把多个 H1 拆成可折叠块，第一个标题默认展开 */
function renderCollapsible(content: string): string {
  const tokens = marked.lexer(content);
  const blocks = markdownSections(tokens);
  const firstHeading = blocks.findIndex((block) => block.heading !== null);
  if (firstHeading < 0 || firstHeading === blocks.length - 1) return marked.parser(tokens);
  return blocks
    .map((b, i) => {
      const bodyHtml = marked.parser(b.tokens);
      if (b.heading === null) return bodyHtml;
      const open = i === firstHeading ? ' open' : '';
      return `<details class="ming-details"${open}><summary>${escapeHtml(
        b.heading,
      )}</summary><div class="ming-details-body">${bodyHtml}</div></details>`;
    })
    .join('');
}

export type SectionBlock = { heading: string | null; body: string };

/** 按 Markdown 的一级标题拆段，并保留方向页需要的原始正文 */
export function splitSections(content: string): SectionBlock[] {
  return markdownSections(marked.lexer(content))
    .map(({ heading, tokens }) => ({ heading, body: tokens.map((token) => token.raw).join('') }))
    .filter(({ heading, body }) => heading !== null || body.trim());
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 摘取正文首段作摘要（去 markdown 符号） */
export function excerpt(content: string, max = 120): string {
  const text = content
    .replace(/^#.*$/gm, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#|-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max) + '…' : text;
}
