import type { Lang } from '@/lib/i18n';
import type { Note } from '@/lib/content';

/**
 * 站点侧笔记英文标题（vault 文件名仍是中文真相源）。
 * 缺省时英文站回退中文 basename，避免空白。
 */
export const NOTE_TITLES_EN: Record<string, string> = {
  // 兴趣
  '兴趣/兴趣': 'Interests',
  '兴趣/旅行': 'Travel',
  '兴趣/电影': 'Films',
  '兴趣/音乐': 'Music',

  // 学习思考
  '学习思考/学习': 'Learning',
  '学习思考/学习方法': 'Learning Methods',
  '学习思考/播客': 'Podcasts',
  '学习思考/文章': 'Articles',
  '学习思考/英语': 'English',

  // 计划
  '计划/计划': 'Plan',

  // 我在做 · 总览
  '我在做：/我在做': "What I'm Building",

  // TourGuide
  '我在做：/TourGuide/TourGuide': 'TourGuide',
  '我在做：/TourGuide/城市探索计划模板': 'City Exploration Plan Template',
  '我在做：/TourGuide/简历': 'Resume',

  // ai-dev
  '我在做：/ai-dev/ai-dev': 'AI Development',
  '我在做：/ai-dev/学习/AI 基础概念和各角色认识': 'AI Basics & Roles',
  '我在做：/ai-dev/学习/ai学习': 'AI Learning',
  '我在做：/ai-dev/学习/开发基础概念': 'Dev Fundamentals',
  '我在做：/ai-dev/学习路线': 'Learning Roadmap',

  // web3
  '我在做：/web3/web3': 'Web3',
  '我在做：/web3/web3学习/Bitcoin concept': 'Bitcoin Concepts',
  '我在做：/web3/web3学习/ETH concept': 'ETH Concepts',
  '我在做：/web3/web3学习/Token & NFT': 'Token & NFT',
  '我在做：/web3/web3学习/Web3 Concepts': 'Web3 Concepts',
  '我在做：/web3/web3学习/Web3 总览': 'Web3 Overview',
  '我在做：/web3/web3学习/Web3职场与运营入门/README': 'Web3 Careers & Ops Intro',
  '我在做：/web3/web3学习/Web3职场与运营入门/交易所BD入门': 'Exchange BD Primer',
  '我在做：/web3/web3学习/Web3职场与运营入门/产品经理入门': 'Product Manager Primer',
  '我在做：/web3/web3学习/Web3职场与运营入门/发币与上所': 'Token Launch & Listings',
  '我在做：/web3/web3学习/Web3职场与运营入门/职场与运营入门': 'Careers & Operations Primer',
  '我在做：/web3/web3学习/Web3职场与运营入门/运营实操清单': 'Ops Playbook',
  '我在做：/web3/web3学习/bybit, coinbase, kraken, binance区别':
    'Bybit vs Coinbase vs Kraken vs Binance',
  '我在做：/web3/web3学习/代币经济学': 'Tokenomics',
  '我在做：/web3/web3学习/公链谱系': 'Public Chain Landscape',
  '我在做：/web3/web3学习/空投': 'Airdrops',
  '我在做：/web3/实践/Mojo运营结构拆解': 'Mojo Ops Structure Breakdown',
  '我在做：/web3/实践/OKX智能组合推文拆解': 'OKX Smart Portfolio Tweet Breakdown',
  '我在做：/web3/实践/Web3项目推文': 'Web3 Project Tweets',
  '我在做：/web3/实践/实践': 'Practice',

  // 自媒体
  '我在做：/自媒体/自媒体': 'Media',
  '我在做：/自媒体/科技博主/产出/算力市场的崛起': 'The Rise of the Compute Market',

  // 跨境
  '我在做：/跨境/跨境': 'Cross-border Commerce',
  '我在做：/跨境/学习/跨境工作流': 'Cross-border Workflow',
  '我在做：/跨境/项目/ClimaCore': 'ClimaCore',
};

/** 按语言取笔记标题：zh = vault 文件名；en = 映射表，缺省回退中文 */
export function noteTitle(note: Pick<Note, 'slug' | 'title'>, lang: Lang): string {
  if (lang === 'en') return NOTE_TITLES_EN[note.slug] ?? note.title;
  return note.title;
}
