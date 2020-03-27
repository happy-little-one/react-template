const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:6].js',
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'hashed',
    splitChunks: {
      minSize: 50 * 1024,
      maxSize: 1204 * 1024,
      cacheGroups: {
        npm: {
          name: 'npm',
          test: /[\\/]node_modules[\\/]/,
          priority: 5,
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin()],
})
