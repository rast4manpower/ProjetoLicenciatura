const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
};