/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5001/graphql',
      },
    ];
  },
  reactStrictMode: true,
};
