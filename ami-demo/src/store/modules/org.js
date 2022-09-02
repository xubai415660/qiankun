/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { queryAllOrg, queryChildOrg, queryInitOrg } from "@/api/common";
import { forEach } from "@/utils/tools";

export default {
  state: {
    org: {
      data: [],
    },
  },
  mutations: {
    setOrgListData(state, orgListData) {
      state.org.data = orgListData;
    },
  },
  getters: {
    orgListData: (state) => state.org.data,
  },
  actions: {
    initOrgListData({ commit }, data) {
      return new Promise((resolve, reject) => {
        queryInitOrg({ mgtOrgCode: data.mgtOrgCode })
          .then((res) => {
            let orgListData = [];
            res = res.data;
            if (res.code === 200 && res.data) {
              let obj = {
                mgtOrgCode: res.data.mgtOrgCode,
                name: res.data.name,
                level: res.data.level,
                hasChildren: res.data.hasChildren,
                children: null,
                isDefaultExpanded: true,
              };
              orgListData.push(obj);
              commit("setOrgListData", orgListData);
            }
          })
          .catch((err) => {
            reject(err);
          });
        resolve();
      });
    },

    refreshOrgData({ commit }, payload) {
      commit("setOrgListData", payload);
    },
    // eslint-disable-next-line no-unused-vars
    loadOrgListData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        queryChildOrg({ mgtOrgCode: data.mgtOrgCode, type: data.type })
          .then((res) => {
            res = res.data;
            if (res.code === 200) {
              let array = [];
              forEach(res.data, function (item) {
                let data = {
                  mgtOrgCode: item.mgtOrgCode,
                  name: item.name,
                  level: item.level,
                  hasChildren: item.hasChildren,
                  children: null,
                };
                array.push(data);
              });
              resolve(array);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    loadAllOrgList({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        queryAllOrg({ mgtOrgCode: data.mgtOrgCode, type: data.type })
          .then((res) => {
            res = res.data;
            if (res.code === 200) {
              forEach(res.data, function (item) {
                if (item.mgtOrgCode === data.mgtOrgCode) {
                  item.isDefaultExpanded = true;
                }
              });
              commit("setOrgListData", res.data);
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
