import type { NextConfig } from "next";
import { hostname } from "node:os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
       {
        protocol: "https",
        hostname: "3fdk4hlq2q.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
