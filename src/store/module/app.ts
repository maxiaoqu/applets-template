export default {
  state: {
    appCode: '',
  },
  getters: {
    getAppCode(state: any) {
      return state.cityCode;
    }
  },
  mutations: {
    setAppCode(state: any, appCode: any) {
      state.appCode = appCode;
    }
  },
  actions: {
    saveAppCode({commit}: any, appCode: any) {
      commit('setAppCode', appCode)
    }
  }
}
