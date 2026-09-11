import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A Cloudinary cloud name is public delivery metadata. Keys and secrets stay
  // server-only; this makes the configured delivery host available to images.
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }] },
};

export default nextConfig;
