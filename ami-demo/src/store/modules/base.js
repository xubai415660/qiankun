/**
 * @description：标准代码的方法（数据字典、下拉框数据）
 * @author：
 * @date：Created in 2021/11/25 12:32
 * @modified By：
 * @version: 1.0.0
 */
import { getSelectByCodeCls } from "@/api/base/base.js";
export default {
  namespaced: true, //文件命名空间的运用
  state: {
    selectData: {},
  },
  mutations: {
    /**
     * 提交数据到state
     * */
    setSelectData(state, data) {
      state.selectData = data;
    },
  },
  /**
   *相当于store的计算属性  将store数据映射到selectData 方便页面在计算属性中使用
   **/
  getters: {
    selectData: (state) => state.selectData,
  },
  actions: {
    /**
     * 根据码值类型查码值表
     * @param commit
     * @param state
     * @param payload selectId码值类型
     * @returns null
     */
    getSelectByCodeCls({ commit, state }, payload) {
      let objKye = payload.codeClsType;
      let stateData = {};
      /**
       * 掉用封装的请求数据的方法
       * */
      getSelectByCodeCls(payload).then((res) => {
        let data = res.data;
        stateData[objKye] = data.data || [];
        commit("setSelectData", { ...state.selectData, ...stateData });
      });
    },
  },
};
