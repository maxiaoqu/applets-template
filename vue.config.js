const consoleInfo = require('./console')
const nodeEvnt = require('./src/environment/nodeEvnt.ts')

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: false,
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    https: false,
    open: true,
    proxy: {
      // 通配【勿动,模拟配置，为了方便联调时的更多的配置】
      '/maxiaoquServer': {
        target: 'http://server.maxiaoqu.com/maxiaoquServer',
        changeOrigin: true,
        pathRewrite: {
          '/maxiaoquServer': '/'
        }
      },

      // 联调时的跨域【可进行增加和修改】
      '/api/config': nodeEvnt.pip,
      '/api/dataReportServer': nodeEvnt.pip,

      // 通用统一验证跨域【只可改IP】
      '/api': nodeEvnt.dip
    }
  }
}
