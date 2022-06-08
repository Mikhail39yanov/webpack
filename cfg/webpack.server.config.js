const path = require('path')
const nodeExternals = require('webpack-node-externals')

const NODE_ENV = process.env.NODE_ENV
// const IS_DEV = NODE_ENV === 'development'
// const IS_PROD = NODE_ENV === 'production'

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '...'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      // exclude: /node_modules/,
      use: ['ts-loader'],
    },
    {
      // test: /\.css$/,
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              // mode: 'local',
              // localIdentName: '[name]__[local]--[hash:base64:5]',
              localIdentName: '[local]',
            },
            onlyLocals: true
          }
        },
        'sass-loader',
      ]
    }]
  },
  optimization: {
    minimize: false
  }
}