const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: 'gzip',
      filename: '[path][query]',
    }),
  ],
};
