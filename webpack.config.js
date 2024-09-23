// const TerserPlugin = require('terser-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

// module.exports = {
//   optimization: {
//     minimize: true,
//     usedExports: true,
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           compress: {
//             unused: true,





//           },

//           output: {
//             comments: false,
//           },
//         },
//         extractComments: false,

//       }),
//     ],



//   },
//   plugins: [
//     new CompressionPlugin({
//       algorithm: 'gzip',
//       test: /\.js$|\.css$|\.html$/,
//       threshold: 10240,
//       minRatio: 0.8,

//     }),
//   ],



// };
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true,  // Aggressively remove dead code
            drop_console: true,  // Remove console.logs for production builds
            drop_debugger: true, // Remove debugger statements
            passes: 3,  // Increase passes to get more optimization
            pure_funcs: ['console.log'], // Remove all console.log statements
          },
          mangle: true,  // Mangle variable names to reduce file size
          output: {
            comments: false,  // Remove comments
          },
        },
        parallel: true,  // Enable parallel processing for faster builds
        extractComments: false, // Prevent extracting comments into a separate file
      }),
    ],
    splitChunks: {
      chunks: 'all',  // Split code into smaller chunks to load more efficiently
    },
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,  // Include SVG files in compression
      threshold: 8192,  // Reduce threshold for smaller assets
      minRatio: 0.7,  // Adjust minRatio for better compression
      deleteOriginalAssets: false,  // Keep original assets (set to true if you want to remove them)
    }),
  ],
  performance: {
    hints: false,  // Disable performance hints for smaller builds
  },
};