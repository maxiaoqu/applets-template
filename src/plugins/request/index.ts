/**
 * @description: 接口请求总入口
 */
import $request from './intercept'

export const dataRequest = (config: any) => {
  let method = config.method
  return new Promise((resolve, reject) => {
    $request[method](config).then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}

