/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  i18n,
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});
