const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'cdn.sanity.io',
    port: '',
    pathname: '/**',
  },
];

if (process.env.VIDEO_HERO_HOST) {
  remotePatterns.push({
    protocol: 'https',
    hostname: process.env.VIDEO_HERO_HOST,
    port: '',
    pathname: '/**',
  });
}

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
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns,
  },
  transpilePackages: ['lucide-react'],
};
