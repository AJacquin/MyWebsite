import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Essentiel pour Docker + Windows
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Vérifie les changements toutes les secondes
      aggregateTimeout: 300,
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3000/:path*', // Forward vers le conteneur Next.js
      },
    ];
  }
};

export default nextConfig;
