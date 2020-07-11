import vm from '../utils/install/vuePrototype'

// 获取数据
export const getproductsalerate = (param: any) => {
  let params = param || {}
  const config = {
    url: vm.$baseURL.dip + '/api/cockpit/subCompanyOperation/getproductsalerate',
    data: params,
    method: 'get'
  }
  return vm.$dataRequest(config)
}

// 获取数据(get跨域）
export const deviceindicator = (param: any) => {
  let params = param || {}
  const config = {
    url: vm.$baseURL.pip + '/api/config/deviceindicator',
    data: params,
    method: 'get'
  }
  return vm.$dataRequest(config)
}


// 获取数据(post跨域）
export const deviceTyperIndicatorRelation = (param: any) => {
  let params = param || {}
  const config = {
    url: vm.$baseURL.pip + '/api/dataReportServer/deviceTyperIndicatorRelation',
    data: params,
    method: 'post'
  }
  return vm.$dataRequest(config)
}

// 获取数据(上传文件)
export const uploadFile = (param: any) => {
  let params = param || {}
  const config = {
    url: vm.$baseURL.pip + '/api/file-manager/file-info/uploadFile',
    data: params,
    method: 'post'
  }
  return vm.$dataRequest(config)
}
