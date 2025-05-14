/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    OPENAI_API_KEY: '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',
  },
};

module.exports = nextConfig; 