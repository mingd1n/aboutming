/**
 * 内容同步脚本：只读 Axel/ vault → data/generated.json。
 * 绝不写入 Axel/。构建 / dev 前由 npm run sync 自动执行。
 *
 * 部署：Axel/ 不进 GitHub；data/generated.json 作为可提交快照供 Vercel。
 * 若 CI 无 Axel/ 且已有 generated.json，则跳过同步并沿用快照。
 *
 * 处理规则（对齐 AGENTS.md「内容来源与同步」）：
 * - [[wikilink]] / [text](path.md) → 站内 /notes/<slug>
 * - `← 反链` 剔除正文，作面包屑来源
 * - 空占位笔记 → isEmpty（站点展示「建设中」）；纯链接 hub → isHub（列表/Tab 过滤）
 * - 多 H1 → h1Count（渲染为可折叠块）
 * - 标签行 H1（#tag1 #tag2 …）→ 识别为 tags，标题回退文件名
 */
import {
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const AXEL = join(ROOT, 'Axel');
const OUT = join(ROOT, 'data', 'generated.json');

const SKIP = new Set(['.obsidian', '.trash', '.git', 'assets', 'node_modules']);

// 方向文件夹名 → 方向 id
const DIR_MAP = {
  web3: 'web3',
  'ai-dev': 'ai-dev',
  自媒体: 'media',
  跨境: 'ecommerce',
  TourGuide: 'tourguide',
};

function walk(dir, base = '') {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, rel));
    } else if (name.endsWith('.md')) {
      out.push(rel);
    }
  }
  return out;
}

function normalizeRel(p) {
  return p.split(sep).join('/');
}

function stripExt(p) {
  return p.replace(/\.md$/i, '');
}

/** slug = 相对 Axel 根路径，去 .md，去 sections/ 前缀 */
function toSlug(relPath) {
  let s = stripExt(normalizeRel(relPath));
  s = s.replace(/^sections\//, '');
  return s;
}

/** source = 相对 Axel 根路径，去 .md，去 sections/ 前缀（公网展示用） */
function toSource(relPath) {
  return normalizeRel(relPath).replace(/^sections\//, '');
}

const H1_RE = /^#\s+/;
const BACKLINK_RE = /^\s*←\s*\[\[(.*?)\]\]\s*$/;
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;
const MDLINK_RE = /\[([^\]]*)\]\(([^)\s]+(?:\.md)?)\)/g;
const TAGLINE_H1_RE = /^#\s+(?:#?[^\s#]+\s*#)+/;

function isTaglineH1(line) {
  return TAGLINE_H1_RE.test(line);
}

function parseTags(h1Text) {
  const tags = [];
  const m = h1Text.match(/#[^\s#]+/g);
  if (m) for (const t of m) tags.push(t.replace(/^#/, ''));
  return tags;
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Obsidian 把带空格的文件名写成 %20 链接，解析前先解码 */
function decodeTarget(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}

function resolveLink(target, currentRel, pathIndex, baseIndex) {
  const clean = stripExt(decodeTarget(target)).replace(/#.*$/, '').trim();
  if (!clean) return null;

  // 1) 相对当前文件目录
  const curDir = currentRel.split('/').slice(0, -1).join('/');
  const relCandidate = normalizeRel(join(AXEL, curDir, clean)).replace(AXEL + sep, '');
  const relNorm = normalizeRel(relCandidate);
  if (pathIndex.has(relNorm)) return pathIndex.get(relNorm);

  // 2) 相对 vault 根
  const rootCandidate = clean;
  if (pathIndex.has(rootCandidate)) return pathIndex.get(rootCandidate);

  // 3) 按 basename 唯一匹配
  const base = clean.split('/').pop();
  const hits = baseIndex.get(base) || [];
  if (hits.length === 1) return hits[0];

  return null;
}

const SECTION_TABS = [
  [/^学习/, 'learning'],
  [/^产出/, 'output'],
  [/^作品/, 'output'],
  [/^项目/, 'output'],
  [/^简历/, 'resume'],
];

const TABS = ['resume', 'learning', 'output'];

/**
 * 方向入口笔记：按 H1 小节拆链接 → 对应 Tab。
 * 悬空链接 → 该 Tab 的「未创建」占位（label）。
 * 无任何 H1 小节（纯 hub，如 TourGuide）→ 返回 null，交给文件夹推导。
 */
function scanEntrySections(lines, rel, pathIndex, baseIndex) {
  const notes = { resume: [], learning: [], output: [] };
  const dangling = { resume: [], learning: [], output: [] };
  let current = 'learning'; // 首个标题之前的链接默认算「学习」
  let hasHeading = false;

  const push = (tab, slug, label) => {
    if (slug) {
      if (!notes[tab].includes(slug)) notes[tab].push(slug);
    } else if (label && !dangling[tab].includes(label)) {
      dangling[tab].push(label);
    }
  };
  // 按行内出现顺序统一扫描 wikilink 与 md 链接
  const LINK_RE = /\[\[([^\]]+)\]\]|\[([^\]]*)\]\(([^)\s]+(?:\.md)?)\)/g;
  const scanLine = (line) => {
    for (const m of line.matchAll(LINK_RE)) {
      const wlTarget = m[1];
      if (wlTarget) {
        const parts = wlTarget.split('|');
        const label = (parts[1] || parts[0]).trim();
        push(current, resolveLink(parts[0].trim(), rel, pathIndex, baseIndex), label);
        continue;
      }
      const label = m[2].trim();
      const href = m[3];
      if (/^(https?:|mailto:|#|\/)/.test(href)) continue;
      push(current, resolveLink(href, rel, pathIndex, baseIndex), label || href);
    }
  };

  for (const line of lines) {
    const hm = line.match(/^#{1,2}\s+(.+)$/);
    if (hm) {
      hasHeading = true;
      const text = hm[1].trim();
      let tab = 'learning';
      for (const [re, t] of SECTION_TABS) {
        if (re.test(text)) {
          tab = t;
          break;
        }
      }
      current = tab;
      continue;
    }
    if (BACKLINK_RE.test(line)) continue;
    scanLine(line);
  }

  return hasHeading ? { notes, dangling } : null;
}

function main() {
  const files = walk(AXEL).filter((f) => !f.startsWith('.') && f.endsWith('.md'));

  // 建立索引
  const pathIndex = new Map(); // relPath(去.md, 正斜杠) -> slug
  const baseIndex = new Map(); // basename -> [slug]
  for (const f of files) {
    const rel = normalizeRel(stripExt(f));
    const slug = toSlug(f);
    pathIndex.set(rel, slug);
    const base = rel.split('/').pop();
    if (!baseIndex.has(base)) baseIndex.set(base, []);
    baseIndex.get(base).push(slug);
  }

  const notes = [];
  const directionSets = {}; // id -> { resume:[], learning:[], output:[] }
  const entryScans = {}; // direction id -> { notes, dangling }（入口笔记小节推导）
  const directionDangling = {}; // id -> { resume:[], learning:[], output:[] }（未创建占位 label）

  for (const f of files) {
    const rel = normalizeRel(f);
    // 跳过 Axel 根的身份文件（身份在 data/site.ts 手写）
    if (!rel.includes('/')) continue;

    const raw = readFileSync(join(AXEL, f), 'utf8');
    const lines = raw.split('\n');
    const slug = toSlug(f);

    // 日期：文件添加时间（birthtime），回退 mtime
    let date = null;
    try {
      const st = statSync(join(AXEL, f));
      const t = st.birthtime && st.birthtime.getTime() > 0 ? st.birthtime : st.mtime;
      date = t.toISOString().slice(0, 10);
    } catch {
      date = null;
    }

    // 反链剔除
    const backlinks = [];
    const kept = [];
    for (const line of lines) {
      const m = line.match(BACKLINK_RE);
      if (m) {
        const t = m[1].trim();
        const target = resolveLink(t, rel, pathIndex, baseIndex);
        if (target) backlinks.push(target);
        continue;
      }
      kept.push(line);
    }
    let body = kept.join('\n');

    // 标题 = Obsidian 文件名（basename），与 vault 一一对应；H1 仅用于标签与折叠计数
    let title = slug.split('/').pop();
    let tags = [];
    let h1Count = 0;
    for (const line of kept) {
      if (H1_RE.test(line)) {
        h1Count++;
        const text = line.replace(H1_RE, '').trim();
        if (isTaglineH1(line)) {
          tags.push(...parseTags(text));
        }
      }
    }

    // 归属：category / direction / tab
    let direction = null;
    let tab = null;
    let category = 'note';
    if (rel.startsWith('sections/计划')) category = 'plan';
    else if (rel.startsWith('sections/学习思考')) category = 'learn';
    else if (rel.startsWith('sections/兴趣')) category = 'interest';
    else if (rel.startsWith('sections/我在做：/')) {
      category = 'doing';
      const after = rel.slice('sections/我在做：/'.length);
      const seg = after.split('/')[0];
      if (DIR_MAP[seg]) {
        direction = DIR_MAP[seg];
        const rest = after.slice(seg.length + 1);
        const isEntry = rest === seg + '.md'; // 方向入口笔记：sections/我在做：/<dir>/<dir>.md
        if (isEntry) {
          tab = null;
        } else if (
          /^产出\//.test(rest) ||
          /\/产出\//.test(rest) ||
          /^产出$/.test(rest) ||
          /^作品\//.test(rest) ||
          /^项目\//.test(rest)
        ) {
          tab = 'output';
        } else if (/^学习\//.test(rest) || /web3学习\//.test(rest) || /学习\//.test(rest)) {
          tab = 'learning';
        } else if (/简历/.test(rest) || /简历/.test(seg)) {
          tab = 'resume';
        } else {
          tab = null;
        }
        if (isEntry) {
          const scan = scanEntrySections(kept, rel, pathIndex, baseIndex);
          if (scan) entryScans[direction] = scan;
        }
      }
    }

    // 空占位 / hub 判定
    const linksOnly = body
      .replace(BACKLINK_RE, '')
      .replace(WIKILINK_RE, '')
      .replace(MDLINK_RE, '')
      .replace(/^---+\s*$/gm, '')
      .replace(/\s/g, '');
    let linkCount = 0;
    body.replace(WIKILINK_RE, () => {
      linkCount++;
      return '';
    });
    body.replace(MDLINK_RE, () => {
      linkCount++;
      return '';
    });

    const isHub = linksOnly.length === 0 && linkCount > 0;
    const isEmpty = linksOnly.length === 0 && linkCount === 0;

    // wikilink / md 链接改写为站内链接；悬空 → 淡色「未创建」标记
    let content = body;
    content = content.replace(WIKILINK_RE, (full, target) => {
      const parts = target.split('|');
      const t = parts[0].trim();
      const label = (parts[1] || t).trim();
      const resolved = resolveLink(t, rel, pathIndex, baseIndex);
      if (!resolved) return `<span class="todo-link" title="未创建">${escHtml(label)}</span>`;
      return `[${label}](/notes/${resolved.split('/').map(encodeURIComponent).join('/')})`;
    });
    content = content.replace(MDLINK_RE, (full, label, href) => {
      if (/^(https?:|mailto:|#|\/)/.test(href)) return full;
      const resolved = resolveLink(href, rel, pathIndex, baseIndex);
      if (!resolved) {
        const text = (label || href).trim();
        return `<span class="todo-link" title="未创建">${escHtml(text)}</span>`;
      }
      return `[${label}](/notes/${resolved.split('/').map(encodeURIComponent).join('/')})`;
    });

    const note = {
      slug,
      title,
      date,
      source: toSource(rel),
      category,
      direction,
      tab,
      isHub,
      isEmpty,
      h1Count,
      tags,
      backlinks,
      content,
    };
    notes.push(note);

    if (direction && tab) {
      if (!directionSets[direction]) directionSets[direction] = { resume: [], learning: [], output: [] };
      directionSets[direction][tab].push(slug);
    }
  }

  // 合并入口笔记小节推导：小节顺序在前（Obsidian 正文顺序），文件夹推导在后，去重
  for (const [dirId, scan] of Object.entries(entryScans)) {
    if (!directionSets[dirId]) directionSets[dirId] = { resume: [], learning: [], output: [] };
    for (const tab of TABS) {
      const ordered = [];
      for (const s of scan.notes[tab]) if (!ordered.includes(s)) ordered.push(s);
      for (const s of directionSets[dirId][tab]) if (!ordered.includes(s)) ordered.push(s);
      directionSets[dirId][tab] = ordered;
    }
    directionDangling[dirId] = scan.dangling;
  }

  notes.sort((a, b) => a.slug.localeCompare(b.slug, 'zh'));

  const out = {
    generatedAt: new Date().toISOString(),
    notes,
    directions: directionSets,
    directionDangling,
  };

  mkdirSync(join(ROOT, 'data'), { recursive: true });
  writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
  console.log(`[sync] 已生成 data/generated.json（${notes.length} 篇笔记）`);
}

function mainSafe() {
  if (!existsSync(AXEL)) {
    if (existsSync(OUT)) {
      console.warn('[sync] 未找到 Axel/，沿用已有 data/generated.json（部署快照）');
      return;
    }
    console.warn('[sync] 未找到 Axel/，写入空快照 data/generated.json');
    mkdirSync(join(ROOT, 'data'), { recursive: true });
    writeFileSync(
      OUT,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          notes: [],
          directions: {},
          directionDangling: {},
        },
        null,
        2,
      ),
      'utf8',
    );
    return;
  }
  main();
}

mainSafe();
