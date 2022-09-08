/** **************************************************
 * @description：$
 * @author：张时友
 * @date：Created in 2022/5/24 14:16
 * @modified By：
 * @version: 1.0.0
 ************************************************* **/
export default {
  namespaced: true,
  state: {
    onlineExcelDialog: false, //在线 表格弹窗显示隐藏
    onlineExcelFileData: {},
  },
  mutations: {
    /**
     * 控制弹窗显示隐藏
     * */
    SET_ONLINE_EXCEL_DIALOG(state, data) {
      state.onlineExcelDialog = data;
    },

    SET_ON_LINE_EXCEL_FILE_DATA(state, data) {
      state.onlineExcelFileData = data;
    },
  },
  /**
   *相当于store的计算属性  将store数据映射到selectData 方便页面在计算属性中使用
   **/
  getters: {
    onlineExcelDialog: (state) => state.onlineExcelDialog,
    onlineExcelFileData: (state) => state.onlineExcelFileData,
  },
  actions: {},
};
