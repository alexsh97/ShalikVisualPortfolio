import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  env: { SITE_URL: process.env.SITE_URL || process.env.URL || 'https://localhost:3000' },
  async headers() { return [{ source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: 'upgrade-insecure-requests' }] }]; },
};
export default nextConfig;
