/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  swcMinify: true,
  poweredByHeader: false,
  output: 'standalone',
  outputFileTracing: true
};
