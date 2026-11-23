/**
 * 每章一块抽象艺术（当代数字艺术方向）——CSS + SVG 生成，
 * 层叠半透明形、建筑几何、有机形态、细线、颗粒、植物元素。
 * variant 决定构图主题：
 *   build 建筑/系统、learn 知识网络、world 有机/植物
 */
export default function ChapterArt({ variant }: { variant: 'build' | 'learn' | 'world' }) {
  return (
    <div
      className="chapter-art pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="chapter-art-shapes">
        {variant === 'build' && <BuildArt />}
        {variant === 'learn' && <LearnArt />}
        {variant === 'world' && <WorldArt />}
      </div>
      <div className="absolute inset-0 grain" />
    </div>
  );
}

function BuildArt() {
  return (
    <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--sage)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--teal)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg0)" />
      <g fill="none" stroke="var(--fg)" strokeOpacity="0.12">
        <rect x="180" y="180" width="360" height="420" strokeWidth="1.2" />
        <rect x="240" y="120" width="300" height="180" strokeWidth="1.2" />
        <rect x="620" y="300" width="400" height="300" strokeWidth="1.2" />
      </g>
      <g fill="var(--accent)" fillOpacity="0.12">
        <rect x="200" y="200" width="140" height="160" />
        <rect x="660" y="340" width="120" height="140" />
      </g>
      <g fill="var(--cream)" fillOpacity="0.1">
        <circle cx="520" cy="520" r="90" />
        <circle cx="700" cy="200" r="48" />
      </g>
      <g stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1">
        <line x1="200" y1="360" x2="560" y2="360" />
        <line x1="200" y1="520" x2="560" y2="520" />
        <line x1="660" y1="480" x2="1020" y2="480" />
      </g>
      <g fill="none" stroke="var(--fg)" strokeOpacity="0.25" strokeWidth="0.8">
        <path d="M240 300 h120 v-60 h60 v140 h-80" />
      </g>
    </svg>
  );
}

function LearnArt() {
  const nodes = [
    [300, 240], [560, 180], [820, 260], [430, 420], [680, 460], [900, 560],
    [260, 600], [560, 620], [760, 300],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 8], [4, 5], [5, 8],
    [3, 6], [6, 7], [4, 7],
  ];
  return (
    <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g stroke="var(--fg)" strokeOpacity="0.14" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 3 === 0 ? 22 : 13} fill="var(--teal)" fillOpacity="0.14" />
          <circle
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 22 : 13}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </g>
      ))}
      <g fill="var(--cream)" fillOpacity="0.12">
        <rect x="150" y="140" width="120" height="70" />
        <rect x="950" y="600" width="90" height="50" />
      </g>
    </svg>
  );
}

function WorldArt() {
  return (
    <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wg0" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--sage)" stopOpacity="0.2" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#wg0)" />
      <g fill="none" stroke="var(--sage)" strokeOpacity="0.5" strokeWidth="1.2">
        <path d="M120 680 C320 560 380 720 560 620 C760 500 840 640 1080 560" />
        <path d="M160 700 C360 600 420 740 600 660 C780 560 860 680 1060 620" />
      </g>
      <g fill="none" stroke="var(--sage)" strokeOpacity="0.4" strokeWidth="1">
        <path d="M900 620 C940 540 900 480 960 420" />
        <path d="M930 640 C980 560 940 520 1000 460" />
      </g>
      <g fill="var(--cream)" fillOpacity="0.12">
        <ellipse cx="300" cy="300" rx="130" ry="80" />
        <ellipse cx="860" cy="240" rx="100" ry="60" />
      </g>
      <g fill="var(--accent)" fillOpacity="0.3">
        <circle cx="150" cy="150" r="30" />
        <circle cx="1050" cy="120" r="20" />
      </g>
    </svg>
  );
}
