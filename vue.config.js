const consoleInfo = require('./console')

module.exports = {
  publicPath: './',
  lintOnSave: false,
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  filenameHashing: false,
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    https: false,
    open: true
  }
}
