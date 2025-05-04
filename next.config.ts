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
        hostname: 'appsumo2-cdn.appsumo.com', // Added this hostname
        port: '',
        pathname: '/media/**', // Allow images from the /media/ path
      },
    ],
  },
};

export default nextConfig;
