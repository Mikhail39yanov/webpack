const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: resolve(__dirname, '../src/server/server.js'),
  output: {
    path: resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    // clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '...']
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ]
  },
  // target: 'node',
  externalsPresets: {
    node: true
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
}