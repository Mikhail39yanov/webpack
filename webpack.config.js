const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  entry: resolve(__dirname, 'src/index.jsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React',
      template: resolve(__dirname, 'src/index.html'),
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
  devtool: env.prod ? 'eval' : false
})

