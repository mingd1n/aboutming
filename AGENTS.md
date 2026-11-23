# AGENTS.md

> 本文件面向 AI 编程 Agent。每次行动前请先读这里，了解项目定位、目录结构、规范与注意事项。
> 写法说明：每个关键决策给了一个「初始样板」+「> 备注：你还可以选…」，最终方案以**桌面仓库** `docs/项目文档.md` 为准。
> 本文件只认：`/Users/mingd1n/Desktop/aboutming/AGENTS.md`。

## 仓库真相源（最高优先级 · 时时刻刻）

- **唯一工作目录、唯一主人可见仓库**：`/Users/mingd1n/Desktop/aboutming`（桌面上的 `aboutming`）。
- **时时刻刻以桌面 repo 为准。** 读文件、改代码、建文件夹、写文档、放素材，都必须落在这条路径。
- 主人用 Finder / 编辑器打开的就是桌面仓库。桌面上看不见 = 没做完。
- `~/.grok/worktrees/desktop-aboutming/*` 只是工具用的 git worktree，**不是**交付目录。禁止只改 worktree 却不写回桌面。
- 若当前会话 workspace 不是 `~/Desktop/aboutming`：先把改动写进桌面路径，再考虑是否同步 worktree。
- 素材投放处：`/Users/mingd1n/Desktop/aboutming/materials/`。不要写到 worktree 里的 `materials/` 就结束。
- **主人待办**：需要主人提供照片 / logo / 链接 / 文案 / 拍板时，立刻更新桌面 `docs/需要主人做的事.md`（「现在请做」+ 日志里写「这次需要你补充 xxx」）。不要只在对话里提一句。做完由 Agent 勾掉并记入「已完成」。

## 双写文档与工作副本（最高优先级 · 与上节同级）

1. **改计划 / 决策 / 技术栈 / 站点地图 / 里程碑时，必须同时改两份文件，同一轮完成**：
   - 桌面 `AGENTS.md`
   - 桌面 `docs/项目文档.md`
2. 只改其中一个 = **没做完**。不允许「下次再补另一份」。
3. 分工习惯：`项目文档.md` 写蓝图细节（地图、需求、选型理由、进度）；`AGENTS.md` 写 Agent 硬规矩与当前结构摘要——内容冲突时以 `项目文档.md` 为准，但两边都要改到一致。
4. **工作副本开工前先读桌面规范和日志**。只同步已经交接且能安全应用的文件。工作副本中已有的改动保留，遇到重叠时按项目文档第 8.2 节交接。

## 未下令禁止写站（最高优先级 · 与上节同级）

- **没有主人明确说「开始写 / 开始实现 / 动手写代码」之前，禁止写任何站点代码。**
- 计划获批、文档定稿、素材夹建好，**都不等于**可以开工。只能改文档 / 素材目录 / 待办日志，或回答问题。
- 禁止擅自恢复、拷贝或重搭 `src/`、`package.json`、`scripts/`、页面组件等。
- 违反过：计划批准后未等口头「开始写」就实现 Solarpunk 站点；主人要求删除。见违规记录第 6 条。

## 项目定位

- 个人网站：**简历主页 + 知识笔记** 的混合展示站。
- 主人：丁铭（Axel），21 岁，广州。
- 全站**中英文双语**（i18n），所有页面与内容都要有中文 / 英文两个版本。
- **视觉一句话（已定 · 2026-08-18）**：不是普通作品集，而是「一个人的视觉操作系统」（personal operating system）——编辑排版 + 未来感仪表盘 + 当代数字艺术 + Solarpunk + 日式极简 + 高级时装编辑感 + 电影级艺术指导。

## 首页设计「视觉 OS」（已定 · 2026-08-18 · 详见 docs/项目文档.md §8.1）

- **首页 = 单页全宽滚动「视觉 OS」**：`01 WHAT I'M BUILDING 我在做` · `02 WHAT I'M THINKING 我在想` · `03 MY WORLD 我的世界`。「关于我」在三章之前。
- **常驻编号导航**：桌面左侧指针随纵向进度连续移动，手机底部横向显示同一进度。当前章节可点击与高亮。
- **主视觉**：每章一块大抽象艺术（层叠半透明形、建筑几何、有机形态、玻璃质感、纸纹颗粒、细线图、抽象图解、植物元素、留白）。**禁用**：城市摄影/天际线/地标、过量霓虹、赛博朋克、发光蓝紫 AI 味、过量 3D、卡通。
- **配色（克制）**：深炭、暖白、柔灰、鼠尾草绿、低饱和青、琥珀、暖米色；琥珀/奶油作小点缀。**字体**：现代无衬线；大写英文标签 + 小中文副题 + 宽字距；大标题/元数据/小额导航三层对比。
- **Header 极简**：左上 `MING / AXEL`（下 `BUILDER / EXPLORER`）；右上 `EN / 中` + 太阳/月亮线描图标。
- **英文站**：与中文同一结构与交互；UI 文案完整英文。vault 长笔记**正文**默认中文、不硬翻；**笔记标题**英文站用站点映射 `data/note-titles.ts`（中文站仍用 Obsidian 文件名）。新增/改名笔记上站时必须补英文标题。**不要把给 Agent 的说明写进公网 UI**。`html lang` 与 metadata description 随 `/zh` `/en` 切换。
- **01 我在做**：五方向和方向链接卡使用换行网格。方向页跟随 Obsidian 入口笔记的标题层级、顺序和链接。
- **02 我在想**：长短想法在紧凑横轴上混排，最新在最左。主页与 `/learn` 共用同一时间轴，Obsidian 保留原分类，网站呈现正文和链接。旧话题网址跳转到 `/learn`。
- **03 我的世界**：旅行、音乐、电影、我的目标、摄影作品。目标是个人想体验或完成的事，摄影网格在最后。联系入口在页脚。
- **Footer 极简**：`MING / AXEL` `GUANGZHOU, CHINA` · `CONTACT ME →` · 社交（GitHub / Instagram / TikTok / 小红书 / 公众号；无 X）。
- **动效与材质**：上下滚动时光带、点阵和章节线稿产生明显视差，按钮和可点击卡片使用圆润外角。尊重系统「减少动态效果」设置。
- **素材策略**：现阶段背景用抽象 CSS/SVG，个人摄影放在「我的世界」末尾。广州实景背景与定制照片墙以后另做。


## 技术栈（已定 · 2026-08-18）

- **框架**：**Next.js（App Router）+ React**（不用 Astro；主人要能直接找到每个 page 文件，且需要动态壁纸）。
- **UI**：Tailwind CSS v4（shadcn-ui 可按需后加）
- **动效 / 壁纸**：`app/wallpaper.css` 与 `components/Wallpaper.tsx` 提供随滚动产生视差的固定背景。首页章节 SVG 和导航指针也跟随滚动。
- **3D**：Three.js 仅在有作品后按需加，不作第一版依赖。
- **内容**：本地 / `predev` 脚本只读 `Axel/` → `data/generated.json`（**提交进仓库**，供 Vercel 构建；Axel/ 仍 gitignore）。无 Axel/ 时 sync 沿用已有快照。
- **部署**：Vercel

### 页面文件在哪（开工后对照）

Next.js App Router：一个路由 ≈ 一个文件夹里的 `page.tsx`。

```
app/
  [lang]/                 # zh | en
    layout.tsx             # 顶栏 / 壁纸壳 / 主题
    page.tsx               # 首页三章 → /zh /en
    learn/page.tsx         # → /zh/learn，统一想法时间轴
    career/page.tsx
    career/[direction]/page.tsx
    notes/[...slug]/page.tsx
    contact/page.tsx
    world/page.tsx         # 我的世界：旅行、音乐、电影、目标、摄影
components/
  HomeView.tsx             # 关于我 + 01/02/03
  ChapterDock.tsx          # 左侧编号导航 + 移动端底部 Dock（仅首页）
  WorldAbout.tsx           # 关于我与摄影作品
  ThoughtTimeline.tsx      # 想法横轴（首页与 /learn 共用）
  DirectionDeck.tsx · ChapterArt.tsx · Header.tsx · Footer.tsx · ThemeToggle.tsx
data/                      # site.ts · directions.ts · world.ts · generated.json
scripts/sync-content.mjs
public/media/              # 上线用图（从 materials/ 选用；portrait/ city/ QRcode/）
```

Finder：桌面 → `aboutming` → `app` → `[lang]` → 各页。

### 首页逻辑

- 纵向滚动由文档承载，只有想法时间轴是横向容器。鼠标悬停时间轴时可用滚轮翻阅，滑到边缘后继续纵向滚动。语言切换保留当前路径。

## 目录结构（当前）

```
aboutming/
├─ Axel/                 # Obsidian 知识库（内容源头；独立 git 仓库，已 .gitignore）
│  ├─ Ming.md            # 总入口 + 身份/教育；网站即简历
│  └─ sections/          # 计划 / 学习思考 / 兴趣 / 我在做（web3、ai-dev、自媒体、跨境、TourGuide）
├─ materials/            # 图片与素材投放处
├─ docs/项目文档.md
├─ docs/需要主人做的事.md
├─ README.md
├─ AGENTS.md
└─ .gitignore
```

> 站点源码已在桌面仓库：`app/` · `components/` · `data/` · `scripts/` · `package.json`（Next.js）。改计划仍须主人明确指令；未下令不擅自大改。

## 常用命令

```bash
cd ~/Desktop/aboutming
npm run sync
npm run dev      # http://localhost:3000
npm run build
```

### 部署节奏与 Agent 分工（2026-11-22）

- **Grok Bot** 负责每天北京时间 01:00 的例行内容同步。主人已授权该任务发布符合规则的内容增量到网站仓库 `mingd1n/aboutming`，授权范围为内容更新。
- **Codex** 按主人当次要求做网站开发、修复、验收及文档维护。默认交付本地预览。手动发布网站改动需要主人当次明确授权。
- 开工先读 [项目文档 §8.2](docs/项目文档.md#82-夜间发布与-agent-交接) 和 [共享日志](docs/需要主人做的事.md#日志)，核对分支、在办事项和未提交文件。同一批内容由一个执行者发布。
- `Axel/` 默认私有，`sections/` 内也要核准公开范围。导出到隔离目录，把已核准的差异合入上一份公开快照。现有 `sync` 及会触发它的 `predev` / `prebuild` 产物都只作候选，须验收并审查暂存差异后发布。
- 网站改动与发布各阶段写入共享日志。获授权修改 Axel 文件时，按 `Axel/AGENTS.md` 追加 `Axel/CHANGELOG.md` 并仅在本地提交。

## 内容来源与同步

- **唯一内容真相源**：当前 `Axel/` vault（不是旧版 html 站、不自拟板块名）。
- 结构根：`Axel/Ming.md` → 计划 / 学习思考 / 兴趣 / 我在做。
- **我在想**：从 `Axel/sections/学习思考/` 取将公开的想法，按创建时间倒序。旧分类入口、纯链接索引和空模板不上时间轴；文章、播客、社媒等信息来源不决定网站分类。
- **我的目标**：由主人填写 `Axel/sections/兴趣/我的目标.md`，显示在「我的世界」的兴趣卡片和摄影之间。旧计划文件保留于 Obsidian，旧 `/plan` 跳转到「我的目标」。
- 我在做五方向以 `Axel/sections/我在做：/我在做.md` 为准：`web3` · `ai-dev` · `自媒体` · `跨境` · `TourGuide`。
- **同步方式（已定）**：脚本从 `Axel/` 导出到 `data/generated.json`（**入库**，部署快照）；只读 vault，绝不写入。CI/Vercel 无 `Axel/` 时沿用快照，不失败。**一次 sync 必须带上整篇：`title`（Obsidian 文件名 basename）+ 全文 `content` + 链接解析**——不是只更新入口列表/卡片链接。漏正文或标题仍显示旧名/路径前缀 = 没做完。新笔记还须在 `data/note-titles.ts` 补 **英文标题**。
- **上站验收（双语 · 标题+正文 · 必做）**：每次 `sync` + 部署后，**`/zh` 与 `/en` 都要验**：
  1. **中文站**方向页/笔记页标题 = vault 文件名（不要残留 `web3学习/` 之类路径前缀）；
  2. **英文站**同页标题 = `note-titles.ts` 英文（如 Airdrops / Tokenomics），不是中文文件名；
  3. 点进 `/zh/notes/...` 与 `/en/notes/...` 能看到**完整正文**（抽查关键段落；正文仍可为中文）；
  4. UI 壳随语言切换。
  只验中文站、或英文站标题仍是中文、或只验链接不验正文 = 没做完。
- **内容处理规则**：
  - `[[wikilink]]` / `[text](path.md)` → 解析为站内 `/notes/[slug]` 路由。
  - `← 反链` 作面包屑信息来源，正文渲染时剔除。
  - 空占位笔记 → 全部展示为「建设中」占位页（不隐藏）；纯链接索引节点（hub）在列表/Tab 中过滤，仅保留直接访问页。
  - 多 `#` 一级标题的笔记 → 渲染为可折叠块；单 H1 正常显示。
  - 我在做方向页 = **只渲染该方向入口笔记**（如 `web3/web3.md`）的 `#` 小节与其中链接，对齐 Obsidian 入口文件；**不再附加「相关笔记」**。小节名以 vault 为准（如 `# 学习` / `# 实践`）。笔记标题一律用 Obsidian 文件名（basename）；英文标题见 `data/note-titles.ts`。
  - **仅发布 `sections/` 下经核准的笔记**。根目录、私人记录及未明确公开的草稿留在本地。
  - 笔记正文里的相对图片拷到 `public/media/notes/`，路径改写为站点 URL；vault 里的 `.opencode/`、`scripts/` 不同步。
- 站点双语 UI 元数据：`data/directions.ts` · `data/site.ts`——均须标注 `source`；vault 为空则不写假经历。
- 公开站不展示电话等敏感信息。

## 注意事项

- `Axel/` 是**独立的 git 仓库**（远程 `mingd1n/ming-obsidian`），已被 `.gitignore` 排除；不要把它 commit 或 push 到本网站仓库。
- `Axel/.git/config` 的 remote URL 里嵌有 GitHub 令牌（`ghp_...`），属于密钥，务必改用 credential helper / SSH 并吊销旧令牌，切勿提交该配置。
- 敏感信息：`Axel/Ming.md`、各方向简历笔记中涉及电话、邮箱、微信等，公开部署前确认是否全部公开展示。不单独维护 `简历-Ming.md`（已删；站本身即简历）。
- 第三方短链接易失效：抖音 / 小红书 / Instagram 短链需定期检查。
- 不改动 `Axel/.obsidian/` 下的配置与插件文件，除非明确要求。
- 隐私与安全：任何密钥 / token 都写入 `.gitignore`，绝不提交到仓库。

## 违规记录（前车之鉴）

> 以下为以往 Agent 违反过的约定，供后续 Agent 引以为戒。任何与本站相关的动手前，先读本文件与 `docs/项目文档.md` 的「站点地图」与「已定决策」。

1. **Axel/ 曾被提交进本仓库（严重 · 安全）**
   - 现象：`Axel/` 以 gitlink（submodule，mode 160000）形式被 `git add` 并 commit 进本仓库；同时 `.gitignore` 中并未排除 `Axel/`。
   - 后果：违反「Axel/ 独立仓库、不提交」约定；子仓库一有改动，`git status` 会持续显示 `m Axel`，且存在误推 `Axel/.git` 配置（含令牌）的风险。
   - 要求：保持 `Axel/` 在 `.gitignore` 中且从不加入索引；若误提交，用 `git rm --cached Axel` 移出，但不得删除本地 `Axel/` 内容。

2. **未按 `docs/项目文档.md` 定稿站点地图实现**
   - 现象：已定稿为 `/career/*` 聚合页（Tab 切换 简历/学习/产出）+ `/plan` + `/learn` + `/notes/[slug]`；实际却搭成 `/resume/*` 详情页、无 Tab、无 plan/learn 页。
   - 后果：结构与定稿方案不符，需返工，浪费迭代。
   - 要求：搭建/改动页面结构前先核对定稿站点地图；结构变更须先回写 `docs/项目文档.md` 再动代码。

3. **未实现已定的同步方案，改用手写数据**
   - 现象：已定「构建时脚本从 `Axel/` 导出内容」，实际未创建脚本，内容手写进 `src/data/*.ts`。
   - 要求：内容真相源是 `Axel/`；涉及内容管线前先核对「内容来源与同步」章节及已定决策，不要绕过。

4. **文档与实现脱节 / 只改一份文档**
   - 现象：`AGENTS.md` 与 `docs/项目文档.md` 不一致；或改计划只动其中一个。
   - 要求：计划变更必须**双写**两份；实现后也要两边校准。不允许「文档一套、代码一套」或「AGENTS 一套、项目文档一套」。

5. **只改了 worktree，桌面 repo 里看不见（严重 · 交付）**
   - 现象：文件写在 `~/.grok/worktrees/desktop-aboutming/...`，主人打开 `~/Desktop/aboutming` 没有对应文件夹。
   - 后果：主人以为没做；素材无处可放。
   - 要求：任何新建目录或交付文件必须出现在 `~/Desktop/aboutming`。worktree 不是主人仓库。

6. **未等「开始写」就实现站点（严重 · 越权）**
   - 现象：计划/文档就绪后，Agent 自行恢复并改写 `src/`、跑 dev，主人并未说开始写。
   - 后果：主人要删站；信任受损。
   - 要求：必须听到明确开工指令才写代码。文档与素材准备 ≠ 开工。

## 规范

- **未下令不写站**：见上文「未下令禁止写站」。
- **自觉在桌面 repo 干活**：所有读写默认 `~/Desktop/aboutming`。不要待在 worktree 里改完就走。详见本文件开头与 `docs/项目文档.md` 第 0 节。
- 遵循现有代码风格，不加多余注释（除非要求）。
- 提交信息简洁，描述清楚改动。
- **双写**：计划和发布规则变更同时改 `AGENTS.md` 与 `docs/项目文档.md`。工作副本按交接记录同步。
- 优先用**桌面** `docs/项目文档.md` 记录设计决策与进度。
- 需要主人动手时更新 **桌面** `docs/需要主人做的事.md`，像日志一样追加，不要只口头提。
