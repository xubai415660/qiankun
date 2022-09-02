/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { event, store as iceStore } from "@ice/stark-data";
import router from "@/router";
const moduleId = require("../../package.json").moduleId.toLowerCase();

/**
 * 远程存储工具类
 */
export class remoteStore {
  /**
   * 存储
   * @param key
   * @param value
   */
  static set = (key, value) => {
    iceStore.set(key, value);
  };

  /**
   * 获取
   * @param key
   * @returns {*}
   */
  static get = (key) => {
    return iceStore.get(key);
  };

  /**
   * 判断是否有
   * @param key
   * @returns {*}
   */
  static has = (key) => {
    return iceStore.has(key);
  };

  /**
   * 监听
   * @param noticeName
   * @param func
   */
  static on = (key, func, force) => {
    iceStore.on(key, func, force);
  };

  /**
   * 清除监听
   * @param noticeName
   * @param func
   */
  static off = (noticeName, func) => {
    iceStore.off(noticeName, func);
  };
}

/**
 * 远程存储工具类
 */
export class remoteEvent {
  /**
   * 通知
   * @param noticeName
   * @param noticeData
   */
  static emit = (noticeName, noticeData) => {
    event.emit(noticeName, noticeData);
  };

  /**
   * 监听
   * @param noticeName
   * @param func
   */
  static on = (noticeName, func) => {
    event.on(noticeName, func);
  };

  /**
   * 清除监听
   * @param noticeName
   * @param func
   */
  static off = (noticeName, func) => {
    console.log("off");
    event.off(noticeName, func);
  };

  /**
   * 判断是否有
   * @param key
   * @returns {*}
   */
  static has = (key) => {
    return event.has(key);
  };
}

/**
 * 远程路由
 */
export class remoteRoute {
  /**
   *
   * @param path
   * @param params
   */
  static openMenu = (path, params) => {
    if (!window.__POWERED_BY_QIANKUN__) {
      console.log("未集成主应用，本地本地调用");
      router.push({ path: path.replace(`/${moduleId}`, ""), query: params });
    } else {
      // store.dispatch("global/setGlobalState", { openMenu: { path: path, query: params } });
      remoteEvent.emit("public.open.menu", { path: path, query: params });
    }
  };

  /**
   * 关闭主应用路径
   * @param path
   */
  static closePath = (data) => {
    if (!window.__POWERED_BY_QIANKUN__) {
      console.log("静态方法remoteRoute.closePath()只用于关闭主应用路径");
      router.push({
        path: data.toPath.replace(`/${moduleId}`, ""),
        query: data.params,
      });
    } else {
      if (data && data.path) {
        remoteEvent.emit("public.close.path", {
          ...data,
          path: "/" + moduleId + data.path,
        });
      }
    }
  };
}
