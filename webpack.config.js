const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['main', 'polyfills'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    
    new HtmlWebpackPlugin({
      template: 'src/index.html', // Path to your HTML template file
      filename: 'index.html', // Output file name
      inject: true, // Inject bundles into the template file
      minify: {
        collapseWhitespace: true, // Minify HTML
        removeComments: true, // Remove comments from HTML
        removeRedundantAttributes: true, // Remove redundant attributes from HTML tags
        removeScriptTypeAttributes: true, // Remove script type attributes from script tags
        removeStyleLinkTypeAttributes: true, // Remove style and link type attributes from style and link tags
        useShortDoctype: true, // Use short DOCTYPE declaration for HTML5
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
        },
        {
          from: 'src/manifest.json',
          to: 'manifest.json',
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'ngsw-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://api.example.com'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300,
            },
            networkTimeoutSeconds: 10,
          },
        },
      ],
    }),
    new GenerateSW({
      swDest: 'ngsw-config.json',
      directoryIndex: '/',
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [/^\/__/, /\/[^/?]+\.[^/]+$/],
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
};
