/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
    typedRoutes: true,
  },
  logging: {
    fetches: { fullUrl: true },
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.VIDEO_HERO_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
};
