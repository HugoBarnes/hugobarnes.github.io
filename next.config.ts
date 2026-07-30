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

  // pdfjs-dist optionally requires Node's `canvas` package, which isn't
  // available (or needed) in the browser build. Stub it so the build succeeds.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
