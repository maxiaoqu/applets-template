interface AppState {
  appCode: string
}

export default {
  state: {
    appCode: 'app',
  },
  getters: {
    getAppCode(state: AppState) {
      return state.appCode;
    }
  },
  mutations: {
    setAppCode(state: AppState, appCode: any) {
      state.appCode = appCode;
    }
  },
  actions: {
    saveAppCode({commit}: any, appCode: AppState) {
      commit('setAppCode', appCode)
    }
  }
}
