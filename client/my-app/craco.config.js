const path = require(`path`)

module.exports = {
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:3001', // Your backend server URL
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/uploads': '/uploads' }, // Rewrites URL to match the backend path
      },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Ensures that files in the public directory are accessible
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/',
      };

      return webpackConfig;
    },
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
}
