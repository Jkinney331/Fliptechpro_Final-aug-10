import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com https://vercel.live; frame-ancestors 'none';"
          }
        ]
      }
    ]
  },
  // Performance optimizations
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'motion',
      'react-markdown',
      'remark-gfm',
      'marked',
      'three'
    ],
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Three.js optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
      
      // Tree-shake Three.js
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }
    return config;
  },
  // Keep TypeScript and ESLint enabled for production safety
  eslint: {
    dirs: ['src'], // Only lint src directory for faster builds
  },
  typescript: {
    ignoreBuildErrors: false, // Catch TypeScript errors in production
  },
};

export default nextConfig;
