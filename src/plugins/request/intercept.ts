/**
 * @description 添加请求拦截、响应拦截、错误处理
 */

import request from './request'

let $request: any = request

// 全局请求拦截
$request.interceptor.request = ((config: any) => {
  // 给header添加全局请求参数token
  if (!config.header.token) {
    config.header.token = 'my_token'
  }
  // 添加一个自定义的参数，默认异常请求都弹出一个toast提示
  if (config.toastError === undefined) {
    config.toastError = true
  }
  console.log('全局请求拦截', config)
  return config;
})

// 全局响应拦截
$request.interceptor.response = ((res: any, config: any) => {
  if (res.code === 0) {
    res.success = true;
  } else if (res.code === 1001) {

  }
  console.log('全局响应拦截', res)
  return res;
})


// 全局错误处理
$request.interceptor.fail = ((res: any, config: any) => {
  let ret = res;
  let msg = ''
  if (res.statusCode === 200) { // 业务错误
    msg = res.data.msg
    ret = res.data
  } else if (res.statusCode > 0) { // HTTP错误
    msg = '服务器异常[' + res.statusCode + ']'
  } else { // 其它错误
    msg = res.errMsg
  }
  console.log('全局响应拦截', ret)
  return ret;
})

export default $request
