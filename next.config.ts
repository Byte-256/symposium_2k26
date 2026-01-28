import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/symposium_2k26' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/symposium_2k26' : '',
};

export default nextConfig;
