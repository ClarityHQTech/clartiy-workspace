/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The dashboard is a self-contained operator console; keep builds resilient.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
