/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    OPENAI_API_KEY: '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',
    GEMINI_API_KEY: 'AIzaSyABbpoCwgcXXyzjC9h3rvY-lRSo3jdcXHA', // Replace with actual API key in production
    API_PROVIDER: 'gemini', // Use this to switch between Gemini and OpenAI
  },
  // In a production app, you would use a server-side API instead of exposing API keys
  // This is just for development/demo purposes
};

module.exports = nextConfig; 