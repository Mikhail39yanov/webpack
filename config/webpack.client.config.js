const { resolve } = require('path')

let mode = 'development'
if (process.env.NODE_ENV === 'production') mode = 'production'

module.exports = {
  mode,
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
        test: /\.[tj]sx$/,
        use: ['ts-loader']
      }
    ]
  },
  devtool: mode ? 'eval' : false
}
