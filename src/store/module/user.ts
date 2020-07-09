export default {
  state: {
    userName: '',
  },
  getters: {
    getUserName(state: any) {
      return state.userName
    }
  },
  mutations: {
    setUserName(state: any, userName: any) {
      state.appCode = userName
    }
  },
  actions: {
    saveUserName({commit}: any, userName: any) {
      commit('setUserName', userName)
    }
  }
}
