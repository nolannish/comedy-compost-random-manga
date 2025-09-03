import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // whitelisted hosts
    domains: ["cdn.myanimelist.net"],
  },
};

export default nextConfig;
