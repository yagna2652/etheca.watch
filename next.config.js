// Temporarily disable Contentlayer for faster dev server startup
// const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: __dirname
}

// Export without Contentlayer wrapper for now
module.exports = nextConfig
// module.exports = withContentlayer(nextConfig)