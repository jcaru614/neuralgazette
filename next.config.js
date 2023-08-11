/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      // 'www.washingtonpost.com',
      // 'media.washtimes.com',
      // 'twt-thumbs.washtimes.com'
    ], // Add more domains if needed
  },
};

module.exports = nextConfig;
