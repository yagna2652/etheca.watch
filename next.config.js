/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: __dirname
}

module.exports = nextConfig