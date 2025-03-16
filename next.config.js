/** @type {import('next').NextConfig} */

const videoHeroHost = process.env.VIDEO_HERO_HOST || 'default-video-host.com';
const isProduction = process.env.NODE_ENV === 'production';

// Configuración base
const baseConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
  },
  logging: {
    fetches: { fullUrl: !isProduction }, // Solo en desarrollo
  },
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: videoHeroHost,
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 259200,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `default-src 'self'; img-src 'self' https://cdn.sanity.io https://${videoHeroHost}; media-src 'self';`,
  },
  transpilePackages: ['lucide-react'],
  compiler: {
    removeConsole: isProduction,
    styledComponents: true,
  },
  output: 'standalone',
  trailingSlash: true,
};

// Configuración específica para producción
const productionConfig = isProduction
  ? {
      swcMinify: true,
      poweredByHeader: false,
      compress: true,
    }
  : {};

module.exports = {
  ...baseConfig,
  ...productionConfig,
};
