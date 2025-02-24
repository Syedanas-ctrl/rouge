/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
      ],
    },
  ],
}

export default nextConfig
