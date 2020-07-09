/*
* 全局组件注册
* Vue.prototype.$key = prototype[key]
* */
import baseURL from '@/environment/baseUrl'
import {dataRequest} from '@/plugins/request'

const prototype: any = {
  baseURL,
  dataRequest
}

const installPrototype = (Vue: any, opts = {}) => {
  var prototypeObjArr = Object.keys(prototype)
  if (prototypeObjArr.length !== 0) {
    prototypeObjArr.forEach((key) => {
      Vue.prototype['$' + key] = prototype[key]
    })
  }
}

export default installPrototype
