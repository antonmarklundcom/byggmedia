/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: never `output: 'export'` — this app ships API routes (/api/lead).
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local images only (Hostinger filesystem wipes on redeploy → no hotlinking).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
