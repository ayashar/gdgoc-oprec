import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gpu.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
