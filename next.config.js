/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
}

module.exports = nextConfig
