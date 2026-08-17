/**
 * 事业方向 — 唯一对齐源：Axel/sections/事业/事业.md
 * 顺序与命名与 vault 一致：web3 · ai-dev · 自媒体 · 跨境电商 · TourGuide
 * 正文摘自对应简历 / 入口笔记；公开站不展示电话。
 */

export type DirectionId =
  | 'web3'
  | 'ai-dev'
  | 'media'
  | 'ecommerce'
  | 'tourguide';

export type Direction = {
  id: DirectionId;
  /** URL 段 */
  href: string;
  /** 对应 vault 路径（相对 Axel/） */
  source: string;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  highlights: { zh: string[]; en: string[] };
  skills: { zh: string[]; en: string[] };
  links: { zh: string; en: string; note: string }[];
};

export const directions: Direction[] = [
  {
    id: 'web3',
    href: 'web3',
    source: 'sections/事业/web3/',
    title: { zh: 'Web3', en: 'Web3' },
    summary: {
      zh: 'Web3 爱好者与社区建设者。核心价值理解：权力分化与万物上链；方向侧重运营、社区治理与市场教育。',
      en: 'Web3 enthusiast and community builder. Focus: decentralization, on-chain ownership, ops, governance, and market education.',
    },
    highlights: {
      zh: [
        '跨平台社群参与与内容运营（2024 至今）：美股投资社区（Twitter）互动；微信公众号科技/商业分析；大学组织部门公众号协作。',
        'Web3 市场与风险分析实践（2024 至今）：比特币与以太坊价值研究；高杠杆交易转化为风险管理与交易心理经验。',
        '跨学科基础与市场营销应用（2023–2025）：市场营销课程项目；计算机、数据分析、经济学等多学科基础。',
        '兴趣方向：DAO 治理、RWA 代币化；活跃于若干国际 Discord / Telegram 群组。',
      ],
      en: [
        'Cross-platform community & content (2024–): US equities community on Twitter; tech/business writing on WeChat; campus official account ops.',
        'Web3 market & risk practice (2024–): Bitcoin/Ethereum research; risk management lessons from leveraged trading.',
        'Cross-disciplinary base (2023–2025): marketing coursework; CS, data, and economics foundations.',
        'Interests: DAO governance, RWA; active in international Discord/Telegram groups.',
      ],
    },
    skills: {
      zh: [
        '区块链基础（BTC / ETH，DeFi、DAO、NFT 概念自学）',
        '社区与内容（Twitter、微信、小红书；Discord、Telegram）',
        '沟通（英语 / 普通话）',
      ],
      en: [
        'Blockchain basics (BTC/ETH; DeFi, DAO, NFT concepts)',
        'Community & content (Twitter, WeChat, Xiaohongshu; Discord, Telegram)',
        'Communication (English / Mandarin)',
      ],
    },
    links: [
      { zh: 'web3 入口', en: 'Web3 hub', note: 'web3.md' },
      { zh: 'web3 简历', en: 'Web3 resume', note: 'web3简历.md' },
      { zh: 'web3 学习', en: 'Web3 notes', note: 'web3学习/' },
    ],
  },
  {
    id: 'ai-dev',
    href: 'ai-dev',
    source: 'sections/事业/ai-dev/',
    title: { zh: 'ai-dev', en: 'ai-dev' },
    summary: {
      zh: 'AI 应用开发学习路线：中游偏应用 + 下游落地。不做硬件、不做大模型预训练/核心研发；专注 RAG、Agent（Graph/Loop）、工具调用、数据准备与产品落地。',
      en: 'AI application path: mid-stack apps + shipping. Not hardware or foundation-model R&D; focus on RAG, Agents (Graph/Loop), tool use, data prep, and product delivery.',
    },
    highlights: {
      zh: [
        '目标定位（见 ai-dev.md）：把模型变成能稳定干活的系统；硬件与 ML/DL 只学够用的认知。',
        '学习主线：编程基础 → 大模型使用与 Prompt → RAG + 数据工程 → Agent / LangGraph → 工程化落地。',
        '核心项目优先级：个人知识库 RAG；LangGraph 单 Agent。',
        'vault 结构：学习（ai学习、基础概念、开发基础）· 产出（程序）· 计算机简历。',
      ],
      en: [
        'Positioning (ai-dev.md): systems that reliably work; only enough hardware/ML literacy.',
        'Path: programming → LLM use & prompting → RAG & data → Agent/LangGraph → engineering & ship.',
        'Priority projects: personal-knowledge RAG; single-agent LangGraph.',
        'Vault: learning notes · program outputs · CS resume stub.',
      ],
    },
    skills: {
      zh: ['Python / Git / API', 'RAG 与数据清洗', 'Agent / LangGraph', 'FastAPI · Streamlit / Gradio'],
      en: ['Python / Git / API', 'RAG & data cleaning', 'Agent / LangGraph', 'FastAPI · Streamlit / Gradio'],
    },
    links: [
      { zh: 'ai-dev 入口', en: 'ai-dev hub', note: 'ai-dev.md' },
      { zh: '学习', en: 'Learning', note: '学习/' },
      { zh: '产出（程序）', en: 'Outputs', note: '产出/' },
    ],
  },
  {
    id: 'media',
    href: 'media',
    source: 'sections/事业/自媒体/',
    title: { zh: '自媒体', en: 'Media' },
    summary: {
      zh: '自媒体板块（Axel 原名）。下挂：摄影博主、科技博主、AI 视频，以及自媒体简历。',
      en: 'Media section (Axel name: 自媒体). Branches: photography, tech blogging, AI video, plus media resume.',
    },
    highlights: {
      zh: [
        '摄影博主：作品见摄影产出；Instagram minslens_（见 README / TourGuide 简历）。',
        '科技博主：学习 + 科技文章产出；矩阵账号见 README（小红书「火星经济」、公众号「火星经济 Elonomy」等）。',
        'AI 视频：学习 + 作品产出。',
        '自媒体简历文件目前在 vault 中为空，站点不编造经历，仅展示结构。',
      ],
      en: [
        'Photography: portfolio notes; Instagram minslens_ (README / TourGuide resume).',
        'Tech blogging: learning + article outputs; accounts in README (Xiaohongshu / WeChat 火星经济 Elonomy, etc.).',
        'AI video: learning + outputs.',
        'Media resume file is empty in the vault — site does not invent experience.',
      ],
    },
    skills: {
      zh: ['摄影博主', '科技博主', 'AI 视频'],
      en: ['Photography', 'Tech content', 'AI video'],
    },
    links: [
      { zh: '自媒体入口', en: 'Media hub', note: '自媒体.md' },
      { zh: '摄影博主', en: 'Photography', note: '摄影博主.md' },
      { zh: '科技博主', en: 'Tech blog', note: '科技博主.md' },
      { zh: 'AI 视频', en: 'AI video', note: 'AI视频.md' },
    ],
  },
  {
    id: 'ecommerce',
    href: 'ecommerce',
    source: 'sections/事业/跨境电商/',
    title: { zh: '跨境电商', en: 'Cross-border e-commerce' },
    summary: {
      zh: '跨境电商板块。vault 入口链到学习笔记与产出（含 ClimaCore）；方向简历文件目前几乎为空，站点不编造经历。',
      en: 'Cross-border e-commerce. Vault links learning notes and outputs (incl. ClimaCore); resume file is nearly empty — no invented experience.',
    },
    highlights: {
      zh: [
        '结构：学习 / 跨境电商.md · 产出 / 产出.md · 产出 / ClimaCore.md · 跨境电商简历.md。',
        '公开站目前只展示分类与项目名 ClimaCore，待 vault 简历补全后再同步细节。',
      ],
      en: [
        'Structure: learning notes · outputs · ClimaCore · resume stub.',
        'Public site only lists structure and ClimaCore until the vault resume is filled in.',
      ],
    },
    skills: {
      zh: ['学习笔记', '产出', 'ClimaCore'],
      en: ['Learning notes', 'Outputs', 'ClimaCore'],
    },
    links: [
      { zh: '跨境电商入口', en: 'Hub', note: '跨境电商.md' },
      { zh: '学习', en: 'Learning', note: '学习/跨境电商.md' },
      { zh: 'ClimaCore', en: 'ClimaCore', note: '产出/ClimaCore.md' },
    ],
  },
  {
    id: 'tourguide',
    href: 'tourguide',
    source: 'sections/事业/TourGuide/',
    title: { zh: 'TourGuide', en: 'TourGuide' },
    summary: {
      zh: '求职意向：入境游体验师（Tour Host）。做外籍游客的「本地朋友」，传递广州、深圳及大湾区魅力。',
      en: 'Target role: inbound Tour Host — a local friend for international visitors across Guangzhou, Shenzhen, and the GBA.',
    },
    highlights: {
      zh: [
        '跨文化沟通：英语流利；曾为南美洲、欧洲、日本、菲律宾等多国游客提供导游服务。',
        '本地深度洞察：深耕广州、深圳；小众景点、地道美食与特色体验；可定制行程。',
        '行程规划：整合交通、餐饮、景点，打造流畅旅行体验。',
        '视觉内容：人像与旅拍；运营 Instagram 摄影账号 minslens_。',
        '经历：海外旅行（日本、泰国、新加坡、马来西亚等）；入境游导游；摄影内容运营。',
      ],
      en: [
        'Cross-cultural communication: fluent English; guided guests from South America, Europe, Japan, the Philippines, etc.',
        'Local insight: Guangzhou & Shenzhen; niche spots, food, custom itineraries.',
        'Itinerary design: transport, dining, sights into smooth experiences.',
        'Visual content: portrait & travel photography; Instagram minslens_.',
        'Background: travel in Japan/Thailand/Singapore/Malaysia etc.; inbound guiding; photo content ops.',
      ],
    },
    skills: {
      zh: ['跨文化沟通', '行程规划', '本地洞察', '旅拍 / 人像'],
      en: ['Cross-cultural communication', 'Itinerary design', 'Local insight', 'Travel / portrait photo'],
    },
    links: [
      { zh: 'TourGuide 入口', en: 'TourGuide hub', note: 'TourGuide.md' },
      { zh: '简历', en: 'Resume', note: '简历.md' },
      { zh: '城市探索计划模板', en: 'City explore template', note: '城市探索计划模板.md' },
    ],
  },
];

export function getDirection(id: string): Direction | undefined {
  return directions.find((d) => d.id === id || d.href === id);
}
