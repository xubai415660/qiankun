/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { validateNull } from "@/utils/validate";

const { name } = require("../../package.json");

const keyName = name + "-";
/**
 * 存储localStorage
 */
export const setStore = (params = {}, addPrefix = true) => {
  let { name, content, type } = params;
  name = addPrefix ? keyName + name : name;
  let obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime(),
  };
  if (type) {
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  } else {
    window.localStorage.setItem(name, JSON.stringify(obj));
  }
};
/**
 * 获取localStorage
 */

export const getStore = (params = {}, addPrefix = true) => {
  let { name, debug } = params;
  name = addPrefix ? keyName + name : name;
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (validateNull(obj)) {
    obj = window.localStorage.getItem(name);
  }
  if (validateNull(obj)) {
    return;
  }
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType === "string") {
    content = obj.content;
  } else if (obj.dataType === "number") {
    content = Number(obj.content);
  } else if (obj.dataType === "boolean") {
    content = eval(obj.content);
  } else if (obj.dataType === "object") {
    content = obj.content;
  }
  return content;
};

/**
 * 删除localStorage
 */
export const removeStore = (params = {}, addPrefix = true) => {
  let { name, type } = params;
  name = addPrefix ? keyName + name : name;
  if (type) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }
};

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  let list = [];
  let { type } = params;
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: "session",
        }),
      });
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i),
        }),
      });
    }
  }
  return list;
};

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  let { type } = params;
  if (type) {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear();
  }
};

export const getUserInfo = () => {
  return getStore({ name: "userInfo" }, false) || null;
};

export const getRoles = () => {
  return getStore({ name: "roles" }, false) || null;
};

export const getMaCodeList = () => {
  return getStore({ name: "maCodeList" }, false) || null;
};

export const getToken = () => {
  return getStore({ name: "token" }, false) || null;
};

export const getRefreshToken = () => {
  return getStore({ name: "refreshToken" }, false) || null;
};
