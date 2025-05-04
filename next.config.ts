import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'appsumo2-cdn.appsumo.com',
        port: '',
        pathname: '/media/**', // Be more specific if possible, e.g., '/media/selfsubmissions/images/**'
      },
    ],
  },
};

export default nextConfig;
