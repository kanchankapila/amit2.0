const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,





          },

          output: {
            comments: false,
          },
        },
        extractComments: false,

      }),
    ],



  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,

    }),
  ],



};