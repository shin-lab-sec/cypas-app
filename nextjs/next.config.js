const withInterceptStdout = require('next-intercept-stdout')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = withInterceptStdout(nextConfig, text =>
  text.includes('Duplicate atom key') ? '' : text,
)
