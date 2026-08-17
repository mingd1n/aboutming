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
├─ src/
│  ├─ pages/[lang]/      # 中英路由：首页 / 简历 / 笔记 / 联系
│  ├─ components/        # Header、Footer、ThemeToggle 等
│  ├─ layouts/           # BaseLayout
│  ├─ i18n/              # 文案与语言工具
│  ├─ data/              # 站点公开内容（简历方向、笔记分类等）
│  └─ styles/global.css  # Tailwind v4 + 主题变量
├─ public/               # 静态资源
├─ docs/项目文档.md       # 设计蓝图（目标/地图/需求/技术栈/里程碑）
├─ README.md             # 面向人的自我介绍（中英双语）
├─ AGENTS.md             # 本文件（面向 Agent）
└─ .gitignore            # 排除 Axel/、node_modules、密钥等
```

## 常用命令（初始样板）

```bash
npm run dev      # 本地开发
npm run build    # 打包构建
npm run lint     # 代码检查
```

> 备注：若改用 pnpm / yarn，命令对应替换（`pnpm dev` / `pnpm build`）。

## 内容来源与同步

- **唯一内容真相源**：当前 `Axel/` vault（不是旧版 html 站、不自拟板块名）。
- 结构根：`Axel/Ming.md` → 计划 / 学习思考 / 事业。
- 事业五方向以 `Axel/sections/事业/事业.md` 为准：`web3` · `ai-dev` · `自媒体` · `跨境电商` · `TourGuide`。
- 站点临时映射层：`src/data/directions.ts` · `notes.ts` · `site.ts`（须标注 `source` 路径；vault 为空则不写假经历）。
- 公开站不展示电话等敏感信息。
- 同步方式（待定）：手动维护 data 层 / MDX 直渲染 / 构建脚本导出。

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