/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    const direction = ':direction(web3|ai-dev|media|ecommerce|tourguide)';
    return [
      { source: '/', destination: '/zh', permanent: false },
      { source: '/resume', destination: '/zh/career', permanent: true },
      { source: `/resume/${direction}`, destination: '/zh/career/:direction', permanent: true },
      { source: '/notes', destination: '/zh/learn', permanent: true },
      { source: '/:lang(zh|en)/resume', destination: '/:lang/career', permanent: true },
      {
        source: `/:lang(zh|en)/resume/${direction}`,
        destination: '/:lang/career/:direction',
        permanent: true,
      },
      { source: '/:lang(zh|en)/notes', destination: '/:lang/learn', permanent: true },
    ];
  },
};

export default nextConfig;
