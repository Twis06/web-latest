import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // The CV is the home page now; the resume PDF still links to /cv.
  async redirects() {
    return [{ source: '/cv', destination: '/', permanent: true }];
  },
};

export default nextConfig;
