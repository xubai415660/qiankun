function initState () {
  return {
    // 用户信息
    userInfo: { name: '李四' }
  }
}

const state = initState(),
  mutations = {
    /**
     * @description 修改用户信息
     * @return {void}
     * @example
     * this.$store.commit('common/setUserInfo')
     */
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions = {
    /**
     * @description 修改用户信息
     * @return {void}
     * @example
     * this.$store.dispatch('common/setUserInfo')
     */
    setUserInfo ({ commit }, payload) {
      commit('setUserInfo', payload)
    }
  },
  getters = {
    /**
     * @description 获取用户信息
     * @return {string}
     * @example
     *  this.$store.getters['common/getToken']
     *  // => {name:'张三'}
     */
    getUserInfo (state) {
      return state.userInfo
    }
  }

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
