interface UserState {
  userName: string
}

export default {
  state: {
    userName: '',
  },
  getters: {
    getUserName(state: UserState) {
      return state.userName
    }
  },
  mutations: {
    setUserName(state: any, userName: UserState) {
      state.appCode = userName
    }
  },
  actions: {
    saveUserName({commit}: any, userName: UserState) {
      commit('setUserName', userName)
    }
  }
}
