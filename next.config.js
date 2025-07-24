/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/fin_calc_aia',
  assetPrefix: '/fin_calc_aia/'
}

module.exports = nextConfig 