# AGENTS.md

> 本文件面向 AI 编程 Agent。每次行动前请先读这里，了解项目定位、目录结构、规范与注意事项。
> 写法说明：每个关键决策给了一个「初始样板」+「> 备注：你还可以选…」，最终方案以 `docs/项目文档.md` 为准。

## 项目定位

- 个人网站：**简历主页 + 知识笔记** 的混合展示站。
- 主人：丁铭（Axel），21 岁，广州。
- 全站**中英文双语**（i18n），所有页面与内容都要有中文 / 英文两个版本。


## 技术栈

- 框架：Astro + React Islands
- 3D：Three.js（用于个人作品集部分，待有作品后启用）
- UI：Tailwind CSS v4 / shadcn-ui
- 动效：Framer Motion、GSAP
- 部署：Vercel

## 目录结构（当前）

```
aboutming/
├─ Axel/                 # Obsidian 知识库（内容源头；独立 git 仓库，已 .gitignore，不 push 到本仓库）
│  ├─ Ming.md            # 总入口，链接到三大板块
│  ├─ 简历-Ming.md        # 简历源文件
│  └─ sections/          # 计划 / 学习思考 / 事业（web3、ai-dev、自媒体、跨境电商、TourGuide）
├─ README.md             # 面向人的自我介绍（中英双语）
├─ AGENTS.md             # 本文件（面向 Agent）
├─ .gitignore            # 排除 Axel/、node_modules、密钥等
├─ scripts/
│  └─ sync-content.ts    # 构建时从 Axel/ 导出内容的脚本（后续新增）
├─ src/                  # Astro 源码（后续新增：页面 / 组件 / i18n 字典）
└─ docs/项目文档.md       # 设计蓝图（目标/地图/需求/技术栈/里程碑）
```

> 备注：重做后网站代码会替换旧的 html/css/js 结构，以上目录可能随之调整。

## 常用命令（初始样板）

```bash
npm run dev      # 本地开发
npm run build    # 打包构建
npm run lint     # 代码检查
```

> 备注：若改用 pnpm / yarn，命令对应替换（`pnpm dev` / `pnpm build`）。

## 内容来源与同步

- 网站内容主要来源于 `Axel/`（Obsidian vault）与 `Axel/简历-Ming.md`。
- 内容结构以 `Axel/Ming.md` 为根，靠双向链接串成树，站点地图见 `docs/项目文档.md`。
- **同步方式（已定）**：构建时脚本从 vault 导出。
  - 由 `scripts/sync-content.ts`（或等价脚本）在 `npm run build` / `npm run dev` 时读取 `Axel/*.md`，解析双向链接生成站点数据。
  - 笔记更新无需手抄，重新构建即可自动同步。
  - 该脚本仅读取 `Axel/`，绝不写入或修改 vault 文件。

### 内容处理规则

1. `[[链接]]` → 生成对应页面路由与可点击导航（链接向下）。
2. `← [[上级]]` 反链 → 生成面包屑（向上返回）。
3. 空占位笔记 → **全部展示**，渲染为「建设中」占位页（已定，不隐藏）。
4. 一级标题 `#` → 渲染为折叠 / 展开区块（依据 `web3简历.md` 内注释要求）。
5. 社交短链（抖音 / 小红书 / Instagram）→ 聚合到 `/contact` 与对应博主页。

### i18n 策略（已定）

- 先搭 i18n 框架：导航 / UI / 布局中英双语可切换。
- 笔记正文第一版暂按中文原文渲染，英文版后续逐步补充。

## 注意事项

- `Axel/` 是**独立的 git 仓库**（远程 `mingd1n/ming-obsidian`），已被 `.gitignore` 排除；不要把它 commit 或 push 到本网站仓库。
- `Axel/.git/config` 的 remote URL 里嵌有 GitHub 令牌（`ghp_...`），属于密钥，务必改用 credential helper / SSH 并吊销旧令牌，切勿提交该配置。
- 敏感信息：`Axel/简历-Ming.md`、`Axel/` 中涉及电话、邮箱、微信等，公开部署前确认是否全部公开展示。
- 第三方短链接易失效：抖音 / 小红书 / Instagram 短链需定期检查。
- 不改动 `Axel/.obsidian/` 下的配置与插件文件，除非明确要求。
- 隐私与安全：任何密钥 / token 都写入 `.gitignore`，绝不提交到仓库。

## 规范

- 遵循现有代码风格，不加多余注释（除非要求）。
- 提交信息简洁，描述清楚改动。
- 优先用 `docs/项目文档.md` 记录设计决策与进度。