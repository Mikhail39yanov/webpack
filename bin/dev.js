const { resolve } = require('path')
const webpack = require('webpack')
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const nodemon = require('nodemon')
const express = require('express')

const hmrServer = express()
const clientCompiler = webpack(webpackClientConfig)

hmrServer.use(webpackDevMiddleware(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath,
  serverSideRender: true,
  // noInfo: true,
  // watchOptions: {
  //   ignored: /dist/,
  // },
  writeToDisk: true,
  stats: 'errors-only',
}))

hmrServer.use(webpackHotMiddleware(clientCompiler, {
  path: '/static/__webpack_hmr',
}))

hmrServer.listen(3001, () => console.log('HMR Server successful started'))

const compiler = webpack(webpackServerConfig)

compiler.run(err => {
  if (err) console.log('Compilation failed:', err)

  compiler.watch({}, (err) => {
    if (err) console.log(`compilation failed:`, err)
    console.log('Compilation was successfully')
  })

  nodemon({
    script: resolve(__dirname, '../dist/server/server.js'),
    watch: [
      resolve(__dirname, '../dist/server'),
      resolve(__dirname, '../dist/client')
    ]
  })
})