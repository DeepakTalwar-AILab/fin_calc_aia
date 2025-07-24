/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel deployment
  images: {
    unoptimized: true // Keep this for static exports if needed
  },
  // Remove GitHub Pages specific settings
  // output: 'export' - Not needed for Vercel
  // trailingSlash: true - Not needed for Vercel  
  // basePath: '/fin_calc_aia' - Not needed for Vercel
  // assetPrefix: '/fin_calc_aia/' - Not needed for Vercel
}

module.exports = nextConfig 