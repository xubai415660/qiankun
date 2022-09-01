function initState () {
  return {
    // 是否处于乾坤环境
    isPoweredByQiankun: false
  };
}

const state = initState(),
  mutations = {
    /**
     * @description 设置当前是否处于乾坤环境
     * @return {void}
     * @example
     * this.$store.commit('common/setIsPoweredByQiankun')
     */
    setIsPoweredByQiankun (state, payload) {
      state.isPoweredByQiankun = payload;
    }
  },
  actions = {
    /**
     * @description 设置当前是否处于乾坤环境
     * @return {void}
     * @example
     * this.$store.dispatch('common/setIsPoweredByQiankun')
     */
    setIsPoweredByQiankun ({ commit }, payload) {
      commit('setIsPoweredByQiankun', payload);
    }
  },
  getters = {
    /**
     * @description 获取当前是否处于乾坤环境
     * @return {boolean}
     * @example
     * this.$store.getters['common/isPoweredByQiankun']
     */
    isPoweredByQiankun (state) {
      return state.isPoweredByQiankun;
    }
  };

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
