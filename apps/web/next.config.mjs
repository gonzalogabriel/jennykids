/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'eacwvwjecuzozenjwhww.supabase.co',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  transpilePackages: ['@jennykids/ui', '@jennykids/db', '@jennykids/utils'],
}

export default nextConfig 