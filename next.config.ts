import type { NextConfig } from "next";

const BACKEND_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",

  // Proxy all /api/* and /auth/* requests to the backend.
  // This means client-side fetch("/api/council") hits the backend transparently,
  // and Clerk tokens attached by the browser are forwarded automatically.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/auth/:path*",
        destination: `${BACKEND_URL}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
