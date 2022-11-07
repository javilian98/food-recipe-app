// import { CLIENT_URL } from './constants/constants'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://food-recipe-app-chi.vercel.app/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
