import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "akpaka-super-secret-development-key-2026",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  }
};

export default nextConfig;
