import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Force le polling toutes les secondes
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

export default nextConfig;