// import { CLIENT_URL } from './constants/constants'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `ec2-13-229-125-36.ap-southeast-1.compute.amazonaws.com:8080/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
