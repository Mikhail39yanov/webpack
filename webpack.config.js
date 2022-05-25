const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let mode = 'development'
if (process.env.NODE_ENV === 'production') mode = 'production'

module.exports = {
  mode,
  context: resolve(__dirname, 'src'),
  entry: './index.jsx',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React',
      template: './index.html',
      // chunks: ['app'],
      // minify: {
      //   collapseWhitespace: true
      // },
      // hash: true,
    }),
  ],
  devServer: {
    hot: true,
    port: 3000,
    compress: true,
    // historyApiFallback: true,
    open: {
      app: {
        name: 'chrome',
        // name: 'google-chrome',
      },
    }
  },
  devtool: mode ? 'eval' : false
}

