import { marked } from 'marked';
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

/** 把多个 H1 拆成可折叠块，第一块默认展开 */
function renderCollapsible(content: string): string {
  const lines = content.split('\n');
  const blocks: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    if (/^#\s+/.test(line)) {
      if (current) blocks.push(current);
      current = { heading: line.replace(/^#\s+/, '').trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    } else {
      current = { heading: '', body: [line] };
    }
  }
  if (current) blocks.push(current);

  return blocks
    .map((b, i) => {
      const bodyHtml = marked.parse(b.body.join('\n')) as string;
      if (!b.heading) return bodyHtml;
      const open = i === 0 ? ' open' : '';
      return `<details class="ming-details"${open}><summary>${escapeHtml(
        b.heading,
      )}</summary><div class="ming-details-body">${bodyHtml}</div></details>`;
    })
    .join('');
}

export type SectionBlock = { heading: string | null; body: string };

/** 按 H1（# ）拆段：首个标题前的正文 → { heading: null }；之后每段一个 { heading, body } */
export function splitSections(content: string): SectionBlock[] {
  const lines = content.split('\n');
  const blocks: SectionBlock[] = [];
  let current: SectionBlock = { heading: null, body: '' };
  const push = () => {
    if (current.heading !== null || current.body.trim()) blocks.push(current);
  };
  for (const line of lines) {
    const m = line.match(/^#\s+(.*)$/);
    if (m) {
      push();
      current = { heading: m[1].trim(), body: '' };
    } else {
      current.body += (current.body ? '\n' : '') + line;
    }
  }
  push();
  return blocks;
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
