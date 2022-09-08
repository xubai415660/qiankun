/********************************************************
 * @description：码值表接口
 * @author：省侧
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

export function getSelectByCodeCls(data) {
  return request({
    url: "/ami/ma01-04-003/code-cls-val/queryCodeClsValCache",
    data: data,
    method: "post",
  });
}
/**
 * @description 用户登录
 * @param params 登录信息
 * @returns {*}
 */
export function login(data) {
  return request({
    url: "/ami/ma01-00-101/auth/login",
    data: data,
    method: "post",
  });
}
/**
 * @description 获取当前用户
 * @returns {*}
 */
export const getUserInfo = () => {
  return request({
    url: "/ami/ma01-00-101/user/getUser",
    method: "post",
  });
};

export const getUserInfo1 = () => {
  return request({
    url: "/ami/ma01-00-101/user/getUser",
    method: "post",
  });
};
