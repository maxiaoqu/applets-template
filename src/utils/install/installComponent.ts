/*
* 全局方法注册
* Vue.component('key', components[key])
* */
const components: any = {}

const installComponent = (Vue: any, opts = {}) => {
  var componentsObjArr = Object.keys(components)
  if (componentsObjArr.length !== 0) {
    componentsObjArr.forEach((key) => {
      Vue.component(key, components[key])
    })
  }
}
export default installComponent
