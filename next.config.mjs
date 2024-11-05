import withBundleAnalyzer from '@next/bundle-analyzer'
/** @type {import('next').NextConfig} */
let nextConfig = {}

if (process.env.ANALYZE) {
  nextConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
}

export default nextConfig
