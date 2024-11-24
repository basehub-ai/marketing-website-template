import { NextConfig } from "next";

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "export",
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com" }, { hostname: "basehub.earth" }],
  },
} satisfies NextConfig;

export default nextConfig;
