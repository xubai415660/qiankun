/*
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 09:44:10
 * @Modified By:
 * @version: 1.0.0
 */
import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    namespaced: true,
    menu,
    common
  }
})
