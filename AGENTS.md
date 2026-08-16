# AGENTS.md

> 本文件面向 AI 编程 Agent。每次行动前请先读这里，了解项目定位、目录结构、规范与注意事项。
> 写法说明：每个关键决策给了一个「初始样板」+「> 备注：你还可以选…」，最终方案以 `docs/项目文档.md` 为准。

## 项目定位

- 个人网站：**简历主页 + 知识笔记** 的混合展示站。
- 主人：丁铭（Axel），21 岁，广州。
- 全站**中英文双语**（i18n），所有页面与内容都要有中文 / 英文两个版本。
- 当前状态：本地为新版本（大改中，尚未 push），GitHub / Vercel 上展示的是旧版本，与本地内容不一致。

## 技术栈（初始样板）

- Node.js
  > 备注：你还可以选 Next.js 15（App Router）、Astro、Vite + React、Nuxt。
- UI：Tailwind CSS v4 / shadcn-ui
  > 备注：也可用 UnoCSS、Chakra UI、纯 CSS。
- 动效 / 3D：Framer Motion、Three.js
  > 备注：可选 GSAP、React Three Fiber。
- 部署：Vercel
  > 备注：也可选 Cloudflare Pages、GitHub Pages。

## 目录结构（当前）

```
aboutming/
├─ Axel/                 # Obsidian 知识库（内容源头；独立 git 仓库，已 .gitignore，不 push 到本仓库）
│  ├─ Ming.md            # 总入口，链接到三大板块
│  ├─ 简历-Ming.md        # 简历源文件
│  └─ sections/          # 计划 / 学习思考 / 事业（web3、ai-dev、自媒体、跨境电商、TourGuide）
├─ css/ js/ material/    # 旧版站点资源（重做中，待清理）
├─ README.md             # 面向人的自我介绍（中英双语）
├─ AGENTS.md             # 本文件（面向 Agent）
├─ .gitignore            # 排除 Axel/、node_modules、密钥等
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
- 同步方式（待定）：<手动复制 / 用 MDX 直接渲染 vault / 通过脚本导出>
  > 备注：可选方案——(1) 直接提交 vault 到仓库并用 MDX 渲染；(2) 构建时脚本从 vault 导出；(3) 手动维护网站版内容。

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
- 优先用 `docs/项目文档.md` 记录设计决策与进度。。