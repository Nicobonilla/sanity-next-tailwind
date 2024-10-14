/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
    typedRoutes: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: ['cdn.sanity.io']
  }
};
