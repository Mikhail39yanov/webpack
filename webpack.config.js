const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'

function setupDevtool() {
  if (IS_DEV) return 'source-map'
  if (IS_PROD) return false
}

const filename = ext => IS_DEV ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = [
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
  new HtmlWebpackPlugin({
    title: 'React',
    template: './index.html',
    // minify: {
    //   collapseWhitespace: true
    // },
    // hash: true,
  }),
]

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  context: resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: filename('js'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '...'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@example': resolve(__dirname, 'src/example'),
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          NODE_ENV ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: NODE_ENV ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins,
  // optimization: {},
  devServer: {
    hot: IS_DEV,
    port: 3000,
    // compress: true,
    // historyApiFallback: true,
    // open: true,
    open: {
      app: {
        name: 'chrome',
        // name: 'google-chrome',
      },
    }
  },
  devtool: setupDevtool(),
}
