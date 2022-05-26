const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

const setupDevtool = () => IS_DEV ? 'eval' : false

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: [
    resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr'
  ],
  output: {
    path: resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
    // clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '...'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
      // '@': resolve(__dirname, 'src'),
      // '@example': resolve(__dirname, 'src/example'),
    }
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
  plugins: IS_DEV
    ? [
      new CleanWebpackPlugin,
      new HotModuleReplacementPlugin(),
    ]
    : [],
  devtool: setupDevtool(),
}
