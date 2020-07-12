/**
 * @description 配置运行环境的相关接口地址，在vue.config.js里的proxy用到
 */

const nodeEnv = {
  port: '1024',
  // 数据接口
  dip: {
    target: 'http://139.224.255.200:3011'
  },
  // ddPush推送接口
  pip: {
    target: 'http://203.34.57.23:5000'
  },
  // Websocket接口
  wip: {
    target: 'http://203.34.57.23:5000'
  },
  // 文件上传接口
  fip: {
    target: 'http://server.maxiaoqu.com:9999'
  }
}

module.exports = nodeEnv
