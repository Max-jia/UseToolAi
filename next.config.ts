import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Point AI crawlers and browsers at the llms.txt manifest (GEO)
        source: "/",
        headers: [
          {
            key: "Link",
            value: '<https://usetoolai.com/llms.txt>; rel="alternate"; type="text/plain"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
