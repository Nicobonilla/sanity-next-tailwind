/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true, // 🔥 Mantiene seguridad en rutas
  },
  logging: {
    fetches: { fullUrl: true },
  },
  productionBrowserSourceMaps: false, // ⚠️ Evita exponer código fuente en producción
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.VIDEO_HERO_HOST,
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 259200, // 3 dias 🔥 Cachea imágenes para mejorar performance
    dangerouslyAllowSVG: false, // ⚠️ Seguridad: Previene ataques XSS con SVG
    contentSecurityPolicy: "default-src 'self'; img-src 'self' https://cdn.sanity.io; media-src 'self';", // 🔒 Refuerza seguridad en imágenes
  },
  transpilePackages: ['lucide-react'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 🔥 Elimina `console.log` en producción
    styledComponents: true, // 🔥 Soporte para `styled-components`
  },
  output: 'standalone', // Para despliegues optimizados
  trailingSlash: true
};

module.exports = nextConfig;