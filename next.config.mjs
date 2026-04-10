/** @type {import('next').NextConfig} */
const nextConfig = {
  // Decision V1 demo: keep a static export for the published build.
  // The chat remains available in dev or when switching later to a server runtime.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
