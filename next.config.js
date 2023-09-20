/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'e6389c507523eeafc24805e8a124b5c5.ipfscdn.io',
      'c40363e937d5ddb52923ed7313ed45c8.ipfscdn.io',
      'nft-ticketing-7q4u.vercel.app',
      '15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io',
    ]
  }
}

module.exports = nextConfig
