/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { validateNull } from "@/utils/validate";
import { getToken, setStore } from "@/utils/store";

const moduleId = require("../../package.json").moduleId.toLowerCase();

Vue.use(VueRouter);

// const packageName = require("../../package.json").name;

const constantRoutes = [
  {
    path: "/401",
    name: "noPermission",
    component: () => import("@/views/error/401.vue"),
  },
];

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

let basePath;
if (window.__POWERED_BY_QIANKUN__) {
  basePath = `/ami/${moduleId}/`;
} else if (process.env.NODE_ENV === "production") {
  basePath = `/${moduleId}/`;
} else {
  basePath = "/";
}

// 主应用测试使用
if (window.__POWERED_BY_MISS__) {
  basePath = `/${moduleId}/`;
}

const router = new VueRouter({
  base: basePath,
  isAddAsyncMenuData: false,
  mode: "history",
  routes: constantRoutes,
});

router.beforeEach((to, from, next) => {
  let token = getToken();
  if (token && process.env.NODE_ENV === "production") {
    if (window.location.pathname.indexOf(moduleId) === -1) {
      return;
    }
  }
  if (to.query.token) {
    setStore({ name: "token", content: to.query.token, type: "session" }, false);
  }
  if (to.query.showMenu !== undefined) {
    store.commit("UPDATE_SHOW_MENU", to.query.showMenu !== "1");
  }

  // todo 开发环境token
  if (!token && process.env.NODE_ENV !== "production") {
    token = "832386e0-d0e8-428a-806d-1880dd81fa1c";
    setStore({ name: "token", content: token, type: "session" }, false);
  }
  if (to.path === "/401") {
    next();
    return;
  }

  // 非登录页判断token是否存在
  if (validateNull(token)) {
    next("/401");
    return;
  }

  //token存在且下个页面不是登录页面再动态加载路由
  if (!validateNull(token) && to.path !== "/401") {
    // todo 动态加载路由
    if (!router.options.isAddAsyncMenuData) {
      store.dispatch("generateRoutes").then((accessRoutes) => {
        // 根据用户权限生成可访问的路由表
        for (let i = 0, length = accessRoutes.length; i < length; i += 1) {
          const element = accessRoutes[i];
          router.addRoute(element);
        }
        router.options.isAddAsyncMenuData = true;
        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
      });
    } else {
      next();
    }
  }
});

export { constantRoutes };

export default router;
