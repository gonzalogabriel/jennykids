/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID + '.supabase.co'
    ],
  },
  transpilePackages: ['@jennykids/ui', '@jennykids/db', '@jennykids/utils'],
}

export default nextConfig 