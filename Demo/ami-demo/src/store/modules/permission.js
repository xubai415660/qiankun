/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { constantRoutes } from "@/router";
import { queryMenusByModuleId } from "@/api/system/menu";

const { moduleId } = require("../../../package.json");

const permission = {
  state: () => ({
    routers: null,
    menus: [],
    showMenu: false,
    windowResize: 0,
  }),
  mutations: {
    UPDATE_MENUS(state, payload) {
      state.menus = payload;
    },
    UPDATE_MENU_LIST(state, payload) {
      state.routers = constantRoutes.concat(payload);
    },
    UPDATE_SHOW_MENU(state, payload) {
      state.showMenu = payload;
    },
    UPDATE_WINDOW_RESIZE(state, payload) {
      state.windowResize = payload;
    },
  },
  actions: {
    generateRoutes({ commit }) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        if (process.env.NODE_ENV !== "production") {
          // todo miss
          // let loadLocal = false;
          // if (loadLocal) {
          const data = require("../../mock/data/router.json");
          let routes = [];
          let subRoutes = [];
          getMenuItem(data, subRoutes);

          routes.push({
            path: "/",
            name: "Layout",
            component: () => import("@/layout/index/layout.vue"),
            meta: { isTabs: false, isSide: false },
            children: subRoutes,
          });

          routes.push({
            path: "*",
            name: "notfound",
            component: () => import("@/views/error/404.vue"),
          });
          commit("UPDATE_MENUS", data);
          commit("UPDATE_MENU_LIST", routes);
          resolve(routes);
        } else {
          queryMenusByModuleId(moduleId).then((res) => {
            const data = res.data.data;
            let routes = [];
            let subRoutes = [];
            getMenuItem(data, subRoutes);

            routes.push({
              path: "/",
              name: "Layout",
              component: () => import("@/layout/index/layout.vue"),
              meta: { isTabs: false, isSide: false },
              children: subRoutes,
            });

            routes.push({
              path: "*",
              name: "notfound",
              component: () => import("@/layout/index/layout.vue"),
            });
            commit("UPDATE_MENUS", data);
            commit("UPDATE_MENU_LIST", routes);
            resolve(routes);
          });
        }
      });
    },
  },
  getters: {},
};

// 组装路由数据
function getMenuItem(menus, routers) {
  if (!menus) {
    return;
  }
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (menu.component !== null && menu.path !== null && (menu.webUrl === null || menu.webUrl === "")) {
      const route = {
        path: menu.path,
        component: () => import(`@/views${menu.component}`),
        name: menu.resourceCode,
        meta: {
          webUrl: menu.webUrl,
          hidden: menu.hidden,
          menuNo: menu.menuNo,
          menuName: menu.menuName,
          keepAlive: true,
        },
        title: menu.menuName,
      };
      routers.push(route);
    }
  }
}

export default permission;
