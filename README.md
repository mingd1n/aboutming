# 丁铭 (Ming / Axel)

> 探索 · 未知 · 灵活  
> Explore · Unknown · Agile

21 岁，广州。正在成为一个超级个体。  
21, Guangzhou. Becoming a super-individual.

这是我的个人网站，展示简历与作品，以及 Web3 / AI / 跨境等领域的学习笔记。  
This is my personal site for resume, works, and notes on Web3, AI, cross-border trade, and more.

📧 mingd1n.tech@proton.me ｜ 💬 DMdmding ｜ 📍 广州 / 深圳 (Guangzhou / Shenzhen)

## 社交账号 / Social

- GitHub: [mingd1n](https://github.com/mingd1n)
- Instagram（摄影）: [minslens_](https://www.instagram.com/minslens_?igsi=eW9ndDl2Nm9hZXEy)
- TikTok（摄影）: [@minslens](https://www.tiktok.com/@minslens)
- 小红书（摄影）: @哇哈哈哈哈 · https://xhslink.cn/m/38t3ZtNKKLh
- 小红书（科技）: @火星派ai · https://xhslink.cn/m/2pCoILjWruf
- 微信公众号: 二维码见 `materials/QRcode/IMG_5061.JPG`

## 开发 / Development

技术栈：**Next.js（App Router）+ React** + Tailwind CSS v4。全站中英双语，首页有「我在做」「我在想」「我的世界」三章。

```bash
cd ~/Desktop/aboutming
npm install
npm run dev      # http://localhost:3000  → 自动跳到 /zh
npm run build
npm start        # 预览生产构建
```

主要路径：

| Path | 说明 |
| --- | --- |
| `/` | 重定向到 `/zh` |
| `/zh` `/en` | 首页，左侧指针与抽象背景随滚动移动 |
| `/zh/career` | 我在做总览（五方向） |
| `/zh/career/web3` 等 | 按 Obsidian 方向入口笔记的标题、顺序和链接展示 |
| `/zh/learn` | 我在想，所有长短想法沿横轴混排，最新在左 |
| `/zh/world` | 旅行 → 音乐 → 电影 → 我的目标 → 摄影作品 |
| `/zh/notes/...` | 笔记详情 |
| `/zh/contact` | 联系与社交 |

本仓库路径：`~/Desktop/aboutming`（桌面 → `aboutming`）。

## 内容维护

- **我在想**：把要公开的想法放进 `Axel/sections/学习思考/`，可按原有目录整理。网站直接展示笔记内容，按创建时间倒序排列，横向可用滚轮、触控或底部滚动条。原有分类入口、索引及空模板不加入时间轴。
- **我在做**：在 Web3、AI Dev 等方向的 Obsidian 入口笔记里安排学习路线、笔记和作品。网站保留标题层级、原顺序、正文链接和显式反链，同步时不另造分类。
- **我的目标**：把想体验或想完成的事写入 `Axel/sections/兴趣/我的目标.md`。它显示在「我的世界」里，摄影作品排在最底部。
- **发布与交接**：Grok Bot 负责每天北京时间 01:00 的合规内容更新。Codex 负责当次委托的网站工作，默认本地验收。发布前逐项核对快照、链接和图片，并把各阶段记入共享日志。详见 [项目文档第 8.2 节](docs/项目文档.md#82-夜间发布与-agent-交接)。`Axel/` 独立留在本地。

Agent 规范见 `AGENTS.md`，设计蓝图见 `docs/项目文档.md`。素材与待办见 `docs/需要主人做的事.md`。
