/**
 * @description: uin-app请求的相关处理参数配置
 */

'use strict'

class Request {
  /**
   * @description 网络请求的默认配置
   * @property {Object} config - 默认参数配置
   * @property {string} config.baseUrl - 接口基地址
   * @property {string} config.business - 接口响应的业务数据对象字段名，默认为data
   */

  /**
   * 返回默认为res.data
   */
  config = {
    baseUrl: '',
    business: 'data'
  }

  /**
   * 判断url是否为绝对路径
   */
  static posUrl(url: string) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  /**
   * 获取url并校验
   */
  static getUrl(config: any) {
    let url = config.url || ''
    let abs = Request.posUrl(url);
    if (!abs) {
      let f = config.slashAbsoluteUrl
      if (f) {
        abs = /^\/([\w.]+\/?)\S*/.test(url)
      }
    }
    return abs ? url : (config.baseUrl + url)
  }

  /**
   * 设置contentType
   */
  static getContentType(config: any) {
    let type = config.contentType || 'json'
    let charset = config.encoding || 'UTF-8'
    if (type === 'json') {
      return 'application/json;charset=' + charset
    } else if (type === 'form') {
      return 'application/x-www-form-urlencoded;charset=' + charset
    } else if (type === 'file') {
      return 'multipart/form-data;charset=' + charset
    } else if (type === 'text') {
      return 'text/plain;charset=' + charset
    } else if (type === 'html') {
      return 'text/html;charset=' + charset
    } else {
      throw new Error('unsupported content type : ' + type)
    }
  }

  /**
   * 请求拦截器
   */
  interceptor = {
    request: undefined,
    response: undefined,
    fail: undefined,
    complete: undefined // since 1.2.0
  }

  /**
   * 设置默认的请求options
   */
  setConfig(config: any) {
    this.config = Object.assign(this.config, config)
  }

  /**
   * 请求
   */
  request(options: any = {}) {
    let that: any = this;
    if (options.data === undefined) {
      options.data = {}
    }
    if (options.header === undefined) {
      options.header = {}
    }

    let _options = Object.assign({}, this.config, options)
    _options = Object.assign(options, _options)

    _options.url = Request.getUrl(_options)
    if (!_options.header['Content-Type']) {
      _options.header['Content-Type'] = Request.getContentType(_options)
    }
    let _config = _options
    if (that.interceptor.request && typeof that.interceptor.request === 'function') {
      _config = that.interceptor.request(_options)
    }
    let task: any = undefined
    let promise = new Promise((resolve, reject) => {
      let extras = {}
      that._prepare(that, _config, extras)
      if (_config.contentType === 'file') {
        task = uni.uploadFile({
          ..._config,
          success: res => {
            that._success(that, _config, res, resolve, reject)
          },
          fail: res => {
            that._fail(that, _config, res, resolve, reject)
          },
          complete: (res) => {
            that._complete(that, _config, res, extras)
          }
        })
        if (_config.progress && typeof _config.progress === 'function') {
          task.onProgressUpdate((_res: any) => {
            _config.progress(_res, task)
          })
        }
      } else {
        task = uni.request({
          ..._config,
          success: res => {
            that._success(that, _config, res, resolve, reject)
          },
          fail: res => {
            that._fail(that, _config, res, resolve, reject)
          },
          complete: (res) => {
            that._complete(that, _config, res, extras)
          }
        })
      }
    })
    if (_config.success || _config.fail || _config.complete) {
      return task;
    }
    return promise;
  }

  /**
   * @method
   * @description execute a get request
   * @param {Object} options - 参数选项
   * @param {string} options.url - 请求地址
   * @param {string} [options.method=GET] - 请求方法 GET|POST
   * @param {string} [options.contentType=json] - 请求类型，为json(默认)，form
   * @param {Object} [options.data] - 请求参数
   * @param {string} [options.encoding] - 请求编码，默认为utf-8
   * @param {string} [options.dataType] - 如果设为 json（默认），会尝试对返回的数据做一次 JSON.parse
   * @param {string} [options.business] - 接口响应的业务数据对象字段名，默认为data，如果返回整个业务对象，则需要设置为undefined
   * @param {string} [options.skipInterceptorResponse] - 是否跳过响应过滤器，如需跳过，请置true
   * @param {string} [options.slashAbsoluteUrl] - 是否视以/开头的url为绝对地址，默认为false，此设置仅当初步判断url为非绝对地址时有效
   * @param {string} [options.loadingTip] - 是否在请求前显示文字为参数值的loading提示，如果是，会在请求结束后自动关闭loading提示
   * @param {string} [options.loadingDuration] - 设置loadingTip时的最小loading显示时间
   *
   * 具体参考：ttps://uniapp.dcloud.io/api/request/request
   */
  get(options: any = {}) {
    options.method = 'GET'
    return this.request(options)
  }

  post(options: any = {}) {
    options.method = 'POST'
    return this.request(options)
  }

  put(options: any = {}) {
    options.method = 'PUT'
    return this.request(options)
  }

  delete(options: any = {}) {
    options.method = 'DELETE'
    return this.request(options)
  }

  upload(options: any = {}) {
    options.method = 'POST'
    options.contentType = 'file'
    return this.request(options)
  }

  /**
   * 接口请求拦截
   */
  _prepare = (that: any, _config: any, obj: any = {}) => {
    if (that.interceptor.prepare && typeof that.interceptor.prepare === 'function') {
      that.interceptor.prepare(_config, obj)
      return
    }
    obj.startTime = Date.now()
    if (_config.loadingTip) {
      uni.showLoading({
        title: _config.loadingTip
      })
    }
    if (_config.contentType === 'file') {
      if (_config.formData === undefined || _config.formData === null) {
        _config.formData = _config.data
        delete _config.data
      }
      delete _config.header['Content-Type']
      delete _config.header['Referer']
      _config.method = 'POST'
    }
    if (_config.debug) {
      console.log(`request(${_config.url}): `, _config)
    }
  }

  /**
   * uni-app：收到开发者服务器成功返回的回调函数
   */
  _success = (that: any, _config: any, res: any, resolve: any, reject: any) => {
    if (res.statusCode >= 200 && res.statusCode <= 302) { // http ok
      let result = res.data // 全局的拦截器
      let parseFileJson = _config.contentType === 'file' && typeof result === 'string' && (_config.dataType ===
          undefined || _config.dataType === 'json')
      if (parseFileJson) {
        result = JSON.parse(res.data);
      }
      let skip = _config.skipInterceptorResponse
      // 走全局的拦截器，
      if (that.interceptor.response && typeof that.interceptor.response === 'function' && !skip) {
        result = that.interceptor.response(result, _config)
        if (_config.businessSuccess /* || result.success*/) { // 不兼容原来的接口业务逻辑调用成功判定
          // 接口调用业务成功
          let _data = _config.business ? result[_config.business] : result;
          if (_config.debug) {
            console.log(`response(${_config.url}) success: `, _data)
          }
          _config.success ? _config.success(_data) : resolve(_data)
          return;
        }
      } else {
        // 对于某些特殊接口，比如访问其它系统，全局拦截器可能不适合
        // 这种情况下，需要自己处理接口响应，相当于透传
        if (_config.debug) {
          console.log(`response(${_config.url}) success: `, result)
        }
        _config.success ? _config.success(result) : resolve(result)
        return;
      }
    }
    // 剩下的都走失败
    that._fail(that, _config, res, resolve, reject)
  }

  /**
   * uni-app：接口调用失败的回调函数
   */
  _fail = (that: any, _config: any, res: any, resolve: any, reject: any) => {
    if (_config.debug) {
      console.error(`response(${_config.url}) failure: `, res)
    }
    if (res.errMsg === 'request:fail abort') {
      return
    }
    let result = res
    if (that.interceptor.fail && typeof that.interceptor.fail === 'function') {
      result = that.interceptor.fail(res, _config)
    }
    _config.fail ? _config.fail(result) : reject(result)
  }

  /**
   * uni-app：接口调用结束的回调函数（调用成功、失败都会执行）
   */
  _complete = (that: any, _config: any, res: any, obj: any = {}) => {
    if (that.interceptor.complete && typeof that.interceptor.complete === 'function') {
      that.interceptor.complete(_config, obj, res)
      return
    }
    obj.endTime = Date.now()
    if (_config.debug) {
      console.log(`request(${_config.url}) completed in ${obj.endTime - obj.startTime} ms`)
    }
    if (_config.loadingTip) {
      let diff = obj.endTime - obj.startTime;
      let duration = _config.loadingDuration || 500
      if (diff < duration) {
        diff = duration - diff
      } else {
        diff = 0
      }
      setTimeout(() => {
        uni.hideLoading()
      }, diff)
    }
    if (_config.complete) {
      _config.complete(res)
    }
  }
}

let request = new Request()

export default request
