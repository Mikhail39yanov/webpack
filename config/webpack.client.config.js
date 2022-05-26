const { resolve } = require('path')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

const setupDevtool = () => IS_DEV ? 'eval' : false

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: resolve(__dirname, '../dist/client'),
    filename: 'bundle.js',
    clean: true,
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
  devtool: setupDevtool(),
}
