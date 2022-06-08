const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

function setupDevtool() {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

// const filename = ext => IS_DEV ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: [
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr'
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '...'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'src/example'),
    }
  },
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      // exclude: /node_modules/,
      use: ['ts-loader']
    },
    {
      // test: /\.css$/,
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              // mode: 'local',
              // localIdentName: '[name]__[local]--[hash:base64:5]',
              localIdentName: '[local]',
            }
          }
        },
        'sass-loader',
      ]
    }
    ]
  },
  devtool: setupDevtool(),
  plugins: IS_DEV
    ? [
      new CleanWebpackPlugin(),
      new HotModuleReplacementPlugin()
    ]
    : [],
}