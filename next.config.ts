import withBundleAnalyzer from '@next/bundle-analyzer'

let nextConfig = {}

if (process.env.ANALYZE) {
  nextConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
}

export default nextConfig
