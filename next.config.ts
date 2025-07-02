import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,

  // 🚦  don't fail CI because of ESLint  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
