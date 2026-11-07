/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.VERCEL ? '.next' : '.next.nosync',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
