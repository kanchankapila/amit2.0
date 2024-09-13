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
            dead_code: true,        // Aggressively remove dead code
            drop_console: true,     // Remove all console logs for production
            drop_debugger: true,    // Remove debugger statements
            passes: 3,              // Apply multiple passes for more optimization
            pure_funcs: ['console.log'], // Specifically target console.log to remove
          },
          mangle: {
            toplevel: true,         // Mangle top-level variable and function names
          },
          output: {
            comments: false,        // Remove all comments
          },
        },
        parallel: true,              // Parallel processing for faster builds
        extractComments: false,      // Prevent extracting comments to a separate file
      }),
    ],
    splitChunks: {
      chunks: 'all',                 // Split code into chunks for better performance
      maxInitialRequests: Infinity,  // Optimize large assets for better load time
      minSize: 30000,                // Reduce minimum size to create smaller chunks
    },
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',               // Use Gzip for compression
      test: /\.(js|css|html|svg)$/,    // Include JavaScript, CSS, HTML, and SVG files
      threshold: 8192,                 // Compress files larger than 8KB
      minRatio: 0.7,                   // Set a lower ratio to get better compression
      deleteOriginalAssets: false,     // Retain original assets (set to true if you want to delete them)
    }),
  ],
  performance: {
    hints: false,                     // Disable performance hints to avoid unnecessary warnings
    maxEntrypointSize: 512000,        // Adjust size limit to prevent excessive warnings
    maxAssetSize: 512000,             // Limit the asset size for efficient loading
  },
};
