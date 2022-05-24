import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

const createHTMLfile = new HtmlWebpackPlugin({
  title: 'React',
  template: resolve(__dirname, 'src/index.html'),
  // chunks: ['app'],
  // minify: {
  //   collapseWhitespace: true
  // },
  // hash: true,
})

const config = (env) => ({
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
    createHTMLfile,
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

export default config