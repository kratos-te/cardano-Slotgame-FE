/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  output: 'export',
    images: {
        domains: ['kfdniefadaanbjodldohaedphafoffoh'],
    },
};
module.exports = nextConfig;
