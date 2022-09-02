/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import permission from "./modules/permission";
import orgSelect from "./modules/org";
import base from "./modules/base";
import template from "./modules/template";
Vue.use(Vuex);
/**
 * 本地化数据字典数据
 * */
const activePath = createPersistedState({
  storage: window["sessionStorage"],
  paths: ["base"],
});
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    permission,
    orgSelect,
    base,
    template,
  },
  plugins: [activePath],
});
