import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },

  // Ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // experimental: {
  //   ppr: "incremental",
  //   after: true
  // },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  }
};

export default nextConfig;
