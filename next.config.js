/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ["shiki"],
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com" }, { hostname: "basehub.earth" }],
  },
};

module.exports = nextConfig;
