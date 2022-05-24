const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

let mode = 'development'
if (process.env.NODE_ENV === 'production') mode = 'production'

module.exports = {
  mode,
  entry: resolve(__dirname, '../src/server/server.js'),
  output: {
    path: resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '...']
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx$/,
        use: ['ts-loader']
      }
    ]
  },
  // target: 'node',
  externalsPresets: {
    node: true
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  }
}