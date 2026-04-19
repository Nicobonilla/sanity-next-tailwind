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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 576, 640, 768, 828, 1080, 1200, 1600, 1920],
    imageSizes: [96, 160, 240, 320, 360, 480, 640],
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
