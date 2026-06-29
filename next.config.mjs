/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@vercel/blob"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./data/**/*"],
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.chungdoi.com" },
      { protocol: "https", hostname: "chungdoi.com" },
    ],
  },
};

export default nextConfig;
