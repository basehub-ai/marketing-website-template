/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["basehub.earth", "assets.basehub.com"],
  },
};

module.exports = nextConfig;
