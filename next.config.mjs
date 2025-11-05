/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds if needed
    ignoreDuringBuilds: false,
    // Specify directories to lint
    dirs: ['src'],
  },
};

export default nextConfig;
