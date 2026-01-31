import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Avoid Next.js guessing the monorepo root from other lockfiles.
    root: __dirname,
  },
};

export default nextConfig;
